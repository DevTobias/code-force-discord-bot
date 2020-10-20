/* eslint-disable no-console */

// Import dependencies
const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  description: 'Play a song in your voice channel!',
  async execute(message) {
    try {
      // Parse command arguments - YoutubeLink
      const args = message.content.split(' ');

      // Get queue from the server which requested
      const { queue } = message.client;
      const serverQueue = message.client.queue.get(message.guild.id);

      // Check if user is in voice channel
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.channel.send(
          'You need to be in a voice channel to play music!',
        );
      }

      // Check if bot has permission (connect, speak) to join the voice channel
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send(
          'I need the permissions to join and speak in your voice channel!',
        );
      }

      // Get YTVideo info from link
      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      };

      // If queue exists, add a song else create a new queue
      if (!serverQueue) {
        // Create Object for queue
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        // Save the song in the queue
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);

        // Try playing the added song
        try {
          const connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.err(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }

      // Enqueue a new object
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(
          `${song.title} has been added to the queue!`,
        );
      }
    } catch (error) {
      console.err(error);
      message.channel.send(error.message);
    }
    return null;
  },

  play(message, song) {
    const { queue } = message.client;
    const { guild } = message;
    const serverQueue = queue.get(message.guild.id);

    // If Song object is invalid
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    // Play a song, if done play the next one in queue
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on('finish', () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on('error', (error) => console.error(error));

    // Configure dispatcher volume and message user
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  },
};
