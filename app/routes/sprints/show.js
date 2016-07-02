import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    proyecto: {
      refreshModel: true
    }
  }
});
