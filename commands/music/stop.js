module.exports = {
    name: "stop",
    category: "music",
    description: "pause la music",
    usage: "<id | mention>",
    run: async (client, message, args) => {    
        
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Faut étre dans un channel pour jouer');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Ya rien qui est joué :(');
		serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('La commande a été utilisé !');
        
    }
};