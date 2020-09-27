const { RichEmbed } = require("discord.js");
const moment = require("moment")

module.exports = {
    name: "unban",
    category: "moderation",
    description: "deban un membre",
    usage: "<id | mention>",
    run: async (client, message, args) => {
       let log = message.guild.channels.cache.find("name", "sanctions") || message.channel;
       message.delete();
       if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Il vous manque la permission BAN_MEMBERS");
       if(args[0] == "help"){
         message.channel.send("Usage : !unban [membre] [raison], permet d'unban un utilisateur");
         return;
       }
       let bannedmember = await client.fetchUser(args[0]);
       let reason = args.join(" ").slice(22);


       if(!bannedmember) return message.reply("Utilisateur introuvable");
       if(!reason) reason = "Aucune raison fournie.";

       let unbanembed = new RichEmbed()
       .setTitle(`**UNBAN**`)
       .setColor("GREEN")
       .setDescription(`Message ID: ${message.id}`)
       .setFooter(`A: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now)}`)
       .addField("Membre Deban:", `${bannedmember}`)
       .addField("Deban par :", `${message.author}`)
       .addField("Raison:", reason);


       log.send(unbanembed);

       try {
         message.guild.unban(bannedmember, {reason: reason});
         bannedmember.send(`Vous avez été unban du serveur ${message.guild.name} par ${message.member}.`);
         console.log(`${bannedmember.tag} a été unban du serveur ${message.guild.name}.`);
       } catch (e) {
         console.log(e.message);
       }
}
}
