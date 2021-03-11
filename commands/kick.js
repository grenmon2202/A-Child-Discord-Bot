const Discord = require('discord.js')

module.exports = {
    commands: ['kick'],
    arguments_expected: '<user>',
    permission_err: 'You do not have permission to use this command :unamused:',
    min_args: 1,
    permissions: ['ADMINISTRATOR', 'KICK_MEMBERS'],
    description:'Kick a member from your server',
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
            const kickMember = message.guild.members.cache.get(member.id);
            if(kickMember.hasPermission('ADMINISTRATOR')){
                message.channel.send('Cannot kick an admin :dizzy_face:');
                return;
            }
            let channelEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(`${member.tag} has been kicked`, member.avatarURL())
                .setDescription('Reason: '+reason);
            // let userEmbed = new Discord.MessageEmbed()
            //     .setColor('RED')
            //     .setAuthor(`You have been kicked from ${message.guild.name}`, message.guild.iconURL())
            //     .setDescription('Reason: '+reason);
            // member.send(userEmbed);
            kickMember.kick();
            message.channel.send(channelEmbed);
        }
        else{
            message.channel.send('Enter a valid user to be kicked :unamused:.');
        }
    }
}