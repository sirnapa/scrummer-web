import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    proyecto: {
      refreshModel: true
    }
  },
  model: function(params) {
    if(params.proyecto){
      return {
        flujos: this.store.query('flujo', params),
        actividades: this.store.findAll('actividad')
      };
    }else {
      return {flujos:[]};
    }
  }
});
