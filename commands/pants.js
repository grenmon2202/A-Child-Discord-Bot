module.exports = {
    name:'pants',
    description: 'Use this to hear a compliment about your pants',
    execute(message, args){
        console.log("Someone used the pants command kekw");
        message.channel.send("Nice pants bro :flushed:");
    }
}