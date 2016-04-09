export function initialize() {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name:       'auth',
  before:      'django-rest-auth',
  initialize
};
