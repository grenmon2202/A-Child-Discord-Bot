const Discord = require('discord.js')

module.exports = {
    commands: ['pants'],
    arguments_expected: '<user1> <user2>',
    min_args: 0,
    max_args: 2,
    callback: (message, arguments, text) => {
        if(!arguments[0]){
            message.reply(`nice pants bro :flushed:`);
        }
        else if(!arguments[1]){
            let author = message.author.id;
            let member = message.guild.member(message.mentions.users.first());
            message.channel.send(`${member.user}, <@${author}> thinks you have nice pants :flushed:`);
        }
        else{
            let author = message.guild.member(message.mentions.users.array()[0]);
            let nicePants = message.guild.member(message.mentions.users.array()[1]);
            message.channel.send(`${nicePants}, ${author} thinks you have nice pants :flushed:`);
        }
    }
}