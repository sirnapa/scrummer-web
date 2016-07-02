import Ember from 'ember';
import SaveModelMixin from '../../mixins/sprints/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  queryParams: {
    proyecto: {
      refreshModel: true
    }
  }
});
