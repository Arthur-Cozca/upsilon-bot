module.exports = {
    name: "volume",
    category: "music",
    description: "pause la music",
    usage: "<id | mention>",
    run: async (client, message, args) => {    
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Désolé, mais sois dans un channel pour modifier le volume !');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Y\'a rien qui est joué :(');
		if (!args[0]) return message.channel.send(`En ce moment, le volume est: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; 
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`J'ai mis le volume à: **${args[0]}**`);
    }
};