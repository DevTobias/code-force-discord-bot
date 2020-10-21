/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Import dependencies
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../../config.json');

const logoFile = new Discord.MessageAttachment('./assets/logo.jpg');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  execute(message) {
    // Template for embed message
    let exampleEmbed = {
      color: 0xf57c00,
      title: 'Code Force Assistent Help',
      url: 'https://codeforced.de',
      author: { name: 'Code Force Assistent', icon_url: 'attachment://logo.jpg' },
      description: 'The Code Force Assistent is the easiest way to play music, manage suverys, clean the server and many more features. in your Discord server. For now, it only supports Youtube!\n To get started, join a voice channel and `$play` a song. You can use song names, video links, and playlist links.',
      fields: [
        { name: '\u200b', value: '\u200b' },
        { name: '\nAdd to Discord', value: 'Code Force Assistent can be added to as many servers as you want! [Click here](https://codeforced-assistent.bot) to add it to yours.' },
        { name: '\nMore information', value: 'Code is on [GitHub](https://github.com/DevTobias/code-force-discord-bot)!' },
      ],
      timestamp: new Date(),
      footer: { text: '©Code Forced', icon_url: 'attachment://logo.jpg' },
    };

    // Add Description of command for all command subfolders
    exampleEmbed = this.addCommands('commands/misc/', 'Quality of Life Commands', exampleEmbed);
    exampleEmbed = this.addCommands('commands/music/', 'Music Commands', exampleEmbed);
    exampleEmbed = this.addCommands('commands/core/', 'Core Commands', exampleEmbed);

    // Send the created embed
    message.channel.send({ files: [logoFile], embed: exampleEmbed });
  },

  addCommands(dir, groupName, embed) {
    // Adds all names, desriptions of the *.js files of given dir
    const commandFileNames = fs.readdirSync(`./${dir}`).filter((file) => file.endsWith('.js'));
    for (let j = 0; j < commandFileNames.length; j += 1) {
      const command = require(`../../${dir}${commandFileNames[j]}`);
      embed.fields.unshift({
        name: `\`${prefix}${command.name}\``,
        value: `${command.description}\n`,
      });
    }

    // Spacing for next command group
    embed.fields.unshift({ name: groupName, value: '-----------------------------------------------------------------------------------------------' });
    embed.fields.unshift({ name: '\u200b', value: '\u200b' });
    return embed;
  },
};
