module.exports = (client) => {
const chalk = require('chalk')
const OrderSetup = require('../../models/ordersetup');
const mongoose = require('mongoose');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const Discord = require('discord.js');

client.on('messageCreate', async (message) => {
  try {
  if (message.author.bot) return;

const data = await OrderSetup.findOne({ clientID: client.user.id, guildID: message.guild.id })

if(!data) return;


  
const orderfrom = client.channels.cache.get(data.orderfrom);
const ordersend = client.channels.cache.get(data.ordersend);

  
if (message.channel.id !== data.orderfrom) return;

const webhookClient = await ordersend.createWebhook({
	name: message.author.username,
	avatar: message.author.avatarURL(),
})


const order = new EmbedBuilder()
	.setColor("#36393e")
	.setTitle(':watch:  طـلـب جـدـيـد !')
	.setDescription("**الـطـلـب : " + message.content + "**")
	.setThumbnail(message.author.avatarURL())
	.setTimestamp()

const randomNum = Math.floor(Math.random() * 4000) + 1;

const deletebutton = new ButtonBuilder()
		.setCustomId(`delete-${data.staffrole}`)
		.setLabel('Delete')
		.setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder()
	.addComponents([deletebutton]);


  await webhookClient.send({ content : `طــلــب مــن : 
 [${message.author.username}](https://discord.com/users/${message.author.id}) <@${message.author.id}>`, embeds: [order], components: [row],
});

  await webhookClient.delete();
  await message.delete();
  } catch (e) {
  console.log("delete err")
  }
});



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.includes("delete-")) {
const roleid = interaction.customId.substring(7, 26);
const user = interaction.guild.members.cache.get(interaction.user.id);

    
if (user.roles.cache.has(roleid)) {
    await interaction.message.delete();


  } else return;
    }
  });



  
}