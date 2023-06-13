module.exports = (client) => {
  const { Client, Events, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, hyperlink } = require('discord.js');
  const axios = require('axios');
  const mongoose = require('mongoose');
  const Clients = require('./../../models/clients');
  const functions = require('./../../functions/hoster');
const fs = require('fs');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

let usedIds = [];

try {
  const data = fs.readFileSync('usedIds.json');
  usedIds = JSON.parse(data);
} catch (error) {
}

function generateCustomId() {
  let newId = generateRandomId();
  while (usedIds.includes(newId)) {
    newId = generateRandomId();
  }
  usedIds.push(newId);
  saveUsedIdsToJson();
  return newId;
}

function generateRandomId() {
  let id = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

function saveUsedIdsToJson() {
  const jsonData = JSON.stringify(usedIds);
  fs.writeFileSync('usedIds.json', jsonData);
}

  client.on('interactionCreate', async interaction => {

    if (interaction.isButton()) {
      const select = new StringSelectMenuBuilder()
        .setCustomId('choosebot')
        .setPlaceholder('Select Bot Type!')
        .addOptions(
     /*     new StringSelectMenuOptionBuilder()
            .setLabel('ShopBot')
            .setDescription('discord shop bot')
            .setValue('shopbot'),*/
          new StringSelectMenuOptionBuilder()
            .setLabel('broadcast')
            .setDescription('Bot that sends a message to all guild users')
            .setValue('broadcast'),
        );

      const row = new ActionRowBuilder()
        .addComponents(select);

      return interaction.reply({ components: [row], ephemeral: true });

    }
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'choosebot') {
        let botsdata = await Clients.findOne({
          ownerID: interaction.user.id
        });

        /*if(botsdata){
        return interaction.reply({ content: ':x: , You can create only 1 client at the moment!', ephemeral: true  });
        }*/
        client.selectedtype = interaction.values[0]

        const modal = new ModalBuilder()
          .setCustomId('botinfo')
          .setTitle('Cherno Team');
        const botname = new TextInputBuilder()
          .setCustomId('botname')
          .setLabel("Bot Username ??")
          .setStyle(TextInputStyle.Short)
          .setMinLength(5)
          .setMaxLength(15)
          .setRequired(true);

        const serverid = new TextInputBuilder()
          .setCustomId('serverid')
          .setLabel("Your Server ID")
          .setStyle(TextInputStyle.Short)
          .setMinLength(15)
          .setMaxLength(19)
          .setRequired(true);

        const prefix = new TextInputBuilder()
          .setCustomId('prefix')
          .setLabel("Type Prefix For Your Bot")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(1)
          .setRequired(true);

        const botnamecomp = new ActionRowBuilder().addComponents(botname);
        const serveridcomp = new ActionRowBuilder().addComponents(serverid);
        const prefixcomp = new ActionRowBuilder().addComponents(prefix);

        modal.addComponents(botnamecomp, serveridcomp, prefixcomp);

        await interaction.showModal(modal);


      }
    }
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'botinfo') {
        const botname = interaction.fields.getTextInputValue('botname');
        const serverID = interaction.fields.getTextInputValue('serverid');
        const prefix = interaction.fields.getTextInputValue('prefix');

 if (isNaN(serverID)) return interaction.reply({ content: ':x: , **Server ID is invalid!**', ephemeral: true });

          const CustomID = generateCustomId();

        try {
          async function generateBot(token, name) {
            const req = await axios({
              url: "https://discord.com/api/applications",
              method: "POST",
              headers: {
                Authorization: token,
              },
              data: {
                name,
                description: `ID: **${CustomID}\n© Cherno Team**`,
                bot_public: true,
                bot_require_code_grant: false,
                flags: 565248,
              },
            }).catch(console.error);

            const data = req.data;

            await axios({
              url: `https://discord.com/api/applications/${data.id}/bot`,
              method: "POST",
              headers: {
                Authorization: token,
              },
            }).catch(console.error);

            const getToken = await axios({
              url: `https://discord.com/api/applications/${data.id}/bot/reset`,
              method: "POST",
              headers: {
                Authorization: token,
              },
            }).catch(console.error);

            const botData = {
              data,
              token: getToken.data.token,
            };

            return botData;
          }



          const botData = await generateBot("MTA2MjQzMjU4ODUxNTUxNjU1OA.G5FvkJ.0hRcqtMTNPtoeo-G4J8W4PB1TU2W0SPSI0myCA", botname);


let selectedtype = client.selectedtype;

let botsdata = await Clients.findOne({ "user.userID": interaction.user.id });
if (!botsdata) {
  botsdata = new Clients({
    user: {
      userID: interaction.user.id,
      shopclients: [],
      broadcastclients: []
    }
  });
}
let user = botsdata.user;
if (selectedtype === "shopbot") {
  let shopclients = user.shopclients;
  if (!shopclients) {
    user.shopclients = [{
      clientID: botData.data.id,
      guildID: serverID,
      token: botData.token,
      prefix: prefix,
      bottype: selectedtype,
      CustomID: CustomID,
    }];
  } else {
    shopclients.push({
      clientID: botData.data.id,
      guildID: serverID,
      token: botData.token,
      prefix: prefix,
      bottype: selectedtype,
      CustomID: CustomID,
    });
    user.shopclients = shopclients;
  }
  await botsdata.save(); // save the changes to the database
  functions.ShopBots(botsdata.user.shopclients[0]);
} else if (selectedtype === "broadcast") {
  let broadcastclients = user.broadcastclients;
  if (!broadcastclients) {
    user.broadcastclients = [{
      clientID: botData.data.id,
      guildID: serverID,
      token: botData.token,
      prefix: prefix,
      bottype: selectedtype,
      CustomID: CustomID,
    }];
  } else {
    broadcastclients.push({
      clientID: botData.data.id,
      guildID: serverID,
      token: botData.token,
      prefix: prefix,
      bottype: selectedtype,
      CustomID: CustomID,
    });
    user.broadcastclients = broadcastclients;
  }
  await botsdata.save(); 
  functions.BrodcastBots(botsdata.user.broadcastclients[0]);
}

        


interaction.reply({ content: '**Your Discord Bot Created successfully!**\nCheck DMS for more information', ephemeral: true });
  


const embed = new EmbedBuilder()
  .setTitle("BOT Information")
  .setDescription(`**BOT_Name** : ${botname}\n**Type** : ${selectedtype}\n**Custom_ID** : ${CustomID}`)
  .addFields(
	{ name: 'Link', value: `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${botData.data.id}&permissions=8&scope=bot%20applications.commands)`, inline: true});

const userdm = await client.users.fetch(interaction.user.id);
if (!userdm) {
  return interaction.reply({ content: 'Failed to send DM :x:', ephemeral: true });
}

await userdm.send({ embeds: [embed] });

        } catch (error) {
          console.error(error)
          return interaction.reply({ content: 'Something went wrong...', ephemeral: true });
        }


      }
    }
  })
}

