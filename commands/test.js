module.exports = {
    name:'test',
    description: 'something something cake',
    execute(message, args, Discord){
        console.log(message.mentions.users.array()[0].id);
        console.log(message.mentions.users.array()[1].id);
    }
}