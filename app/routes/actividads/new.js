import Ember from 'ember';
import SaveModelMixin from '../../mixins/actividads/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  queryParams: {
    flujo: {
      refreshModel: true
    }
  },
  model: function(params) {
    var nuevo = this.store.createRecord('actividad');

    if(params.flujo){
      this.store.find('flujo', params.flujo).then(function(flujo) {
        nuevo.set('flujo', flujo);
      });
    }

    return nuevo;
  }
});
