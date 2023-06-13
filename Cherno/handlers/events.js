const fs = require('fs').promises;
const path = require('path');

module.exports = async (client) => {

  try {
    const eventsDir = '/home/runner/Cherno/Cherno/events/';

    const files = await fs.readdir(eventsDir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const event = require(path.join(eventsDir, file));
        event(client);
      }
    }
  } catch (err) {
    console.error(`Error reading Cherno events: `);
    console.error(err);
  }
};
