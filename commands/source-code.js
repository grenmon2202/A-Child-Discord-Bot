module.exports = {
    name:'source-code',
    description: 'Provides the link to the GitHub repository for the bot\'s source code',
    active: true,
    instructions: '~source-code / ~sc',
    execute(message, args, Discord){
        let sourceCodeEmbed = new Discord.MessageEmbed()
            .setColor('PINK')
            .setTitle('A Child\'s Source Code')
            .setDescription('There you go!\nhttps://github.com/grenmon2202/A-Child-Discord-Bot');
        message.channel.send(sourceCodeEmbed);
    }
}