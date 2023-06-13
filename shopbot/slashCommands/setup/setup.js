const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ChannelType } = require('discord.js');
const Ordersetup = require('../../../models/ordersetup');

module.exports = {
	name: 'setup',
	description: "Guild shop setup.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
  options: [
        {
            name: 'orders',
            description: 'orders setup',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
        {
            name: "order-channel",
            description: "channel to order from",
            type: ApplicationCommandOptionType.Channel,
            channelType: [ChannelType.GuildText],
            required: true,
        },
        {
            name: "orders-channel",
            description: "channel to send orders in",
            type: ApplicationCommandOptionType.Channel,
            channelType: [ChannelType.GuildText],
            required: true,
        },
        {
            name: "staff-role",
            description: "staff role",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        ],
        },
       {
            name: 'orders-disable',
            description: 'disables orders system.',
            type: ApplicationCommandOptionType.Subcommand,
       },
   /*  {
            name: 'role-sell',
            description: 'select role to sell.',
            type: ApplicationCommandOptionType.Subcommand,
       },*/
  ],
	run: async (client, interaction) => {
if (interaction.options.getSubcommand() === 'orders') {
let orderfrom = interaction.options.getChannel("order-channel");
let ordersend = interaction.options.getChannel("orders-channel");
let staffrole = interaction.options.getRole("staff-role");
  
let ordersetup = await Ordersetup.findOne({ clientID: client.user.id, guildID: interaction.guild.id });
      if (ordersetup) {
        ordersetup.orderfrom = orderfrom.id;
        ordersetup.ordersend = ordersend.id;
        ordersetup.staffrole = staffrole.id;
        await ordersetup.save();
        await orderfrom.setRateLimitPerUser(21600);
      } else {
        ordersetup = new Ordersetup({
          clientID: client.user.id,
          guildID: interaction.guild.id,
          orderfrom: orderfrom.id,
          ordersend: ordersend.id,
          staffrole: staffrole.id,
        });
        await ordersetup.save();
        await orderfrom.setRateLimitPerUser(21600);
      }

  
const success = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Order setup completed successfully')
	.setDescription(`- All orders will be sent here -> <#${ordersend.id}>\n- Only users who have -> <@&${staffrole.id}> role can delete orders!`)


  
return interaction.reply({
      embeds: [success]
}); 
  
}  
if (interaction.options.getSubcommand() === 'orders-disable') {
  
let ordersetup = await Ordersetup.findOne({ clientID: client.user.id, guildID: interaction.guild.id });
  
if (ordersetup) {
  try {
    await Ordersetup.deleteOne({ _id: ordersetup._id });
      return interaction.reply('Orders setup is successfully disabled :white_check_mark:');

  } catch (error) {
    console.error(error);
    return interaction.reply('There was an error deleting the Orders Setup data.');
  }
} else {
  return interaction.reply('Orders setup is not even enabled !??');
}


  
}

    



    
}  
}