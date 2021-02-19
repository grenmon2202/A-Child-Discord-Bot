module.exports = {
    name:'suggestions',
    description: 'Send us feedback regarding the bot!',
    active: true,
    instructions: '~suggestions',
    execute(message, args, Discord){
        const link = 'https://forms.gle/vob5o8CW6t5JZTXa9';
        let suggestionsEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Send us your suggestions!')
            .setDescription('We really value your honest feedback!!')
            .addField('To send us your honest feedback: ', '[Click on this link](https://forms.gle/tjezxvAMVuVpUK6A6)');
        message.channel.send(suggestionsEmbed);
    }
}