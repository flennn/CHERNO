const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const clientSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  premium: {
    type: Boolean,
  },
  blacklisted: {
    type: Boolean,
  },
  shopclients: [{
    clientID: String,
    guildID: String,
    token: String,
    prefix: String,
    bottype: String,
    enabled: {
      type: Boolean,
      default: true,
    },
    CustomID: String,
    statustype: {
      type: String,
      default: 'PLAYING',
    },
    status: {
      type: String,
      default: 'cherno service',
    },
  }],
  broadcastclients: [{
    clientID: String,
    guildID: String,
    token: String,
    prefix: String,
    bottype: String,
    enabled: {
      type: Boolean,
      default: true,
    },
    CustomID: String,
    statustype: {
      type: String,
      default: 'PLAYING',
    },
    status: {
      type: String,
      default: 'cherno service',
    },
  }],

});

const Clients = model('Clients', new Schema({
  user: {
    type: clientSchema,
    required: true,
  },
}));

module.exports = Clients;
