module.exports = {
    name: "pause",
    category: "music",
    description: "pause la music",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ La musique est en pause, remet la vite :(!');
		}
		return message.channel.send(':x: Désolé mais rien nest joué :)');
    }
};