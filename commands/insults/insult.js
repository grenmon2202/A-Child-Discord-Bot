const Discord = require('discord.js')
const { Mongoose } = require('mongoose')
const mongo = require('../../mongo')
const schema = require('../../schemas/insults-schema')

module.exports = {
    commands: ['insult'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description: 'Insult a user',
    callback: async (message, arguments, text) => {
        await mongo().then (async mongoose => {
            try {
                const count = await schema.countDocuments()
                var rand = Math.floor(Math.random() * count)
                const insult = await schema.findOne().skip(rand)
                if (!arguments[0]){
                    message.reply(insult.insult_text)
                } else {
                    const user = message.guild.member(message.mentions.users.first())
                    message.channel.send(`${user.user}, ${insult.insult_text}`)
                }
            } finally{
                mongoose.connection.close()
            }
        })
    }
}