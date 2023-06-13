const mongoose = require('mongoose');
const { model, Schema } = require("mongoose");

const orderSetup = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
  },
  guildID: {
    type: String,
    required: true,
  },
  orderfrom: {
    type: String,
    required: true,
  },
  ordersend: {
    type: String,
    required: true,
  },
  staffrole: {
    type: String,
    required: true,
  },
});



module.exports = model("OrderSetup", orderSetup);
