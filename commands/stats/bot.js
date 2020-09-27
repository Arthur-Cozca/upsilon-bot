const { MessageCollector, MessageEmbed } = require("discord.js");

module.exports = {
    name: "bot",
    category: "stats",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let messageemb = `Il y'a en ce moment : **${message.guild.members.cache.filter((m) => m.user.bot).size}** bots sur le serveur ! :o`;
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(messageemb)
        message.channel.send(embed);
    }
};