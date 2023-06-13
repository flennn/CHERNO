const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk')


function ShopBots(item) {
if (item.enabled === false) return;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,

    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
  });
  client.events = new Collection();
  client.slashCommands = new Collection();
  client.commands = new Collection()
  client.aliases = new Collection()
  client.prefix = item.prefix;

  client.once(Events.ClientReady, c => {
    client.user.setActivity(`${item.prefix}help`);
  });


  fs.readdirSync('/home/runner/Cherno/shopbot/handlers/').forEach((handler) => {
    require(`/home/runner/Cherno/shopbot/handlers/${handler}`)(client)
  })

  client.login(item.token)
     

}
function BrodcastBots(item) {
if (item.enabled === false) return;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,

    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
  });

  client.events = new Collection();
  client.slashCommands = new Collection();
  client.commands = new Collection()
  client.aliases = new Collection()
  client.prefix = item.prefix;


  client.once(Events.ClientReady, c => {
    client.user.setActivity(`${item.prefix}help`);
  });

  fs.readdirSync('/home/runner/Cherno/broadcast/handlers/').forEach((handler) => {
    require(`/home/runner/Cherno/broadcast/handlers/${handler}`)(client)
  })

  client.login(item.token)

}

module.exports = {
  ShopBots,
  BrodcastBots,
};
