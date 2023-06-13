const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Generate an invite link for the bot.',
    run: async (client, message, args) => {
        const inviteButton = new ButtonBuilder()
            .setLabel('Invite Bot')
            .setStyle(5)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1102905208293572608&permissions=8&scope=bot%20applications.commands');

        const row = new ActionRowBuilder().addComponents(inviteButton);

        await message.reply({
            content: 'Click the button below to invite the bot to your server:',
            components: [row],
     allowedMentions: { repliedUser: false, }
        });
    },
};
