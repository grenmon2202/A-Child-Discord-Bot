const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/bos-schema')

module.exports = {
    commands: ['clear-all-bos', 'cab'],
    permission_err: 'You do not have the permissions required to run this command',
    permissions: ['ADMINISTRATOR'],
    description: 'Clear all ban on sights on your server',
    callback: async (message, arguments, text) => {
        const guild = message.guild
        const guild_id = guild.id

        await mongo().then (async mongoose => {
            try {
                await schema.findOneAndDelete(
                    {
                        guild_id
                    }
                )
                message.reply('All ban on sights cleared :thumbsup:')
            } finally{
                mongoose.connection.close()
            }
        })
    }
}