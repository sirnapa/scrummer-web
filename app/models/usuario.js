import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  username: attr('string'),
  password: attr('string'),
  email: attr('string'),
  firstname: attr('string'),
  lastname: attr('string'),
  estado: attr('boolean'),
  direccion: attr('string'),
  telefono: attr('string'),
  observacion: attr('string'),
  createdat: attr('date'),
  updatedat: attr('date'),
  rol: belongsTo('rol')
});
