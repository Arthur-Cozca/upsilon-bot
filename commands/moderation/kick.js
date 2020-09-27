const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../basicfunc.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Donner un coup de pied au fesse",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let logChannel = client.channels.cache.find(c => c.name === "sanctions") || message.channel;
        if (message.deletable) message.delete();


        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Tiens tiens tiens, aurait-il un(e) usurpateur ou usurpatrice qui essaierai de faire la commande sans permission ?")
                .then(m => m.delete(5000));
        }

        if(args[0] == "help"){
          message.channel.send("Usage : !kick [membre] [raison], permet de kick un utilisateur du serveur");
          return;
        }

        if (!args[0]) {
            return message.reply("Désolé, j'ai que 2 jambes, donc dis moi a qui je dois donner un coup de pied au fesse ! :D")
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply("Déjà que un coup de pied au fesse ça fait mal, alors se faire kick sans raison ça l'est encore plus ! :(")
                .then(m => m.delete(5000));
        }





        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ A quoi ça sert de me demander de punir si j'ai même pas les permissions :sob:")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);


        if (!toKick) {
            return message.reply("*pssst, désolé mais cette personne n'existe pas, tu veux que j'appelle un hôpital ?*")
                .then(m => m.delete(5000));
        }


        if (toKick.id === message.author.id) {
            return message.reply("Tes sûr ? ça va faire très mal ! Allez donne moi un vrai membre qui le mérite")
                .then(m => m.delete(5000));
        }


        if (!toKick.kickable) {
            return message.reply("Sorry, mais je peux bannir un mec au dessus de moi, saleté de régime !")
                .then(m => m.delete(5000));
        }

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**- Membre kick :** ${toKick} (${toKick.id})
            **- Kick par:** ${message.member} (${message.member.id})
            **- Raison:** ${args.slice(1).join(" ")}`);

            const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Vous avez 30 secondes pour bannir cette personne, après ce délai la procedure sera annulé.`)
            .setDescription(`Voulez-vous kick ${toKick}?`)

            const kickembed = new MessageEmbed()
            .setTitle("UpsilonBOT - Kick")
            .setColor("RED")
            .setDescription(`Vous avez été kick du serveur Upsilon E-Sport pour la raison suivante : ${args.slice(1).join(" ")} par ${message.member}`)
            .addField("Une erreur ?", "Si vous pensez que ceci est une erreur, contactez-nous à l'adresse suivante : contact@upsilon-esport.com")

        await message.channel.send(promptEmbed).then(async msg => {

            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


            if (emoji === "✅") {
                msg.delete();
                toKick.send(kickembed);
                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`OOF il s'est passé quoi là ? ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`kick annulé, je suis dégoûté`)
                    .then(m => m.delete(10000));
            }
        });
    }
};
