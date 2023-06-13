module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 3000,
	run: async (client, message, args) => {
    const msg = await message.reply({ content : 'Pinging...', allowedMentions: { repliedUser: false, }  })

    await msg.edit({ content : `Pong! **${client.ws.ping} ms**` , allowedMentions: { repliedUser: false, } })

	}
};