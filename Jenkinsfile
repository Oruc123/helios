def appName = 'bank-portal-front'
def repositoryURI = "180123836379.dkr.ecr.us-east-1.amazonaws.com/${appName}"
def auth0SapId = 'cR28fLCFxPs8Lpfu5OFtCtNYQ3VxGdub'
def awsRegion = 'us-east-1'
def destroyAborted = false
def branch = env.BRANCH_NAME
def dockerImage
def commitID
def imageTag
def userInput
def apiEndpointsq

node {
  milestone(env.BUILD_NUMBER.toInteger()-1)
  milestone(env.BUILD_NUMBER.toInteger())

  if (branch != 'master'){
    stage('Configure') {

      def inputParameters = []
      def environments = ["development", "production"]
      def defaultEnvironment = getDefaultValue("userInput-environment")
      inputParameters.push([$class: 'ChoiceParameterDefinition', name: 'environment', choices: getChoicesWithDefault(environments, defaultEnvironment).join("\n")])

      apiEndpoints = getApiEndpoints()
      def backendChoices = getApiChoices(apiEndpoints)
      def defaultBackend = getDefaultValue("userInput-backend")
      inputParameters.push([$class: 'ChoiceParameterDefinition', name: 'backend', choices: getChoicesWithDefault(backendChoices, defaultBackend).join("\n")])

      timeout(time: 5, unit: 'MINUTES') {
			  userInput = input(id: 'user_input', message: 'Deploy parameters:', parameters: inputParameters)
        setDefaultValue("userInput-environment", userInput['environment'])
        setDefaultValue("userInput-backend", userInput['backend'])
        println(userInput)
		  }
    }
  }

  stage('Checkout') {
    checkout scm
    commitID = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
    imageTag = "git-${commitID}"
    dockerImage = "${repositoryURI}:${imageTag}"
  }

  stage ('Build'){
    def buildArgs = ""
    if (branch != 'master'){
      buildArgs = "--build-arg BUILD_STORYBOOK=true"
    }
    sh "DOCKER_BUILDKIT=1 docker build --progress=plain --network=host --force-rm=true ${buildArgs} --tag ${dockerImage} ."
  }
  
  stage ('Publish'){
    sh "aws ecr get-login --no-include-email --region ${awsRegion} | sh"
    sh "docker push ${dockerImage}"
  }

  if (branch == 'master'){
    stage('Deploy to Staging'){
      def ingressHost = getIngressHost('staging', appName, branch)
      kubectlDeploy('staging', appName, branch, dockerImage, '', '')
      stash('build-workspace')
      println("Staging domain: https://${ingressHost}")
    }
  }else{
    try{
      stage('Deploy to Development'){
        try{
          def apiHost = apiEndpoints[userInput['backend']]
          kubectlDeploy('development', appName, branch, dockerImage, userInput['environment'], apiHost)
        }catch(err){
          stash('build-workspace')
          throw err
        }

        def ingressHost = getIngressHost('development', appName, branch)
        withCredentials([file(credentialsId: 'auth0', variable: 'AUTH0_CREDENTIALS')]) {
          sh "set -a && . $AUTH0_CREDENTIALS 2> /dev/null && auth0-urls --auth0-app-id ${auth0SapId} add https://${ingressHost}"
        }

        println("Development domain: https://${ingressHost}")
        stash('build-workspace')
      }
    }catch(err){
      currentBuild.result = "FAILURE"
      println("Deploy error: ${err}")
    }
  }
}

if (branch == 'master'){
  def inputTimeoutMillis = 12*3600*1000

  stage('Promotion delay'){
    timeout(time: inputTimeoutMillis, unit: 'MILLISECONDS') {
      input(message: 'Promote to production?', ok: 'Yes')
    }
  }

  node{
    stage('Deploy to Production'){
      def ingressHost = getIngressHost('production', appName, branch)
      kubectlDeploy('production', appName, branch, dockerImage, '', '')
      println("Production domain: https://${ingressHost}")
    }
  }
}else{
  stage('Destroy delay'){
    def inputStartMillis = System.currentTimeMillis()
    def inputTimeoutMillis = 12*3600*1000
    try{
      timeout(time: inputTimeoutMillis, unit: 'MILLISECONDS') {
        input(message: 'Destroy now?', ok: 'Yes')
      }
    }catch(org.jenkinsci.plugins.workflow.steps.FlowInterruptedException err){
      def user = err.getCauses()[0].getUser()
      if('SYSTEM' == user.toString()) {
         def millisPassed = System.currentTimeMillis() - inputStartMillis
         if (millisPassed >= inputTimeoutMillis) {
           echo "Timeout reached after ${millisPassed}ms"
         }else{
          echo "Build cancelled after ${millisPassed}ms"
          destroyAborted = true
         }
      } else {
        echo "Aborted by: [${user}]"
        destroyAborted = true
      }
    }
  }

  if (destroyAborted){
    return
  }

  node{
    stage('Destroy'){
      unstash('build-workspace')
      kubectlDestroy()

      def ingressHost = getIngressHost('development', appName, branch)
      withCredentials([file(credentialsId: 'auth0', variable: 'AUTH0_CREDENTIALS')]) {
        sh "set -a && . $AUTH0_CREDENTIALS 2> /dev/null && auth0-urls --auth0-app-id ${auth0SapId} remove https://${ingressHost}"
      }
    }
  }
}

