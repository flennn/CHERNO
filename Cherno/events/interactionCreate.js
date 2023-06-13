module.exports = (client) => {
const { EmbedBuilder, Collection, PermissionsBitField,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require('discord.js')
const cooldown = new Collection()
const ms = require('ms')

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
	
            
      if(slashCommand.autocomplete) {

		if (!slashCommand) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await slashCommand.autocomplete(interaction, client);
		} catch (error) {
			console.error(error);
		}
	}

			}
	
		if (!interaction.type == 2) return;
	
		/*if(!slashCommand) return client.slashCommands.delete(interaction.commandName);*/
		try {
					await slashCommand.run(client, interaction);
		} catch (error) {
				console.log(error);
		}
});
}