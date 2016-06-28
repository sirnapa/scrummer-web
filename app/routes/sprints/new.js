import Ember from 'ember';
import SaveModelMixin from '../../mixins/sprints/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('sprint');
  }
});
