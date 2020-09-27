const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "membre",
    category: "stats",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let messageemb = `Il y'a en ce moment : **${message.guild.memberCount}** membres sur le serveur avec les bots ! :o`;
        let embed = new MessageEmbed()
        .setDescription(messageemb)
        .setColor("GREEN")
        message.channel.send(embed);
    }
};