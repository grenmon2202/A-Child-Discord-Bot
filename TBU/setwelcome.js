const mongo = require ('../mongo');
const setwelcomeSchema = require ('../schemas/setwelcome-schema');
const cache = {};

module.exports = {
    name:'setwelcome',
    description: 'Set a welcome message for your server',
    active: true,
    instructions: '~setwelcome <Your Welcome Message>',
    async execute(message, args, Discord, client){
        const author = message.guild.member(message.author);
        if(!author.hasPermission('ADMINISTRATOR')){
            message.channel.send('You do not have permission to use this command :unamused:.');
            return;
        }
        else{

            let text = message.content;

            const split = text.split(' ');
            if (split.length < 2){
                message.channel.send('Enter the welcome message bruh :person_facepalming:.');
                return;
            }
            else{
                split.shift();
                text = split.join(' ');
                cache[message.guild.id]=[message.channel.id, text];
                await mongo().then(async (mongoose) => {
                    try{
                        await setwelcomeSchema.findOneAndUpdate({
                            _id: message.guild.id
                        },
                        {
                            _id: message.guild.id,
                            channelID: message.channel.id,
                            text
                        },
                        {
                            upsert: true
                        });
                    } finally{
                        mongoose.connection.close();
                    }
                })
            }
        }
        const onJoin = async member => {
            const { guild } = member;
        
            let data = cache[guild.id];
        
            if(!data){
                await mongo().then(async (mongoose) => {
                    try{
                        const message = await setwelcomeSchema.findOne({_id: guild.id});
                        cache[guild.id]=data=[result.channelID, result.text];
                    } finally{
                        mongoose.connection.close();
                    }
                })
            }
        
            const channelID = data[0];
            const text = data[1];
        
            const channel = guild.channels.cache.get(channelID);
            channel.send(text.replace(/<@>/g, `<@${member.id}>`));
        }
        client.on('guildMemberAdd', member => {
            onJoin(member);
        })
    }
}