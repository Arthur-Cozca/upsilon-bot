const ytdl = require('ytdl-core');
const {Util} = require('discord.js');

module.exports = {
    name: "play",
    category: "music",
    description: "joue une musique",
    usage: "play <url>",
    run: async (client, message, args) => {
        
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send(':x: Désolé, mais faut que tu sois dans un channel pour que je puisse jouer de la musique :/');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send(':x: J arrive pas à me connecter au channel, j ai les bonnes permissions ? :o');
		if (!permissions.has('SPEAK')) return message.channel.send(':x: Laisse moi parler si tu veux entendre de la musique !');

		const serverQueue = message.client.queue.get(message.guild.id);
		const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
		const song = {
			id: songInfo.videoDetails.video_id,
			title: Util.escapeMarkdown(songInfo.videoDetails.title),
			url: songInfo.videoDetails.video_url
		};

		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** est ajouté à la liste yeah yeah yeah !`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Musique : **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`J'arrive pas à joindre le channel ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`J'arrive pas à joindre le channel ${error}`);
        }
    }
};