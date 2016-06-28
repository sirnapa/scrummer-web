import Ember from 'ember';
import SaveModelMixin from '../../mixins/rols/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('rol');
  }
});
