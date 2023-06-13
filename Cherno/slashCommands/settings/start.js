const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ChannelType } = require('discord.js');
const Clients = require('../../../models/clients');
const hostfunctions = require('../../../functions/hoster.js');

module.exports = {
  name: 'client',
  description: "edit your bot state.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  options: [
    {
      name: 'start',
      description: 'turn on your bot',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "id",
          description: "pick your client ID",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
          required: true,
        },
      ],
    },
    {
      name: 'stop',
      description: 'turn off your bot',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "id",
          description: "pick your client ID",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
          required: true,
        },
      ],
    },
  ],
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const userClients = await Clients.findOne({ 'user.userID': interaction.user.id });

    if (userClients && userClients.user.broadcastclients && userClients.user.shopclients) {
      const broadcastClientIds = userClients.user.broadcastclients.map((client) => client.CustomID);
      const shopClientIds = userClients.user.shopclients.map((client) => client.CustomID);
      const choices = [...broadcastClientIds, ...shopClientIds];

      const filtered = choices.filter(choice => choice.startsWith(focusedValue));

      return interaction.respond(filtered.map(choice => ({ name: choice, value: choice })));
    } else {
         const choices = ['No clients found!'];

      const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(filtered.map(choice => ({ name: choice, value: 'noclients' })));
    }
  },
  run: async (client, interaction) => {
    
if (interaction.options.getSubcommand() === 'start') {
  const customID = interaction.options.getString('id');
  try {
    const foundShopClient = await Clients.findOne({
      "user.shopclients": { $elemMatch: { CustomID: customID } }
    }).exec();
    const foundBroadcastClient = await Clients.findOne({
      "user.broadcastclients": { $elemMatch: { CustomID: customID } }
    }).exec();


    if (foundShopClient || foundBroadcastClient) {
      let foundClient;
      if (foundShopClient) {
        foundClient = foundShopClient.user.shopclients.find(client => client.CustomID === customID);
       foundClient.enabled = true;
          hostfunctions.ShopBots(foundClient);
    await foundShopClient.save();
      } else {
        foundClient = foundBroadcastClient.user.broadcastclients.find(client => client.CustomID === customID);
      foundClient.enabled = true;
    hostfunctions.BrodcastBots(foundClient);
  await foundBroadcastClient.save();
      }


      const user = await client.users.fetch(foundClient.clientID).catch(() => null);



      if (user) {
        return interaction.reply({ content: `${user.username} has been turned <:online:876192917167964230>` });
      } else {
        return interaction.reply('client not found.');
      }
    }
  } catch (error) {
    console.error('error:', error);
  }
}
if (interaction.options.getSubcommand() === 'stop') {
  const customID = interaction.options.getString('id');
  try {
    let foundShopClient = await Clients.findOne({
      "user.shopclients": { $elemMatch: { CustomID: customID } }
    }).exec();
    let foundBroadcastClient = await Clients.findOne({
      "user.broadcastclients": { $elemMatch: { CustomID: customID } }
    }).exec();


    if (foundShopClient || foundBroadcastClient) {
      let foundClient;
      if (foundShopClient) {
        foundClient = foundShopClient.user.shopclients.find(client => client.CustomID === customID);
       foundClient.enabled = false;
          hostfunctions.ShopBots(foundClient);
    await foundShopClient.save();
      } else {
        foundClient = foundBroadcastClient.user.broadcastclients.find(client => client.CustomID === customID);
      foundClient.enabled = false;
    hostfunctions.BrodcastBots(foundClient);
  await foundBroadcastClient.save();
      }
      
      const user = await client.users.fetch(foundClient.clientID).catch(() => null);
   

      if (user) {
    return interaction.reply({ content : `${user.username} have been turned <:offline:876192964953640970>`});
      } else {
        return interaction.reply('client not found.');
      }
    } 
  } catch (error) {
    console.error('error:', error);
  }
}








    

  }
};
