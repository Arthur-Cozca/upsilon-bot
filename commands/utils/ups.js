const { MessageCollector, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ups",
    category: "utils",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let messageemb = `Hé Hé ta trouvé, code ES-UPS dans la boutique :blobhero: :logo:`;
        let embed = new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(messageemb)
        message.channel.send(embed);
    }
};