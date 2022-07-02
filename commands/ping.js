const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    message.channel.send(`Poooooong ! ❤️`);
};

module.exports.info = {
    names: ['ping'],
};
