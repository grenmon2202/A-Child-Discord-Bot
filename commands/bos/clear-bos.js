const Discord = require('discord.js');
const { Mongoose } = require('mongoose');
const mongo = require('../../mongo')
const schema = require('../../schemas/bos-schema')

module.exports = {
    commands: ['clear-bos', 'cb'],
    arguments_expected: '<bos id>',
    permission_err: 'You do not have the permissions required to run this command',
    min_args: 1,
    max_args: 1,
    permissions: ['ADMINISTRATOR'],
    description: 'Clear a particular ban on sight according to the id',
    callback: async (message, arguments, text) => {
        const guild = message.guild
        const guild_id = guild.id

        const bos_id = text
        for (var i = 0; i<bos_id.length; i++){
            if (bos_id.charAt(i)!='0'&&bos_id.charAt(i)!='1'&&bos_id.charAt(i)!='2'&&bos_id.charAt(i)!='3'&&bos_id.charAt(i)!='4'&&bos_id.charAt(i)!='5'&&bos_id.charAt(i)!='6'&&bos_id.charAt(i)!='7'&&bos_id.charAt(i)!='8'&&bos_id.charAt(i)!='9'){
                message.channel.send('Not a valid ID :unamused:')
                return
            }
        }

        var tot_size = 0
        var isReturn = false
        var bos_id_int = parseInt(bos_id)
        var bos_final = '' 
        var bos_which = 0

        await mongo().then (async mongoose => {
            try {
                const bos_col = await schema.findOne(
                    {
                        guild_id
                    }
                )
                if (!bos_col){
                    message.channel.send('Server doesn\'t even have any BOSs bruh :unamused:')
                    isReturn=true
                } else {
                    tot_size=bos_col.usernames.length + bos_col.flags.length + bos_col.userIDs.length
                }
                if (bos_id_int>tot_size || bos_id_int==0){
                    message.channel.send('Not a valid ID :unamused:')
                    isReturn=true
                } else {
                    bos_id_int--
                    if (bos_id_int<bos_col.usernames.length){
                        bos_final=bos_col.usernames[bos_id_int]
                        bos_which=1
                        return
                    }
                    if (bos_id_int>=bos_col.usernames.length){
                        bos_id_int = bos_id_int - bos_col.usernames.length
                        
                    }
                    if (bos_id_int<bos_col.flags.length){
                        bos_final=bos_col.flags[bos_id_int]
                        bos_which=2
                        return
                    }
                    if (bos_id_int>=bos_col.flags.length){
                        bos_id_int = bos_id_int - bos_col.flags.length
                        
                    }
                    if (bos_id_int<bos_col.userIDs.length){
                        bos_final=bos_col.userIDs[bos_id_int]
                        bos_which=3
                        return
                    }
                    if (bos_id_int>=bos_col.userIDs.length){
                        bos_id_int = bos_id_int - bos_col.userIDs.length
                        
                    }
                }
            } finally{
                mongoose.connection.close()
            }
        })

        if(isReturn)
            return

        await mongo().then (async mongoose => {
            try {
                if (bos_which==1){
                    await schema.findOneAndUpdate(
                        {
                            guild_id
                        },
                        {
                            guild_id,
                            $pull: {usernames: bos_final}
                        },
                        {
                            upsert: false
                        }
                    )
                } else if (bos_which==2){
                    await schema.findOneAndUpdate(
                        {
                            guild_id
                        },
                        {
                            guild_id,
                            $pull: {flags: bos_final}
                        },
                        {
                            upsert: false
                        }
                    )
                } else if (bos_which==3){
                    await schema.findOneAndUpdate(
                        {
                            guild_id
                        },
                        {
                            guild_id,
                            $pull: {userIDs: bos_final}
                        },
                        {
                            upsert: false
                        }
                    )
                }
                message.reply('Ban on sight cleared :thumbsup:')
            } finally{
                mongoose.connection.close()
            }
        })
    }
}