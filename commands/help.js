const Discord = require('discord.js')
const command_load = require('./command-loader')
const prefix = '~'

module.exports = {
    commands: ['help'],
    max_args: 0,
    description: 'Use this if you want to learn about this bot\'s commands',
    callback: (message, arguments, text) => {
        const command_list = command_load()
        let helpEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle ('I got you mate!')
            .setDescription ('Here is a list of all the commands you can currently give me!');
        for (command of command_list){
            var field_part1 = command.commands.join(', ')
            helpEmbed.addField(`${prefix}${field_part1}`, command.description);
        }
        message.channel.send(helpEmbed);
    }
}