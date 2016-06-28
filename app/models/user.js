import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  password: attr('string'),
  lastlogin: attr('date'),
  issuperuser: attr('boolean'),
  username: attr('string'),
  firstname: attr('string'),
  lastname: attr('string'),
  email: attr('string'),
  isstaff: attr('boolean'),
  isactive: attr('boolean'),
  datejoined: attr('date')
});
