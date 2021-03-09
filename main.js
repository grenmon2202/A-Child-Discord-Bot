const Discord = require('discord.js')
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')

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
        }
    })

    const handler = 'command-handler.js'
    const handler_imp = require('./commands/command-handler.js')

    const command_reader = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()){
                command_reader(path.join(dir, file))
            } else if(file !== handler) {
                const option = require(path.join(__dirname, dir, file))
                handler_imp(client, option)
            }
        }
    }

    command_reader('commands')
 });    

client.login(config.token);