def kubectlDestroy(){
  def compiledYamlFile = './k8s/compiled.yaml'
  withCredentials([file(credentialsId: "kubeconfig-development", variable: 'KUBECONFIG')]) {
    sh "kubectl --kubeconfig $KUBECONFIG delete --wait=true --timeout=10m -f ${compiledYamlFile}"
  }
}

def kubectlDeploy(environment, appName, branch, dockerImage, frontendEnvironment, apiHost){
  def sanitizedBranch = sanitizeString(branch)
  def ingressHost = getIngressHost(environment, appName, branch)
  def yamlDir = getYamlDir(branch)
  def kubernetesNamespace = getKubernetesNamespace(environment)
  def compiledYamlFile = './k8s/compiled.yaml'
  def randomString = randStr(12).trim()
  def credentialsID = "kubeconfig-development"
  apiHost = getApiHost(environment, apiHost)

  if (environment == "production") {
    credentialsID = "kubeconfig-production"
  }

  sh """cat ${yamlDir}/*yaml |
DOCKER_IMAGE=${dockerImage} \
GIT_BRANCH=${sanitizedBranch} \
KUBERNETES_NAMESPACE=${kubernetesNamespace} \
INGRESS_HOST=${ingressHost} \
RANDOM=${randomString} \
ENVIRONMENT=${frontendEnvironment} \
API_HOST=${apiHost} \
envsubst '\${DOCKER_IMAGE}','\${RANDOM}','\${GIT_BRANCH}','\${KUBERNETES_NAMESPACE}','\${INGRESS_HOST}','\${INGRESS_API_HOST}','\${ENVIRONMENT},\${API_HOST}' > ${compiledYamlFile}
"""

   withCredentials([file(credentialsId: credentialsID, variable: 'KUBECONFIG')]) {
      sh "kubectl --kubeconfig $KUBECONFIG apply -f ${compiledYamlFile}"
      def deploymentName = sh(script: """kubectl get -f ${compiledYamlFile} -o jsonpath='{.items[?(@.kind=="Deployment")].metadata.name}'""", returnStdout: true).trim()
      sh "kubectl --kubeconfig $KUBECONFIG rollout status --timeout=5m -n ${kubernetesNamespace} deploy/${deploymentName}"
   }
}

def getKubernetesNamespace(environment){
  if (environment == 'production'){
    return 'production'
  }else if (environment == 'staging'){
    return 'staging'
  }

  return 'development'
}

def getYamlDir(branch){
  if (branch == 'master'){
    return './k8s/production'
  }

  return './k8s/development'
}

def getIngressHost(environment, appName, branch){
  if (environment == 'production'){
    return 'banks.helioscompliance.com'
  }else if (environment == 'staging'){
    return 'banks-staging.helioscompliance.com'
  }
  def sanitizedBranch = sanitizeString(branch)
  return "${appName}-${sanitizedBranch}.dev.helioscompliance.com"
}

def getApiHost(environment, userInputApiHost){
  if (environment == 'production'){
    return 'api.helioscompliance.com'
  }else if (environment == 'staging'){
    return 'api-staging.helioscompliance.com'
  }
  return userInputApiHost
}

def getApiEndpoints(){
  def endpoints = [
    "staging": getApiHost('staging', '')
  ]
  def ings
  withCredentials([file(credentialsId: 'kubeconfig-development', variable: 'KUBECONFIG')]) {
    ings = sh(returnStdout: true, script: "kubectl --kubeconfig $KUBECONFIG -n development get ing -l k8s-app=foundation -o custom-columns=git-branch:metadata.labels.git-branch,host:spec.rules[0].host --no-headers").trim().split("\\r?\\n")
  }
  ings.each{ line ->
    columns = line.split("\\s+")
    if (columns.length == 2){
      endpoints[columns[0]] = columns[1]
    }
  }

  return endpoints
}

def getApiChoices(endpoints){
  def choices = []
  endpoints.each{ branch, host ->
    choices.push(branch)
  }

  return choices
}

def getChoicesWithDefault(choices, defaultValue){
  def defaultFound = false
  choices.each{ val ->
    if (val == defaultValue) {
      defaultFound = true
    }
  }

  if (!defaultFound) {
    return choices
  }

  def res = [defaultValue]
  choices.each{ val ->
    if (val != defaultValue) {
      res.push(val)
    }
  }
  return res
}

def getDefaultValue(key){
  def file = getDefaultValueFile(key)
  sh(script: "cat ${file} || echo -n", returnStdout: true).trim()
}

def setDefaultValue(key, value){
  def file = getDefaultValueFile(key)
  sh(script: "echo \"${value}\" > ${file}")
}

def getDefaultValueFile(key){
  def job = sanitizeString(env.JOB_NAME)
  key = sanitizeString(key)
  return "/tmp/jenkins-default-value_${job}_${key}"
}

def sanitizeString(name){
    return name.replace("_", "-").replaceAll(/[^\d\w\-\.]/, "").toLowerCase()
}

def randStr(n){
  sh(script: "cat /dev/urandom |base64 | tr -dc A-Za-z0-9_ | head -c ${n}", returnStdout: true)
}