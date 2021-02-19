module.exports = {
    name:'help',
    description: 'Use this if you want to learn about this bot\'s commands',
    active: true,
    instructions: '~help',
    execute(message, args, Discord, commands){
        let helpEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle ('I got you mate!')
            .setDescription ('Here is a list of all the commands you can currently give me!');
        for (command of commands){
            //console.log(command[1].active);
            if(command[1].active){
                helpEmbed.addField(command[1].instructions, command[1].description);
            }
        }

        message.channel.send(helpEmbed);
    }
}