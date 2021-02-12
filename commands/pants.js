module.exports = {
    name:'pants',
    description: 'Use this to hear a compliment about your pants',
    execute(message, args, Discord){
        //console.log(args);
        if(!args[0]){
            message.reply(`nice pants bro :flushed:`);
        }
        else if(!args[1]){
            let author = message.author.id;
            let member = message.guild.member(message.mentions.users.first());
            message.channel.send(`${member.user}, <@${author}> thinks you have nice pants :flushed:`);
        }
        else{
            let author = message.guild.member(message.mentions.users.first());
            message.channel.send(`${member.user}, <@${author}> thinks you have nice pants :flushed:`);
        }
    }
}