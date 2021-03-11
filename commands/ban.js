const Discord = require('discord.js')

module.exports = {
    commands: ['ban'],
    arguments_expected: '<user>',
    permission_err: 'You do not have permission to use this command :unamused:',
    min_args: 1,
    permissions: ['ADMINISTRATOR', 'BAN_MEMBERS'],
    roles: [],
    description: 'Ban a member from your server',
    callback: (message, arguments, text) => {
        const member = message.mentions.users.first();
        const author = message.guild.member(message.author);
        let txt = message.content;
        let split = txt.split(' ');
        split.shift();
        split.shift();
        let reason = null;
        if(split.length>0)
        reason=split.join(' ');
        else
        reason = "Unspecified";
        if(member){
            const banMember = message.guild.members.cache.get(member.id);
            if(banMember.hasPermission('ADMINISTRATOR')){
                message.channel.send('Cannot ban an admin :dizzy_face:');
                return;
            }
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