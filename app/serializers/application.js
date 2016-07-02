import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({

  /**
   @method serializeBelongsTo
   @param {DS.Snapshot} snapshot
   @param {Object} json
   @param {Object} relationship
  */
  serializeBelongsTo(snapshot, json, relationship) {
    var key = relationship.key;

    if (this._canSerialize(key)) {
      var belongsTo = snapshot.belongsTo(key);
      if (belongsTo !== undefined) {

        json.attributes = json.attributes || {};

        var payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key) {
          payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
        }

        let data = null;
        if (belongsTo) {
          data = belongsTo.id;
        }

        json.attributes[payloadKey] = data;
      }
    }
  },

});
