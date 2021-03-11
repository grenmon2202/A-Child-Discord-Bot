const prefix = '~'

const valid_permissions = (permissions) => {
    const list_of_perms = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ]

    for (const permission of permissions){
        if(!list_of_perms.includes(permission)){
            throw new Error(`Unknown permission ${permission}`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let{
        commands,
        arguments_expected= '',
        permission_err= 'You do not have the permissions required to run this command',
        min_args = 0,
        max_args = null,
        permissions = [],
        roles = [],
        description= '',
        callback
    } = commandOptions

    if (typeof commands === 'string'){
        commands = [commands]
    }

    console.log(`Command ${commands[0]} activated successfully`)

    if (permissions.length){
        if (typeof permissions === 'string'){
            permissions=[permissions]
        }
        valid_permissions(permissions)
    }

    client.on('message', message => {
        const {member, content, guild} = message
        for (const alias of commands){
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)){
                for (const permission of permissions){
                    if(!member.hasPermission(permission)){
                        message.reply(permission_err)
                        return;
                    }
                }

                for (const role_check of roles){
                    const role = guild.roles.cache.find(role => role.name === role_check)

                    if(!role || !member.roles.cache.has(role.id)){
                        message.reply(`You need the ${role_check}role command to run this command`)
                        return
                    }
                }

                const arguments = content.split(/[ ]+/)
                arguments.shift()

                if(arguments.length<min_args||(max_args!=null && arguments.length>max_args)){
                    message.reply(`You used the incorrect syntax bruh :unamused:, the correct syntax is ${prefix}${alias} ${arguments_expected}`)
                    return;
                }

                callback(message, arguments, arguments.join(' '))

                return;
            }
        }
    })
}