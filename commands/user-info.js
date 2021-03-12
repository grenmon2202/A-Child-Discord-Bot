const Discord = require('discord.js')
const { Mongoose } = require('mongoose');
const mongo = require('../mongo')
const schema = require('../schemas/warning-schema')

module.exports = {
    commands: ['user-info', 'uf'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description:'List the details of the user',
    callback: async (message, arguments, text) => {
        let user = message.mentions.users.first();
        if(!user)
        user = message.author;
        const user_id= user.id 
        const guild_id=message.guild.id
        //console.log(user.username);
        const member = message.guild.member(user);
        const { displayName, joinedAt, lastMessage, permissions, premiumSince, roles } = member;
        const { bot, createdAt, tag } = user;
        var is_bot = 'Nope'
        if (bot)
        is_bot='Yes :robot:'
        //console.log(lastMessage);
        //console.log(displayName, joinedAt, createdAt, lastMessage, permissions.toArray(), premiumSince, bot, createdAt, tag);
        let roleArr = [];
        for(role of roles._roles){
            if(role[1].name!='@everyone')
            roleArr.push(role[1].name);
        }
        var number_of_warnings
        await mongo().then (async mongoose => {
            try {
                const warnings = await schema.findOne(
                    {
                        user_id,
                        guild_id
                    }
                )
                if (!warnings){
                    number_of_warnings=0
                }
                else{
                    number_of_warnings=warnings.reason.length
                }
            } finally{
                mongoose.connection.close()
            }
        })
        let infoEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(user.avatarURL())
            .setTitle(`${displayName}'s user info:`)
            .addFields(
                {
                    name: 'User Name',
                    value: tag,
                    inline: true,
                },
                {
                    name: 'Server Join Date',
                    value: joinedAt.toDateString()+', '+joinedAt.getHours()+':'+joinedAt.getMinutes()+':'+joinedAt.getSeconds(),
                    inline: true,
                },
                {
                    name: 'Discord Join Date',
                    value: createdAt.toDateString()+', '+createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds(),
                    inline: true,
                },
                {
                    name: 'Is Bot?',
                    value: is_bot,
                    inline: true,
                },
                {
                    name: 'Number of Warnings',
                    value: number_of_warnings,
                    inline: true,
                },
                {
                    name: 'Boosting Since',
                    value: premiumSince,
                    inline: true,
                },
                {
                    name: 'Roles',
                    value: roleArr,
                    inline: true,
                },
                {
                    name: 'Permissions',
                    value: permissions.toArray(),
                    inline: true,
                },
            );
        message.channel.send(infoEmbed);
    }
}