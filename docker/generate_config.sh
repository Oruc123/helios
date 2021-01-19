#!/bin/sh
set -e

CONFIG_FILE="$1"
if [ -z "$CONFIG_FILE" ]
then
    echo '[ERROR] no config file specified!'
    exit 1
fi

sed -i "s/\[VERSION\]/${VERSION//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[ENVIRONMENT\]/${ENVIRONMENT//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[API_BASE_URL\]/${API_BASE_URL//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[PLAID_PUBLIC_KEY\]/${PLAID_PUBLIC_KEY//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[PLAID_ENVIRONMENT\]/${PLAID_ENVIRONMENT//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[AUTH0_DOMAIN\]/${AUTH0_DOMAIN//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[AUTH0_CLIENT_ID\]/${AUTH0_CLIENT_ID//\//\\/}/g" "$CONFIG_FILE"
sed -i "s/\[AUTH0_AUDIENCE\]/${AUTH0_AUDIENCE//\//\\/}/g" "$CONFIG_FILE" 
sed -i "s/\[AUTH0_CONNECTION\]/${AUTH0_CONNECTION//\//\\/}/g" "$CONFIG_FILE" 
sed -i "s/\[ZENDESK_WEB_WIDGET_KEY\]/${ZENDESK_WEB_WIDGET_KEY//\//\\/}/g" "$CONFIG_FILE"

echo "API config: `cat $CONFIG_FILE`"
