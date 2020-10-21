module.exports = {
  name: 'stop',
  description: 'Stop all songs in the queue!',
  execute(message) {
    // Get queue from the server which requested
    const serverQueue = message.client.queue.get(message.guild.id);

    // Check if user is in voice channel
    if (!message.member.voice.channel) {
      return message.channel.send('You have to be in a voice channel to stop the music!');
    }

    // Clear the whole queue and end the current voice stream
    serverQueue.songs = [];
    return serverQueue.connection.dispatcher.end();
  },
};
