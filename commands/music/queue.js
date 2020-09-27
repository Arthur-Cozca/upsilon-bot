module.exports = {
    name: "queue",
    category: "music",
    description: "joue une musique",
    usage: "play <url>",
    run: async (client, message, args) => {
        const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Ya rien qui est joué :(');
		return message.channel.send(`
__**QUEUE:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Musique :** ${serverQueue.songs[0].title}
		`);
    }
};