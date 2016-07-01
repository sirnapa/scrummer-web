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
    this.loadOptionEntries().then((data) => {
      this.set('optionEntries', data);
    });
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
