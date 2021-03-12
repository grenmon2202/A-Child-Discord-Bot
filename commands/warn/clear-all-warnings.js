const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/warning-schema')

module.exports = {
    commands: ['clear-all-warnings', 'caw'],
    arguments_expected: '<user>',
    permission_err: 'You do not have the permissions required to run this command',
    min_args: 1,
    max_args: 1,
    permissions: ['ADMINISTRATOR'],
    description: 'Clear all the warnings that a user has',
    callback: async (message, arguments, text) => {
        const member = message.mentions.users.first();
        const guild = message.guild
        const user_id = member.id
        const guild_id = guild.id

        await mongo().then (async mongoose => {
            try {
                await schema.findOneAndDelete(
                    {
                        user_id,
                        guild_id
                    }
                )
                message.reply('All infractions cleared :thumbsup:')
            } finally{
                mongoose.connection.close()
            }
        })
    }
}