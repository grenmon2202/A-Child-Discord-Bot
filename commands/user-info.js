module.exports = {
    name:'user-info',
    description: 'List the details of the user',
    active: true,
    instructions: '~user-info, ~user-info <user>',
    execute(message, args, Discord){
        let user = message.mentions.users.first();
        if(!user)
        user = message.author;
        //console.log(user.username);
        const member = message.guild.member(user);
        const { displayName, joinedAt, lastMessage, permissions, premiumSince, roles } = member;
        const { bot, createdAt, tag } = user;
        //console.log(lastMessage);
        //console.log(displayName, joinedAt, createdAt, lastMessage, permissions.toArray(), premiumSince, bot, createdAt, tag);
        let roleArr = [];
        var messageSent;
        if (lastMessage){
            if(lastMessage.content=='')
            messageSent="~NA~";
            else
            messageSent=lastMessage.content;
        }
        else
        messageSent="~NA~";
        for(role of roles._roles){
            if(role[1].name!='@everyone')
            roleArr.push(role[1].name);
        }
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
                    value: bot,
                    inline: true,
                },
                {
                    name: 'Last Message in Server',
                    value: messageSent,
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