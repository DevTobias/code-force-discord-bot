// Import dependencies
const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
  constructor(config) {
    // Calls the client constructor
    super({
      // Bot can tag everyone with @everyone
      disableEveryone: false,
      // Bot doesnt listen for following events
      disableEvents: ['TYPING_START'],
    });

    // General bot attributes
    this.config = config;
    this.commands = new Collection();

    // Music bot attributes
    this.queue = new Map();
  }
};
