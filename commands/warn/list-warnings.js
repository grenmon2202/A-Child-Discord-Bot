const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/warning-schema')

module.exports = {
    commands: ['list-warnings', 'lw'],
    arguments_expected: '<user>',
    permission_err: 'You do not have the permissions required to run this command',
    min_args: 1,
    max_args: 1,
    permissions: ['ADMINISTRATOR'],
    description: 'List the warnings that a user has',
    callback: async (message, arguments, text) => {
        const member = message.mentions.users.first();
        const guild = message.guild
        const user_id = member.id
        const guild_id = guild.id

        await mongo().then (async mongoose => {
            try {
                const warnings = await schema.findOne(
                    {
                        user_id,
                        guild_id
                    }
                )
                if (!warnings){
                    message.channel.send('This user is clean :sunglasses:!')
                }
                else{
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setThumbnail(member.avatarURL())
                        .setTitle(`${member.tag}'s warnings:`)
                    let ws = []
                    for (const warning of warnings.reason){
                        ws.push(`${warning}`)
                    }
                    embed.setDescription(ws.join('\n'))
                    message.channel.send(embed)
                }
            } finally{
                mongoose.connection.close()
            }
        })
    }
}