module.exports = {
    name:'pants',
    description: 'Hear a compliment about your pants, or compliment someone else\'s pants',
    active: true,
    instructions: '~pants / ~pants <user1> / ~pants <user1> <user2>',
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
            let author = message.guild.member(message.mentions.users.array()[0]);
            let nicePants = message.guild.member(message.mentions.users.array()[1]);
            message.channel.send(`${nicePants}, ${author} thinks you have nice pants :flushed:`);
        }
    }
}