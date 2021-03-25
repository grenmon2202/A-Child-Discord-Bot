const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/bos-schema')

module.exports = {
    commands: ['list-bos', 'lb'],
    permission_err: 'You do not have the permissions required to run this command',
    permissions: ['ADMINISTRATOR'],
    description: 'List the ban on sights for your server',
    callback: async (message, arguments, text) => {
        const guild = message.guild
        const guild_id = guild.id

        await mongo().then (async mongoose => {
            try {
                const warnings = await schema.findOne(
                    {
                        guild_id
                    }
                )
                if (!warnings){
                    message.channel.send(':detective: No ban on sights for this server :detective:')
                }
                else{
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setThumbnail(guild.iconURL())
                        .setTitle(`${guild.name}'s ban on sights:`)
                    const uss = warnings.usernames
                    const fss = warnings.flags
                    const iss = warnings.userIDs
                    var i = 1
                    var us=''
                    for (const user of uss){
                        us = us+ i + '. ' + user+ ',\n'
                        i++
                    }
                    var fs=''
                    for (const field of fss){
                        fs = fs+ i + '. ' + field+ ',\n'
                        i++
                    }
                    var is=''
                    for (const id of iss){
                        is = is+ i + '. '+ id+ ',\n'
                        i++
                    }
                    embed.setDescription(`Usernames:\n${us}\nFlags:\n${fs}\nUserIDs:\n${is}`)
                    message.channel.send(embed)
                }
            } finally{
                mongoose.connection.close()
            }
        })
    }
}