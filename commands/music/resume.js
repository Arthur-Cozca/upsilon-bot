module.exports = {
    name: "resume",
    category: "music",
    description: "joue une musique",
    usage: "play <url>",
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ La musique reprend yeah yeah yeah !');
		}
		return message.channel.send('Ya rien qui est joué :(');
    }
};