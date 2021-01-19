const { config } = require('../paths');

module.exports = [
  {
    include: [config],
    type: 'javascript/auto',
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      },
      {
        loader: 'string-replace-loader',
        options: {
          multiple: [
            { search: '[VERSION]', replace: process.env.VERSION },
            { search: '[ENVIRONMENT]', replace: process.env.ENVIRONMENT },
            { search: '[API_BASE_URL]', replace: process.env.API_BASE_URL },
            {
              search: '[PLAID_PUBLIC_KEY]',
              replace: process.env.PLAID_PUBLIC_KEY
            },
            {
              search: '[PLAID_ENVIRONMENT]',
              replace: process.env.PLAID_ENVIRONMENT
            },
            { search: '[AUTH0_DOMAIN]', replace: process.env.AUTH0_DOMAIN },
            {
              search: '[AUTH0_CLIENT_ID]',
              replace: process.env.AUTH0_CLIENT_ID
            },
            {
              search: '[AUTH0_AUDIENCE]',
              replace: process.env.AUTH0_AUDIENCE
            },
            {
              search: '[AUTH0_CONNECTION]',
              replace: process.env.AUTH0_CONNECTION
            },
            {
              search: '[ZENDESK_WEB_WIDGET_KEY]',
              replace: process.env.ZENDESK_WEB_WIDGET_KEY
            }
          ]
        }
      }
    ]
  }
];
