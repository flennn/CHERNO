const fs = require('fs').promises;
const path = require('path');

module.exports = async (client) => {
  try {
    const commandsDir = '/home/runner/Cherno/Cherno/commands/';

    const dirs = await fs.readdir(commandsDir);
    for (const dir of dirs) {
      const files = await fs.readdir(path.join(commandsDir, dir));

      for (const file of files.filter(f => f.endsWith('.js'))) {
        const command = require(path.join(commandsDir, dir, file));

        if (command) {
          client.commands.set(command.name, command);

          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => {
              client.aliases.set(alias, command.name);
            });
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error loading Cherno Prefixcommands: ${err}`);
  }
};
