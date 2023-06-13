const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle,StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const mongoose = require('mongoose');

module.exports = {
	name: 'sendbutton',
	description: "sends create bot button.",
	cooldown: 3000,
	run: async (client, message, args) => {
if(message.author.id =! "295590388033388546") return;
  
const createembed = new EmbedBuilder()
	.setColor("#36393F")
	.setDescription('Create your own discord **Bot**.')


    
const create = new ButtonBuilder()
  	.setCustomId('create')
		.setLabel('Create')
		.setStyle(ButtonStyle.Primary);


		const row = new ActionRowBuilder()
			.addComponents(create);


return message.channel.send({ embeds: [createembed], components: [row], });


}
  
}
