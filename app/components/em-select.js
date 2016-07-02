import Ember from 'ember';

export default Ember.Component.extend({
  /**
   *
   */
  store: Ember.inject.service(),

  /**
   * Initialize the component.
   */
  init() {
    this.initialize();

    this._super();
  },

  /**
   * Initialize the properties and prerequisites.
   */
  initialize() {
    // Set the component properties
    if(this.content){
      this.loadOptionEntries().then((data) => {
        this.set('optionEntries', data);
      });
    }else{
      var constantes = {
        prioridad: [
          {id:1,value:'Baja'},
          {id:2,value:'Media'},
          {id:3,value:'Alta'},
        ]
      };
      this.contentLabel = 'value';
      console.log(constantes[this.staticContent]);
      this.set('optionEntries', constantes[this.staticContent]);
    }
  },

  /**
   * Returns the todo entries.
   *
   * @returns {*|Promise|Promise.<T>}
   */
  loadOptionEntries() {
      const store = this.get('store');
      return store.findAll(this.content);
  },
});
