import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  username: attr('string'),
  email: attr('string'),
  firstname: attr('string'),
  lastname: attr('string'),
  estado: attr('boolean'),
  createdat: attr('date'),
  updatedat: attr('date')
});
