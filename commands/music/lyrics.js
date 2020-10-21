// Import dependencies
const { getLyrics } = require('genius-lyrics-api');

const options = {
  apiKey: '0kTb8aOEe2Y3JYbIGUqjRK5AYaqQ1ePxl2bRju9Xnl0uc7YFkNHamEsfhYAWhKer',
  title: '',
  artist: '',
  optimizeQuery: true,
};

module.exports = {
  name: 'lyrics',
  description: 'Get the lyrics of the playing song.',
  execute(message) {
    // Get queue from the server which requested
    const serverQueue = message.client.queue.get(message.guild.id);

    // Check if server queue is empty / doenst exists
    if (!serverQueue) {
      return message.channel.send('There is nothing playing.');
    }

    // Set the current song information for the request
    options.title = serverQueue.songs[0].title;
    options.artist = serverQueue.songs[0].artist;

    // Send the lyrics of the song which is currently playing
    const lengthPerMessage = 1500;
    return getLyrics(options).then((lyrics) => {
      for (let i = 0; i < lyrics.length; i += lengthPerMessage) {
        message.channel.send(lyrics.slice(i, i + lengthPerMessage));
      }
    });
  },
};
