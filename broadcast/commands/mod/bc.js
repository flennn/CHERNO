const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType , PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'bc',
    description: "Advanced Broadcast.",
    cooldown: 3000,
    run: async (client, message, args) => {
              if (!message.member.permissions.has( PermissionsBitField.Flags.ADMINISTRATOR)) {
            return message.reply({ content: "You need to have the Administrator permission to use this command." });
        }

        let bcmsg = args[0];
        if (!bcmsg) {
            return message.reply({ content: `broadcast message required to send broadcast.` });
        }

        const onlineMembers = message.guild.members.cache.filter(member => member.presence?.status === 'online');

        const embed = new EmbedBuilder()
            .setTitle("Cherno Broadcast")
            .setColor('#36393F')
            .setDescription(`🟢 Send to **online** members \`${onlineMembers.size}\` member(s)\n🔵 Send to **all** members \`${message.guild.memberCount}\` member(s)\n❌ to **Cancel**`);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('online_button')
                    .setLabel('🟢')
                    .setStyle(2),
                new ButtonBuilder()
                    .setCustomId('all_button')
                    .setLabel('🔵')
                    .setStyle(2),
                new ButtonBuilder()
                    .setCustomId('cancel_button')
                    .setLabel('❌')
                    .setStyle(2)
            );

        const msg = await message.channel.send({ embeds: [embed], components: [row] , allowedMentions: { repliedUser: false, } });

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 300000 });

        collector.on('collect', i => {
            if (i.user.id === message.author.id) {
                if (!i.isButton()) return;
                if (i.customId === 'online_button') {
                    const onlineMembers = i.guild.members.cache.filter(m => m.presence?.status !== 'offline' && !m.user.bot);
                    onlineMembers.forEach(async (member) => {
                        try {
                            if (member) {
                                await member.send({ content: `${bcmsg}  \n \n${member}` });
                            }
                        } catch (error) {}
                    });
                    setTimeout(() => msg.delete(), 3000);
                    i.reply({ content: `Broadcast is sending ...`, ephemeral: true });
                } else if (i.customId === 'all_button') {
                    const guildMembers = i.guild.members.cache.filter(m => !m.user.bot);
                    guildMembers.forEach(async (member) => {
                        try {
                            if (member) {
                                await member.send({ content: `${bcmsg}  \n \n${member}` });
                            }
                        } catch (error) {}
                    });
                    setTimeout(() => msg.delete(), 3000);
                    i.reply({ content: `Broadcast is sending ...`, ephemeral: true });
                } else {
                    setTimeout(() => msg.delete(), 3000);
                    i.reply({ content: `Broadcast canceled successfully`, ephemeral: true });
                }
            } else {
                i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });

        collector.on('end', () => {
        setTimeout(() => msg.delete(), 3000);
        });
        setTimeout(() => message.delete(), 300000);
    }
};
