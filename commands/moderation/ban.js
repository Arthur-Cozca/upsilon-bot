const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../basicfunc");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "ban un petit batard",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        let logChannel = client.channels.cache.find(c => c.id === "700031501185712229") || message.channel;
        if (message.deletable) message.delete();

      
        if (!args[0]) {
            return message.reply("Tu veux que je ban tout le serveur ? Non ? Alors dis moi qui je dois ban ! :D")
                .then(m => m.delete(5000));
        }

       
        if (!args[1]) {
            return message.reply("Le pauvre je vais pas le bannir sans raison")
                .then(m => m.delete(5000));
        }

       
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Alors, on essaye de ban alors qu'on a pas les permissions ? c'est pas bien ça ! :(")
                .then(m => m.delete(5000));
        
        }
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Ils sont drôle eux j'ai même pas la permission de bannir")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

       
        if (!toBan) {
            return message.reply("Ce membre n'existe pas seriez-vous schizophrène ?")
                .then(m => m.delete(5000));
        }

       
        if (toBan.id === message.author.id) {
            return message.reply("Vous avez bien été banni... non en vrai je ne peux pas x)")
                .then(m => m.delete(5000));
        }

        if (!toBan.bannable) {
            return message.reply("Cette personne est au dessus de moi :(")
                .then(m => m.delete(5000));
        }
        
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**- Utilisateur banni :** ${toBan} (${toBan.id})
            **- banni par:** ${message.member} (${message.member.id})
            **- Raison:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Vous avez 30 secondes pour bannir cette personne, après ce délai la procedure sera annulé.`)
            .setDescription(`Voulez-vous ban ${toBan}?`)
        
        const banembed = new MessageEmbed()
            .setTitle("UpsilonBOT - Ban")
            .setColor("RED")
            .setDescription(`Vous avez été ban du serveur Upsilon E-Sport pour la raison suivante : ${args.slice(1).join(" ")} par ${message.member}`)
            .addField("Une erreur ?", "Si vous pensez que ceci est une erreur, contactez-nous à l'adresse suivante : contact@upsilon-esport.com")

        
        await message.channel.send(promptEmbed).then(async msg => {
            
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

           
            if (emoji === "✅") {
                msg.delete();
                try {
                    toBan.send(banembed)
                } catch(e){
                        return console.log(err);
                }
                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Bien bien, il y'a eu une erreur inattendue lors de l'execution de la commande ${err}`)
                    });
               
                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Ban annulé.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};


