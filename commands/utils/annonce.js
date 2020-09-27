const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");


module.exports = {
    name: "annonce",
    category: "utils",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let annonceChannel = client.channels.cache.find(c => c.id === "699031823136587796") || message.channel;
        
        if (message.deletable) message.delete();

      
        if (!args[0]) {
            return message.reply("Je dois envoyer quoi msieur ?! :D")
                .then(m => m.delete(5000));
        }

       
       

       
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ Alors, on essaye de faire une annonce alors qu'on a pas les permissions ? c'est pas bien ça ! :(")
                .then(m => m.delete(5000));
        
        }
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ Ils sont drôle eux j'ai même pas la permission '")
                .then(m => m.delete(5000));
        }

        const annonceMessage = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const embed = new MessageEmbed()
            .setColor("#7289DA")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(args.join(' '));

            annonceChannel.send(embed);
    }
};

