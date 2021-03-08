const Discord = require('discord.js');
const token = require('./config.json');
const jimp = require('jimp');
const mongo = require('./mongo');

const client = new Discord.Client();

client.on("ready", async() =>{
    console.log("I Am Online and Ready To Shoot Some Noobs!");
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("~help");
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo');
        } finally{
            mongoose.connection.close();
            console.log('Disconnected from mongo');
        }
    })
 });

const prefix = '~';

const fs = require('fs');
const { Mongoose } = require('mongoose');

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
    } else if ((command === "source-code"||command==="sc")&&client.commands.get('source-code').active){
        client.commands.get('source-code').execute(message, args, Discord, client.commands);
    } else if (command === "furry"&&client.commands.get('furry').active){
        client.commands.get('furry').execute(message, args, Discord, jimp);
    } else if (command === "setwelcome"&&client.commands.get('setwelcome').active){
        client.commands.get('setwelcome').execute(message, args, Discord, client);
    } else if (command === "kick"&&client.commands.get('kick').active){
        client.commands.get('kick').execute(message, args, Discord, client);
    } else if (command === "ban"&&client.commands.get('ban').active){
        client.commands.get('ban').execute(message, args, Discord, client);
    } else if (command === "server-info"&&client.commands.get('server-info').active){
        client.commands.get('server-info').execute(message, args, Discord, client);
    } else if (command === "user-info"&&client.commands.get('user-info').active){
        client.commands.get('user-info').execute(message, args, Discord, client);
    }
    /*
    To do
    furry command
    movie suggestions comnmand
    */
});

client.login(token.token);