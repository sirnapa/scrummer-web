import Ember from 'ember';

export default Ember.Component.extend({

  value: Ember.computed('params.[]', function(){
    var model = this.get("model");
    var property = this.get("property");
    var value = model.get(property);
    return value;
  })

});
