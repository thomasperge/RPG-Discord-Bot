const Discord = require('discord.js');
const config = require('../config.json');
const { promptMessage } = require("../function.js");


module.exports.run = async (client, message, args) => {
    await message.channel.send('HELLO').then(async msg => {

        const emoji = await promptMessage(msg, message.author, 3800, ['✅', '❌']);
        if(emoji === '✅'){
            message.channel.send(`Poooooong ! ✅`);
        }
        if(emoji === '❌'){
            message.channel.send(`Poooooong ! ❌`);
        }
    }
    );
};

module.exports.info = {
    names: ['ping'],
};
