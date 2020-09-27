module.exports = {
    name: "skip",
    category: "music",
    description: "joue une musique",
    usage: "play <url>",
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Si tu veux que je joue de la musique, faut que tu sois dans un channel !');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Ya aucune musique après, donc met en une, et tu pourra skip');
		serverQueue.connection.dispatcher.end('La commande a été utilisé !');
    }
};