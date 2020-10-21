/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

const logoFile = new Discord.MessageAttachment('./assets/logo.jpg');

module.exports = {
  name: 'help',
  description: 'List all available commands.',
  execute(message) {
    const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

    const exampleEmbed = {
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

    for (let i = 0; i < commandFiles.length; i += 1) {
      const command = require(`./${commandFiles[i]}`);
      exampleEmbed.fields.unshift({
        name: `${prefix}${command.name}`,
        value: `${command.description}\n`,
      });
    }
    exampleEmbed.fields.unshift({ name: 'Music Commands', value: '-----------------------------------------------------------------------------------------------' });
    exampleEmbed.fields.unshift({ name: '\u200b', value: '\u200b' });

    message.channel.send({ files: [logoFile], embed: exampleEmbed });
  },
};
