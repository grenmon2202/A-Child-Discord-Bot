const Discord = require('discord.js')
const command_load = require('./command-loader')
const prefix = '~'

module.exports = {
    commands: ['help'],
    max_args: 1,
    arguments_expected: '<command>',
    description: 'Use this if you want to learn about this bot\'s commands',
    callback: (message, arguments, text) => {
        const command_list = command_load()

        if (text.length >= 1){
            let helpEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle ('I got you mate!')
            var commie
            for (command of command_list){
                for (title of command.commands){
                    if (title == text){
                        commie = command
                        break;
                    }
                }
                if (commie)
                    break;
            }
            if(!commie)
                message.channel.send('Command not found :negative_squared_cross_mark:')
            else{
                if(commie.permissions){
                    const perms = commie.permissions.join(', ')
                    helpEmbed.setDescription(`Command: ${text}\n\nUsage: ${prefix}${text} ${commie.arguments_expected}\nDescription: ${commie.description}\nPermissions Required: ${perms}`)
                }
                else
                    helpEmbed.setDescription(`Command: ${text}\n\nUsage: ${prefix}${text} ${commie.arguments_expected}\nDescription: ${commie.description}`)
                message.channel.send(helpEmbed)
            }
        }

        else{
            let com_list = []
            let helpEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle ('I got you mate!')
                
            for (command of command_list){
                var com = command.commands[0]
                //var field_part1 = command.commands.join(', ')
                // if (command.arguments_expected!=undefined)
                //     field_part1=field_part1+' '+ command.arguments_expected
                com_list.push(`${com}`)
            }
            const fin_com_list = com_list.join(', ')

            helpEmbed.setDescription (`Here is a list of all the commands you can currently give me!: \n\n ${fin_com_list}`)
            helpEmbed.setFooter('To find out the usage for a command type ~help <command_name>')

            message.channel.send(helpEmbed);
        }
    }
}