const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/bos-schema')

module.exports = {
    commands: ['bos'],
    arguments_expected: '<bos type> <bos entry>',
    permission_err: 'You do not have the permissions required to run this command',
    min_args: 2,
    permissions: ['ADMINISTRATOR'],
    description: 'Ban on sight command\n\nPlease note the correct syntax of the command:\n1. ~bos -u <username with tag>. Example: ~bos -u Test#3456 will ban this particular user, for as long as he has the name \'Test\', however, changing his username will make it so that the bos is nullified.\n2. ~bos -f <flag>. Example: ~bos -f piggy will ban any member who joins and has the word \'piggy\' as part of their username.\n3. ~bos -i <userID>. Enter the particular user\'s ID to prevent the user from being unbanned if he changes his user name or tag.\n',
    callback: async (message, arguments, text) => {

        const entry = arguments[1]
        const guild_id = message.guild.id;

        if(arguments[0]==='-u'){
            if(!entry.includes('#') || entry.includes('@')){
                message.channel.send('Please ensure that the tag is in the syntax <username>#<4 digit discriminator>')
            } else {
                const entry_split = entry.split('#')
                const nick = entry_split[0]
                const disc = entry_split[1]
                if (disc.length!=4){
                    message.channel.send('Please ensure that the tag is in the syntax <username>#<4 digit discriminator>')
                }
                else {
                    await mongo().then (async mongoose => {
                        try {
                            await schema.findOneAndUpdate(
                                {
                                    guild_id
                                },
                                {
                                    guild_id,
                                    $push: {usernames: entry}
                                },
                                {
                                    upsert: true
                                }
                            )
                        } finally{
                            mongoose.connection.close()
                        }
                    })
                    message.channel.send(':detective: Understood boss :detective:')
                }
            }
        } else if(arguments[0]==='-f'){
            await mongo().then (async mongoose => {
                try {
                    await schema.findOneAndUpdate(
                        {
                            guild_id
                        },
                        {
                            guild_id,
                            $push: {flags: entry}
                        },
                        {
                            upsert: true
                        }
                    )
                } finally{
                    mongoose.connection.close()
                }
            })
            message.channel.send(':detective: Understood boss :detective:')
        } else if(arguments[0]==='-i'){
            await mongo().then (async mongoose => {
                try {
                    await schema.findOneAndUpdate(
                        {
                            guild_id
                        },
                        {
                            guild_id,
                            $push: {userIDs: entry}
                        },
                        {
                            upsert: true
                        }
                    )
                } finally{
                    mongoose.connection.close()
                }
            })
            message.channel.send(':detective: Understood boss :detective:')
        }
    }
    
}