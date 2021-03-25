const Discord = require('discord.js')
const jimp = require('jimp')
const random_command = require('./random-number-commands')

module.exports = {
    commands: ['furry'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description: 'Find out whether or not your friend is actually a sick furry',
    callback: (message, arguments, text) => {
        furry_calc(message);
    }
}

async function furry_calc(message){
    if(message.mentions.users.first()!=undefined){
        furryTest = message.mentions.users.first();
    }
    else{
        furryTest=message.author;
    }
    const chance = random_command.calc_info(message, 'Furry', true)

    let isFurry = chance<50 ? false:true;
    
    if (isFurry){
        message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
        message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
        message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
        let avtURL = furryTest.avatarURL({format: "png", dynamic: false, size: 1024});
        let overlay = "https://i.imgur.com/7Z2wKtc.png";
        var jimps = [];
        jimps.push(jimp.read(avtURL));
        jimps.push(jimp.read(overlay));
        await Promise.all(jimps).then(function(data) {
            return Promise.all(jimps)
        }).then(async function(data){
            data[0].resize(1024,1024)
            data[0].composite(data[1], 0, 0)
            data[0].write("./attachments/furryHuman.png")
        })
        message.channel.send(`${furryTest.username} imagine being a furry, man :nauseated_face:`,{files: ["./attachments/furryHuman.png"]});
    }
}