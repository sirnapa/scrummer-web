import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  descripcion: attr('string'),
  usuario: belongsTo('usuario'),
  valornegocio: attr('number'),
  tiempoestimado: attr('number'),
  tiemporeal: attr('number'),
  sprint: belongsTo('sprint'),
  prioridad: attr('string'),
  historial: belongsTo('historial'),
  adjunto: belongsTo('adjunto')
});
