const Discord = require('discord.js')

module.exports = {
    commands: ['help'],
    max_args: 1,
    callback: (message, arguments, text) => {
        message.channel.send('This command is currently down! We are working on making the bot more efficient!');
    }
}