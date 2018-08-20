// root configuration file
module.exports = {
  /**
   *
   *  Local / Development
   *
   *  @url {NA}
   */
  development: {
    defaults: {
      NODE_ENV: 'DEVELOPMENT',
      DEBUG: 'TRUE'
    },
    directories: {
      'client': {
        _envPrefix: 'REACT_APP_',
        https: true,
        facebook_app_id: 'insert appId here',
      },
      'rest-server': {
        host: 'http://localhost',
        port: '3112',
        mongo_host: 'mongodb://localhost',
        mongo_db_name: 'remind-me-of',
        mongo_port: 27017,
        token_secret: 'insert secret here',
        twilio_account_sid: 'insert sid here',
        twilio_access_token: 'insert token here',
        twilio_number: 'insert number here',
      }
    }
  }
};