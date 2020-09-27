const {MessageEmbed} = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../basicfunc.js");


module.exports = {
    name: "ui",
    category: "utils",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));


        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';


        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Information du Membre:', stripIndents`**- Pseudo:** ${member.displayName}
            **- Rejoint à:** ${joined}
            **- Roles:** ${roles}`, true)

            .addField('Information du Compte:', stripIndents`**- ID:** ${member.user.id}
            **- Nom **: ${member.user.username}
            **- Digit **: ${member.user.tag}
            **- Crée le **: ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Il joue à', stripIndents`** Nom du jeux:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
};
