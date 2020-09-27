const Discord= require('discord.js');
const MusicClient = require('./clientbot');
const { readdirSync } = require("fs");
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.json');
const Console = console;
const client = new MusicClient();


let options = {
    total: "714941752070635620" 
}; 
readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

    for (let file of commands) {
        let pull = require(`./commands/${dir}/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            console.log(file, 'Okep');
        } else {
            console.log(file, `❌  -> Commande erreur !`);
            continue;
        }

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
});

client.once('ready', () => {
    console.log(chalk.green("[CONNECTE] Le bot est en ligne, aucune erreur nice ;)"));
    client.user.setActivity('#1 Victoire Royale', { type: 'WATCHING' })
    .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
})

client.on("message", async message => {
     
    
    const prefix = config.prefix;
    if(message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)){
        return message.reply("Mon prefix est " + prefix);
    }
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);

    
         
});
client.on("guildMemberAdd", (member) => {
    
    try {
        member.guild.channels.cache.get(options.total).setName(`Membres : ${member.guild.memberCount}`); 
       
    
    }
    catch (e) {
    Console.log(e);
    }
});
client.on("guildMemberRemove", (member) => {
   
    try {
        member.guild.channels.cache.get(options.total).setName(`Membres : ${member.guild.memberCount}`);
        
    }
    catch (e) {
    Console.log(e);
    }
});

client.login(config.token);