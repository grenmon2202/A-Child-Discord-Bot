const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log("I Am Online and Ready To Shoot Some Noobs!");
});

const prefix = '~';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)
    return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "pants"){
        client.commands.get('pants').execute(message, args);
    }
});

client.login("ODA4Mjg4OTgyMzEwOTc3NTU2.YCEXxg.LjKNgR0PvWsgv59vWQVTeatoDn0");