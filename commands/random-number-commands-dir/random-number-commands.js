const Discord = require ('discord.js')

module.exports = {
    calc_info(message, calc_what){
        if(message.mentions.users.first()!=undefined){
            user = message.mentions.users.first();
        }
        else{
            user=message.author;
        }

        let chance = Math.floor(Math.random()*101);
    
        let furryEmbed = new Discord.MessageEmbed()
            .setTitle(`${calc_what} Calculator`)
            .setDescription((`${user.username} is ${chance}% ${calc_what}`))
            .setColor('RED')

        let isGood = chance<50 ? true:false;

        if(isGood)
            furryEmbed.setColor('GREEN')

        message.channel.send(furryEmbed)
        
        return
    },

    calc_info(message, calc_what, send_back_no){
        if(message.mentions.users.first()!=undefined){
            user = message.mentions.users.first();
        }
        else{
            user=message.author;
        }

        let chance = Math.floor(Math.random()*101);
    
        let furryEmbed = new Discord.MessageEmbed()
            .setTitle(`${calc_what} Calculator`)
            .setDescription(`${user.username} is ${chance}% ${calc_what}`)
            .setColor('RED')

        let isGood = chance<50 ? true:false;

        if(isGood)
            furryEmbed.setColor('GREEN')

        message.channel.send(furryEmbed)

        if (send_back_no)
            return chance
        
        return
    }
}