const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');
const Clients = require('../../../models/clients');

module.exports = {
  name: 'checkuser',
  description: 'Get all clients associated with a user',
  cooldown: 5,
  async run(client, message, args) {
    return;
  let user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
    if (!user) return message.reply("Please provide a valid user ID or mention.");

    let userId = user.id;


    const foundClients = await Clients.findOne({ 'user.userID': userId });
    if (!foundClients) {
      return message.reply(`No clients found for ${user}`);
    }

    const shopclients = foundClients.user.shopclients;
    const broadcastclients = foundClients.user.broadcastclients;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Clients owned by user ${user.username} (${shopclients.length + broadcastclients.length})`)
      .addFields(
        { name: 'Shop Clients:', value: shopclients.map(client => `ID: ${client.clientID} (Guild ID: ${client.guildID})`).join('\n') || 'None' },
        { name: 'Broadcast Clients:', value: broadcastclients.map(client => `ID: ${client.clientID} (Guild ID: ${client.guildID})`).join('\n') || 'None' },
      )
      .setFooter({ text: 'Powerd by CHERNO', iconURL:
        client.user.displayAvatarURL({ extension: 'png' }) });

    message.reply({ embeds: [embed] });
  },
};
