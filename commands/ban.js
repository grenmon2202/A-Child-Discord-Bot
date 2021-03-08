module.exports = {
    name:'ban',
    description: 'Ban a member from your server',
    active: true,
    instructions: '~ban <user1> <(optional) reason>',
    execute(message, args, Discord){
        const member = message.mentions.users.first();
        const author = message.guild.member(message.author);
        if(!author.hasPermission('ADMINISTRATOR') && !author.hasPermission('BAN_MEMBERS')){
            message.channel.send('You do not have permission to use this command :unamused:.');
            return;
        }
        let text = message.content;
        let split = text.split(' ');
        split.shift();
        split.shift();
        let reason = null;
        if(split.length>0)
        reason=split.join(' ');
        else
        reason = "Unspecified";
        if(member){
            const banMember = message.guild.members.cache.get(member.id);
            let channelEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(`${member.tag} has been banned`, member.avatarURL())
                .setDescription('Reason: '+reason);
            // let userEmbed = new Discord.MessageEmbed()
            //     .setColor('RED')
            //     .setAuthor(`You have been banned from ${message.guild.name}`, message.guild.iconURL())
            //     .setDescription('Reason: '+reason);
            
            // member.send(userEmbed);
            banMember.ban();
            message.channel.send(channelEmbed);
        }
        else{
            message.channel.send('Enter a valid user to be banned :unamused:.');
        }
    }
}