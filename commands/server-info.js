const Discord = require('discord.js')

module.exports = {
    commands: ['server-info', 'sf'],
    max_args: 0,
    description:'List the details of the server',
    callback: (message, arguments, text) => {
        const { guild } = message;
        const { name, memberCount, createdAt,  id, owner, premiumSubscriptionCount, premiumTier, region, channels, roles } = guild;
        //console.log(name, memberCount, createdAt,  id, owner.user.tag, premiumSubscriptionCount, premiumTier, region, channels.cache.size, roles.cache.size);
        let infoEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(guild.iconURL())
            .setTitle(`${name}'s server info:`)
            .addFields(
                {
                    name: 'Server Owner',
                    value: owner.user.tag,
                    inline: true,
                },
                {
                    name: 'Server ID',
                    value: id,
                    inline: true,
                },
                {
                    name: 'Date Created',
                    value: createdAt.toDateString()+', '+createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds(),
                    inline: true,
                },
                {
                    name: 'Region',
                    value: region,
                    inline: true,
                },
                {
                    name: 'Member Count',
                    value: memberCount,
                    inline: true,
                },
                {
                    name: 'Number of Channels',
                    value: channels.cache.size,
                    inline: true,
                },
                {
                    name: 'Number of Roles',
                    value: roles.cache.size,
                    inline: true,
                },
                {
                    name: 'Number of Boosts',
                    value: premiumSubscriptionCount,
                    inline: true,
                },
                {
                    name: 'Boost Level',
                    value: premiumTier,
                    inline: true,
                },
            )
        message.channel.send(infoEmbed);
    }
}