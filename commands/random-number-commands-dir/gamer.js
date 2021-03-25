const Discord = require('discord.js')
const random_command = require('./random-number-commands')

module.exports = {
    commands: ['cool-epic-gamer', 'gamer'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description: 'Find out whether or not your friend is a cool epic gamer :sunglasses:',
    callback: (message, arguments, text) => {
        random_command.calc_info(message, 'Gamer :sunglasses:')
    }
}