const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "help",
    category: "utils",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setColor("#fc8403")
        .setTitle("Help Menu")
        .setDescription("Voici toutes les commandes disponibles")
        .addField(":scroll: UTILS", "`ping`, `help`, `avatar`, `ui`, `annonce`", false)
        .addField(":musical_note: MUSIC", "~~`play`, `skip`, `resume`, `pause`, `queue`, `volume`, `stop`~~", true)
        .addField(":crystal_ball: STATS", "`membre`, `bot`", false)
        .addField("Suite à un problème avec la musique, les commandes musiques seront indisponible pour le moment !", "désolé x)")
        .setFooter("Upsilon-Esport 2020")
        message.channel.send(embed);
        if(message.member.hasPermission("KICK_MEMBERS")){
            let embed2 = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle("Commande Secrète")
            .setDescription("Voici toutes les commandes réservés au staff")
            .addField(":octagonal_sign: MOD", "`ban`, `kick`, `clear`, `mute`")
            .setFooter("Upsilon-Esport 2020")
            message.channel.send(embed2);
        }
    }
};