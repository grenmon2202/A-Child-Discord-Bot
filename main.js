const Discord = require('discord.js')
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')
const command_loader = require('./commands/command-loader')
const bos_event = require('./events/bos-event')

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
    command_loader(client)
    bos_event(client)
 })

client.login(config.token);