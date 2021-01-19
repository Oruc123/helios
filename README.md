# Client Portal frontend

### Requirements

- Node.js 10 (newer versions won't work)
- yarn (Yarn dependency manager) (`brew install yarn`)
- GNU make (usually pre-installed  comes with mac and linux)

### Environment Setup

1. `make install` (installs dependencies)
1. If you are on Linux run `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` for webpack livereload to work properly. ( For more info, check https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers )
1. Create `.env` file by running `cp .env.example .env`

### Development

Start [the backend](https://github.com/HeliosCompliance/foundation) first. You can use local or remote setup (dev and staging deployments only, prod doesn't allow cross-domain requests from localhost). Then run one of the folowing commands:

- `make watch` (start webpack in prod mod)
- `make watch-dev` (start webpack in dev mod)
- `make test` (run tests)

You can configure the app by setting variables in `.env` (do not change Plaid and Auth0 vars if you don't know what you are doing):
* `VERSION` - always "dev"
* `ENVIRONMENT` - "development" or "production"
* `API_BASE_URL` - api url e.g. "http://localhost:3000", should NOT end with a "/"
* `PLAID_PUBLIC_KEY` - [public api key for Plaid](plaid.com/docs/#glossary)
* `PLAID_ENVIRONMENT` - "sandbox", "development" or "production" (determines [Plaid api host](plaid.com/docs/#api-host) )
* `AUTH0_DOMAIN` - Auth0 [tenant domain](https://auth0.com/docs/getting-started/the-basics#domains)
* `AUTH0_CLIENT_ID` - SAP [client id](https://auth0.com/docs/getting-started/the-basics#application)
* `AUTH0_AUDIENCE` - audience for JWT
* `ZENDESK_WEB_WIDGET_KEY` - a key for [Web Widget](https://support.zendesk.com/hc/en-us/articles/115009522787)

To set API endpoint for dev deployment in kubernetes set `API_BASE_URL` var in `./k8s/development/deploy.yaml` but don't forget to change it back before merging.

### URLs

Make sure this ports are availiable:
- [http://localhost:7000](http://localhost:7000) - webpack HTTP server (use this url for frontend development)
- [http://localhost:7001](http://localhost:7001) - webpack bundle analyzer
- [http://localhost:9000](http://localhost:9009) - storybook

Additional URLs
- [https://api-staging.helioscompliance.com](https://api-staging.helioscompliance.com) - staging api endpoint
- [https://api.helioscompliance.com](https://api.helioscompliance.com) - production api endpoint
