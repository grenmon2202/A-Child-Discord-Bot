const path = require('path')
const fs = require('fs')

module.exports = (client) => {
    const handler = 'command-handler.js'
    const handler_imp = require('./command-handler.js')

    const commands = []

    const command_reader = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()){
                command_reader(path.join(dir, file))
            } else if(file !== handler && file!== 'command-loader.js') {
                const option = require(path.join(__dirname, dir, file))
                commands.push(option)
                if(client){
                    handler_imp(client, option)
                }
            }
        }
    }

    command_reader('.')

    return commands
}