const Discord = require('discord.js');
const token = require('./token.json');

const client = new Discord.Client();

client.on("ready", () =>{
    console.log("I Am Online and Ready To Shoot Some Noobs!");
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("~help");
 });

const prefix = '~';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)
    return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //console.log(client.commands.get('map-veto').active);

    if(command === "pants"&&client.commands.get('pants').active){
        client.commands.get('pants').execute(message, args, Discord);
    } else if (command === "map-veto"&&client.commands.get('map-veto').active){
        client.commands.get('map-veto').execute(message, args, Discord);
    } else if (command === "suggestions"&&client.commands.get('suggestions').active){
        client.commands.get('suggestions').execute(message, args, Discord);
    } else if (command === "help"&&client.commands.get('help').active){
        client.commands.get('help').execute(message, args, Discord, client.commands);
    }
    /*
    To do
    furry command
    movie suggestions comnmand
    */
});

client.login(token.token);