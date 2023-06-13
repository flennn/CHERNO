const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
process.setMaxListeners(15); 
const Clients = require('./../models/clients');
const chalk = require('chalk')

function start(token,prefix){
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
  allowedMentions: {
    repliedUser: false,
  },
});

client.events = new Collection();
client.slashCommands = new Collection();
client.commands = new Collection()
client.aliases = new Collection()
client.prefix = prefix;
  
client.once(Events.ClientReady, c => {
client.user.setActivity(`${prefix}help`);

});
  
  
fs.readdirSync('/home/runner/Cherno/Cherno/handlers/').forEach((handler) => {
	require(`/home/runner/Cherno/Cherno/handlers/${handler}`)(client)
  })

client.login(token)
  .then(() => {
    console.log(chalk.green('Cherno is Ready ✅'));
  })
  .catch(error => console.error(`cherno Failed to log in: ${error}`));
}
  


module.exports = {
  start,
};
