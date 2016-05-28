import Ember from 'ember';
import SaveModelMixin from '../../mixins/permisos/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('permiso');
  }
});
