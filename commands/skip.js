module.exports = {
  name: 'skip',
  description: 'Skip a song!',
  execute(message) {
    // Get queue from the server which requested
    const serverQueue = message.client.queue.get(message.guild.id);

    // Check if user is in voice channel
    if (!message.member.voice.channel) {
      return message.channel.send('You have to be in a voice channel to stop the music!');
    }

    // Check if server queue is empty / doenst exists
    if (!serverQueue) {
      return message.channel.send('There is no song that I could skip!');
    }

    // End the current voice stream
    return serverQueue.connection.dispatcher.end();
  },
};
