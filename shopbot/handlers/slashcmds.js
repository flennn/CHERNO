module.exports = async (client) => {

const fs = require('fs');
const { Permissions } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

client.on('ready', async () => {

  const TOKEN = client.token;
  const CLIENT_ID = client.user.id;
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  const slashCommands = [];

  // Read all slash command files
  const dirs = fs.readdirSync('/home/runner/Cherno/shopbot/slashCommands/');
  for (const dir of dirs) {
    const files = fs.readdirSync(`/home/runner/Cherno/shopbot/slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

    // Load each slash command and push it to the slashCommands array
    for (const file of files) {
      const slashCommand = require(`/home/runner/Cherno/shopbot/slashCommands/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        options: slashCommand.options || [],
        default_permission: slashCommand.default_permission || true,
        default_member_permissions: slashCommand.default_member_permissions ? new Permissions(slashCommand.default_member_permissions).toString() : null
      });
      client.slashCommands.set(slashCommand.name, slashCommand);
    }
  }

  // Register slash commands
  try {
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: slashCommands }
    );
    
   // console.log(`Registered ${slashCommands.length} slash commands `);
    
  } catch (error) {
  console.log(error);
  }
})};
