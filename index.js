process.setMaxListeners(15); 
const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const Clients = require('./models/clients');

const hostfunctions = require('./functions/hoster.js');
const mongodb = require('./functions/mongoDB.js');
const cherno = require('./functions/chernologin.js');
const chalk = require('chalk')

process.on("uncaughtException", (error) => {
  console.error(error);
});

mongodb.login(process.env.mongouri);
cherno.start(process.env.token, 'c');


async function dd() {
  try {
    await Clients.deleteMany({});
    console.log('All documents removed from collection');
  } catch (err) {
    console.error(err);
  }
}
//dd()

// START ALL BOTS //
try {
  Clients.find({}, 'user', function(err, docs) {
    if (err) {
      console.error(err);
      return;
    }
    docs.forEach(function(doc) {
      const user = doc.user;
      if (user) {
        const { shopclients, broadcastclients } = user;
        if (shopclients && shopclients.length > 0) {
          shopclients.forEach(function(client) {
            hostfunctions.ShopBots(client);
          });
        }
        if (broadcastclients && broadcastclients.length > 0) {
          broadcastclients.forEach(function(client) {
            hostfunctions.BrodcastBots(client);
          });
        }
      }
    });
  });
  console.log(chalk.green('ALL Bots Ready ✅'));
} catch (err) {
  console.log(chalk.red('ERROR ON :' + err));
}



// START ALL BOTS //