module.exports = {
  name: 'nowplaying',
  description: 'Get the song that is playing.',
  execute(message) {
    // Get queue from the server which requested
    const serverQueue = message.client.queue.get(message.guild.id);

    // Check if server queue is empty / doenst exists
    if (!serverQueue) {
      return message.channel.send('There is nothing playing.');
    }

    // Send the songtilte which is currently playing
    return message.channel.send(`Now playing: **${serverQueue.songs[0].title} - ${serverQueue.songs[0].artist}**`);
  },
};
