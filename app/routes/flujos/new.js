import Ember from 'ember';
import SaveModelMixin from '../../mixins/flujos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  queryParams: {
    proyecto: {
      refreshModel: true
    }
  },
  model: function(params) {
    var nuevo = this.store.createRecord('flujo');

    if(params.proyecto){
      this.store.find('proyecto', params.proyecto).then(function(proyecto) {
        nuevo.set('proyecto', proyecto);
      });
    }

    return nuevo;
  }
});
