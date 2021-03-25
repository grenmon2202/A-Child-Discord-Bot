const Discord = require('discord.js')
const random_command = require('./random-number-commands')

module.exports = {
    commands: ['homo'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description: 'Find out whether or not your friend is actually gay :flushed:',
    callback: (message, arguments, text) => {
        random_command.calc_info(message, 'Homo')
    }
}