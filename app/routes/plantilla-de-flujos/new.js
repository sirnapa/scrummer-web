import Ember from 'ember';
import SaveModelMixin from '../../mixins/plantilla-de-flujos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('plantilla-de-flujo');
  }
});
