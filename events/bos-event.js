const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../mongo')
const schema = require('../schemas/bos-schema')

module.exports = 
    async (client) => {
        client.on('guildMemberAdd', async member => {
            const guild_id = member.guild.id
            const user_id = member.user.id 
            const user_name = member.user.username 
            const user_disc = member.user.discriminator
            const user_tag = user_name + '#' + user_disc
            // console.log(user_id, user_name, user_disc, user_tag)
            var usern_arr = []
            var flags_arr = []
            var ids_arr = []
            await mongo().then (async mongoose => {
                try {
                    const warnings = await schema.findOne(
                        {
                            guild_id
                        }
                    )
                    usern_arr=warnings.usernames
                    flags_arr=warnings.flags
                    ids_arr=warnings.userIDs
                } finally{
                    mongoose.connection.close()
                }
            })
            var isImposter = false
            for (user of usern_arr){
                if (user === user_tag)
                    isImposter=true
            }
            for (user of flags_arr){
                if (user_name.includes(user))
                    isImposter=true
            }
            for (user of ids_arr){
                if (user === user_id)
                    isImposter=true
            }
            if (isImposter){
                member.guild.systemChannel.send(':rotating_light::warning:Imposter Alert:warning::rotating_light:')
                member.guild.systemChannel.send(':rotating_light::warning:Imposter Alert:warning::rotating_light:')
                member.guild.systemChannel.send(':rotating_light::warning:Imposter Alert:warning::rotating_light:')
                member.ban()
                member.guild.systemChannel.send(`:nauseated_face: ${user_name} :nauseated_face: was detected trying to join the server and has been banned!`)
            }
        })
    }