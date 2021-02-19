const { GuildTemplate } = require("discord.js");

module.exports = {
    name:'furry',
    description: 'Find out whether or not your friend is actually a sick furry',
    active: true,
    instructions: '~furry, ~furry <user>',
    async execute(message, args, Discord, jimp){
        var furryTest;
        if(message.mentions.users.first()!=undefined){
            furryTest = message.mentions.users.first();
        }
        else{
            furryTest=message.author;
        }
        let chance = Math.floor(Math.random()*101);
        
        let furryEmbed = new Discord.MessageEmbed()
            .setTitle('Furry Calculator')
            .setDescription((`${furryTest.username} is ${chance}% furry`))

        let isFurry = chance<50 ? false:true;
        
        if (isFurry){
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
            message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
            message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
            message.channel.send(':rotating_light::warning:Furry Alert:warning::rotating_light:');
            furryEmbed.setColor('RED');
            message.channel.send(furryEmbed);
            message.channel.send(`${furryTest.username} imagine being a furry, man :nauseated_face:`,{files: ["./attachments/furryHuman.png"]});
        }

        else{
            furryEmbed.setColor('GREEN');
            message.channel.send(furryEmbed);
        }
    }
}