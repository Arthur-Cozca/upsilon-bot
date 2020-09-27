const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Nettoyer le chat",
    run: async (client, message, args) => {
        let log = message.guild.channels.cache.find(c => c.name === "sanctions") || message.channel;
        if (message.deletable) {
            message.delete();
        }



        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Vous n'avez pas les permissions pour supprimer des messages...").then(m => m.delete(5000));
        }

        if(args[0] == "help"){
          message.channel.send("Usage : !clear [Nombre <= 100], permet de supprimer un message");
          return;
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Merci de me donner un nombre entier supérieur à 0 SVP").then(m => m.delete(5000));
        }


        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Je n'ai pas les permissions requises pour effacer les messages").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        let clearembed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Clear")
        .setDescription(`${deleteAmount} messages ont été supprimé dans le channel ${message.channel.name}`)
        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => log.send(clearembed))
            .catch(err => message.reply(`Erreur lors de l'effacement. Checker les logs du bot ! Erreur : ${err}`));
    }
}