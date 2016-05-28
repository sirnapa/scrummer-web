import DS from 'ember-data';

export default DS.Model.extend({
  nombre: DS.attr('string'),
  actividades: DS.attr('string')
});
