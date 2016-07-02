import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    proyecto: {
      refreshModel: true
    }
  },
  actions: {
    remove: function(model) {
      if(confirm('Are you sure?')) {
        model.destroyRecord();
      }
    }
  },
  model: function(params) {
    if(params.proyecto){
      return this.store.query('flujo', params);
    }else {
      return this.store.findAll('flujo');
    }
  }
});
