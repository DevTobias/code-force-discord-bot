/* eslint-disable consistent-return */

exports.getUserFromMention = (mention, client) => {
  // If not mentioned
  if (!mention) return;

  // If valid mention, parse it to id and return it
  if (mention.startsWith('<@') && mention.endsWith('>')) {
    const userID = mention.slice(3, -1);
    return client.users.cache.get(userID);
  }
};
