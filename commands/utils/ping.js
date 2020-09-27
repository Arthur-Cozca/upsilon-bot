module.exports = {
    name: "ping",
    category: "utils",
    description: "donne le menu help",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Ping....`);

        msg.edit(`Ping Terminé
        Mon ping est de ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        Le ping de l'api est de ${Math.round(client.ping)}ms`);
    }
};
