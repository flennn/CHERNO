const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	description: "Displays a list of available commands.",
	cooldown: 3000,
	run: async (client, message) => {



   const help = new EmbedBuilder()
	.setColor('#36393e')
	.setTitle('Cherno Service Commands')
  .setDescription(`Here are the available commands for the ChernoBroadcast :\n\n\`${client.prefix}bc\` - Send a broadcast message to all guild users.\n\`${client.prefix}ping\` - Discord bot response speed.\n\n`)
.setFooter({ text: 'Powered by ChernoTeam', iconURL: message.author.avatarURL() });


const Cherno = new ButtonBuilder()
  	.setLabel('Cherno')
	  .setURL('https://discord.gg/cherno')
	  .setStyle(ButtonStyle.Link);


		const row = new ActionRowBuilder()
			.addComponents(Cherno);


    
return message.reply({ embeds: [help], components: [row], allowedMentions: { repliedUser: false, } });


  
	}
};