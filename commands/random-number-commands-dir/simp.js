const Discord = require('discord.js')
const random_command = require('./random-number-commands')

module.exports = {
    commands: ['simp'],
    arguments_expected: '<user>',
    min_args: 0,
    max_args: 1,
    description: 'Find out whether or not your friend is actually a simp :sick:',
    callback: (message, arguments, text) => {
        random_command.calc_info(message, 'Simp')
    }
}