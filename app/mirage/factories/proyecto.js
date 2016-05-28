import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {nombre: 'MyString', descripcion: 'MyString', fechaInicio: new Date(), fechaFin: new Date() }
);
