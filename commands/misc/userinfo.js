// Import dependencies
const { getUserFromMention } = require('../../util/getUser');

module.exports = {
  name: 'userinfo [@user]',
  description: 'Get information about a user.',
  execute(message, client) {
    // Parse mention from message
    const split = message.content.split(/ +/);
    const args = split.slice(1);

    // Get UserID from mention
    const user = getUserFromMention(args[0], client);

    // Send back correspondign user information
    message.channel.send(`Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({ size: 2048, dynamic: true })}`);
  },
};
