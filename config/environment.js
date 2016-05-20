/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'scrummer',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    host: 'http://localhost:8000',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  if (environment === 'development') {
    ENV.host = 'http://localhost:8000';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // Django REST server
    ENV.APP.API_HOST = 'http://localhost:8000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // Django REST server
    ENV.APP.API_HOST = 'http://201.217.60.88:8000';
  }

  return ENV;
};
