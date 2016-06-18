import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save: function() {
      window.console.log('enviar a guardar!!!');
      this.sendAction('save');
    }
  },
});
