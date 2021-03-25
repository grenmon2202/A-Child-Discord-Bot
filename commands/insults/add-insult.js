const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/insults-schema')
const config = require('../../config.json')

module.exports = {
    commands: ['add-insult','ai'],
    arguments_expected: '[insult]',
    min_args: 1,
    description: 'Add insults for the insult command',
    callback: async (message, arguments, text) => {
        if (config.acceptingInsults==='NO'){
            message.channel.send('We are not accepting insults at the moment!')
            return
        }

        const insult_text = text
        const contributed_by = message.author.username

        await mongo().then (async mongoose => {
            try{
                await schema.findOneAndUpdate(
                {
                    insult_text,
                    contributed_by
                },
                {
                    insult_text,
                    contributed_by
                },
                {
                    upsert: true
                }
                )
                message.channel.send('Thank you for submitting your insult!!')
            } finally {
                mongoose.connection.close()
            }
        })
    }
}