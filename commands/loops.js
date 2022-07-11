const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const { promptMessage } = require("../function.js");


module.exports.run = async (client, message, args) => {
    // var interval = setInterval (function () {
    //     //use the message's channel (TextChannel) to send a new message
    //     message.channel.send("123")
    //     .catch(console.error); //add error handling here
    // }, 1 * 1000); 


    await message.reply('Test').then(async msg => {
        const emoji = await promptMessage(msg, message.author, 3800, ['🪞']);
            if(emoji === '🪞'){
                return message.channel.send(`${message.author.id}`);
            };
    });

}

module.exports.info = {
  names: ['loop'],
};
