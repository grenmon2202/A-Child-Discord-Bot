// const fs = require('fs');
// const path = require('path');
// const dir = path.join(__dirname, '../assets');
// doing it with local files just doesn't work for some reason
// let compMapPool = [
//     {
//         map: 'de_mirage',
//         img: fs.readFileSync(path.join(dir, 'de_mirage.jpg')),
//     },
//     {
//         map: 'de_inferno',
//         img: fs.readFileSync(path.join(dir, 'de_inferno.jpg')),
//     },
//     {
//         map: 'de_dust2',
//         img: fs.readFileSync(path.join(dir, 'de_dust2.jpg')),
//     },
//     {
//         map: 'de_overpass',
//         img: fs.readFileSync(path.join(dir, 'de_overpass.jpg')),
//     },
//     {
//         map: 'de_nuke',
//         img: fs.readFileSync(path.join(dir, 'de_nuke.jpg')),
//     },
//     {
//         map: 'de_train',
//         img: fs.readFileSync(path.join(dir, 'de_train.jpg')),
//     },
//     {
//         map: 'de_vetigo',
//         img: fs.readFileSync(path.join(dir, 'de_vertigo.jpg')),
//     },
    
// ];

let compMapPool = [
    {
        index: 1,
        clr: 'd2a36f',
        map: 'de_mirage',
        img: 'https://liquipedia.net/commons/images/thumb/f/f3/Csgo_mirage.jpg/900px-Csgo_mirage.jpg',
        vetoed: false,
    },
    {
        index: 2,
        clr: 'c78c6c',
        map: 'de_inferno',
        img: 'https://liquipedia.net/commons/images/thumb/2/2b/De_new_inferno.jpg/900px-De_new_inferno.jpg',
        vetoed: false,
    },
    {
        index: 3,
        clr: '756454',
        map: 'de_dust2',
        img: 'https://liquipedia.net/commons/images/thumb/1/12/Csgo_dust2.0.jpg/900px-Csgo_dust2.0.jpg',
        vetoed: false,
    },
    {
        index: 4,
        clr: 'ff8679',
        map: 'de_overpass',
        img: 'https://liquipedia.net/commons/images/thumb/0/0f/Csgo_overpass.jpg/900px-Csgo_overpass.jpg',
        vetoed: false,
    },
    {
        index: 5,
        clr: '4d6d86',
        map: 'de_nuke',
        img: 'https://liquipedia.net/commons/images/thumb/5/5e/Nuke_csgo.jpg/900px-Nuke_csgo.jpg',
        vetoed: false,
    },
    {
        index: 6,
        clr: '8b6242',
        map: 'de_train',
        img: 'https://liquipedia.net/commons/images/thumb/5/56/Train_csgo.jpg/900px-Train_csgo.jpg',
        vetoed: false,
    },
    {
        index: 7,
        clr: '505e69',
        map: 'de_vertigo',
        img: 'https://liquipedia.net/commons/images/thumb/5/59/Csgo_de_vertigo_new.jpg/900px-Csgo_de_vertigo_new.jpg',
        vetoed: false,
    },
    
];

module.exports = {
    name:'map-veto',
    description: 'Use this to start a CS:GO map veto',
    async execute(message, args, Discord){
        //console.log("Someone used the map-veto command");
        
        if(message.mentions.users.array().length!=2){
            let instructionEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Invalid usage\n Correct syntax: ```~map-veto <user1> <user2>```');
            message.channel.send(instructionEmbed);
            return;
        }

        let veto1Embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('CS:GO Map Veto')
            .setDescription('Enter the index number of a map to veto it, enter 0 in order to cancel the veto');
        message.channel.send(veto1Embed);

        for(var i = 0; i<compMapPool.length-1; i++){
            let turn = null;
            if(i%2===0)
                turn = message.mentions.users.array()[0];
            else
                turn = message.mentions.users.array()[1];
            let vetoMEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Remaining Maps:')
                .setDescription('It is '+turn.username+'\'s turn');
            for (const map of compMapPool){
                if(!map.vetoed){
                    vetoMEmbed.addFields({name: map.index+'. ', value: map.map});
                }
            }
            message.channel.send(vetoMEmbed);
            const filter = m => m.author.id === turn.id;

            
            const answer = await message.channel.awaitMessages(filter, {time: 10000});
            //console.log(answer);
            //console.log(answer.first());
            if(answer.first()===undefined){
                let finding = true;
                let index = -1;
                for(const vmap of compMapPool){
                    if(finding && !vmap.vetoed){
                        vmap.vetoed=true;
                        finding=false;
                        index=vmap.index;
                    }
                }
                let timeUpEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription('You did not choose to ban a map in time! '+compMapPool[index-1].map+' has been banned');
                message.channel.send(timeUpEmbed);
            }

            else{
                let veto = answer.first().content;
                console.log(veto);
                if (veto==0){
                    let cancelEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('CS:GO Map Veto')
                        .setDescription('Map Veto has been cancelled :pensive:');
                    message.channel.send(cancelEmbed);
                    for (const map of compMapPool){
                        map.vetoed=false;
                    }
                    return;
                }
                else if(veto!='0'&&veto!='1'&&veto!='2'&&veto!='3'&&veto!='4'&&veto!='5'&&veto!='6'&&veto!='7'){
                    let finding = true;
                    let index = -1;
                    for(const vmap of compMapPool){
                        if(finding && !vmap.vetoed){
                            vmap.vetoed=true;
                            finding=false;
                            index=vmap.index;
                        }
                    }
                    let invalidChoiceEmbed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription('Not a valid choice man :unamused: '+compMapPool[index-1].map+' has been banned');
                    message.channel.send(invalidChoiceEmbed);
                }
                else{
                    if(compMapPool[veto-1].vetoed){
                        let finding = true;
                        let index = -1;
                        for(const vmap of compMapPool){
                            if(finding && !vmap.vetoed){
                                vmap.vetoed=true;
                                finding=false;
                                index=vmap.index;
                            }
                        }
                        let alreadyBannedEmbed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setDescription('This map has already been banned! '+compMapPool[index-1].map+' has been banned');
                        message.channel.send(alreadyBannedEmbed);
                    }
                    else{
                        let bannedEmbed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setDescription(compMapPool[veto-1].map+' has been banned');
                        message.channel.send(bannedEmbed);
                        compMapPool[veto-1].vetoed=true;
                    }
                }     
            }
        }

        var selectedMap;
        for (const map of compMapPool){
            if (!map.vetoed)
                selectedMap= map.index;
        }

        //console.log(selectedMap);
        
        let chosenMapEmbed = new Discord.MessageEmbed()
            .setTitle('CS:GO Map Veto')
            .setColor(compMapPool[selectedMap-1].clr)
            .setImage(compMapPool[selectedMap-1].img)
            .setDescription('The selected map is '+compMapPool[selectedMap-1].map+'! Good Luck Have Fun!!');
        message.channel.send(chosenMapEmbed);

        for (const map of compMapPool){
            map.vetoed=false;
        }
    }
}