const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/warning-schema')

module.exports = {
    commands: ['warn'],
    arguments_expected: '<user> [reason]',
    permission_err: 'You do not have the permissions required to run this command',
    min_args: 1,
    permissions: ['ADMINISTRATOR'],
    description: 'Warn a user',
    callback: async (message, arguments, text) => {
        const member = message.mentions.users.first();
        const guild = message.guild
        
        if (!member){
            message.channel.send('Enter a user to warn bruh :unamused:')
            return
        }
        const guildMemb = message.guild.members.cache.get(member.id);
        if(guildMemb.hasPermission('ADMINISTRATOR')){
            message.channel.send('Cannot warn an admin :dizzy_face:')
            return;
        }
        var reason
        if (arguments.length==1){
            reason = 'No reason provided'
        }
        else{
            arguments.shift()
            reason = arguments.join(' ')
        }

        const user_id = member.id
        const guild_id = guild.id

        await mongo().then (async mongoose => {
            try {
                await schema.findOneAndUpdate(
                    {
                        user_id,
                        guild_id
                    },
                    {
                        user_id,
                        guild_id,
                        $push: {reason}
                    },
                    {
                        upsert: true
                    }
                )
            } finally{
                mongoose.connection.close()
            }
        })

        let warn_embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor(`${member.tag} has been warned`, member.avatarURL())
            .setDescription('Reason: '+reason);

        message.channel.send(warn_embed)
    }
}