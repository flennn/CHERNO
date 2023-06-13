const { ApplicationCommandType, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	description: "Displays a list of available commands.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {




   const help = new EmbedBuilder()
	.setColor('#36393e')
	.setTitle("Cherno's Service Commands")
  .setDescription('Here are the available commands for the Cherno Service Shop :\n\n`/setup orders` - Configure the orders system for your server.\n`/setup orders-disable` - Disable the orders system for your server.\n`/ping`\n\n')
.setFooter({ text: 'Powered by ChernoTeam', iconURL: interaction.user.avatarURL() });


// .addField('`/setup role-sell`', 'Select a role to sell.') 

const Cherno = new ButtonBuilder()
  	.setLabel('Cherno')
	  .setURL('https://discord.gg/dfssg54')
	  .setStyle(ButtonStyle.Link);


		const row = new ActionRowBuilder()
			.addComponents(Cherno);


    
return interaction.reply({ embeds: [help], components: [row], });

  
	}
};