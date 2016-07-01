import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  proyecto: belongsTo('proyecto'),
  nombre: attr('string'),
  asignado: attr('string'),
  permisosdelrol: attr()
});
