/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */

// Import dependencies
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');

// Load discord bot config
const { prefix, token } = require('./config.json');

// Create Discord client and log in
const client = new Client();
client.commands = new Discord.Collection();

// Get all *.js files in commands and requiere it
const commandFileNames = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (let i = 0; i < commandFileNames.length; i += 1) {
  const command = require(`./commands/${commandFileNames[i]}`);
  client.commands.set(command.name, command);
}

// Discord basic events
client.once('ready', () => console.log('Ready!'));
client.once('reconnecting', () => console.log('Reconnecting!'));
client.once('disconnect', () => console.log('Disconnect!'));

client.on('message', async (message) => {
  // Parses command and convert to Command
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  // If message was from bot itself,
  if (message.author.bot) return;

  // If message does not start with bot prefix
  if (!message.content.startsWith(prefix)) return;

  // Try executing the written command
  try {
    if (commandName === 'ban' || commandName === 'userinfo') {
      command.execute(message, client);
    } else {
      command.execute(message);
    }
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

// Log into the client
client.login(token);
