const Discord = require('discord.js');
const config = require('../config.json');
const MONSTERCONFIG = require('../config/monster.json')

module.exports.run = async (client, message, args) => {
    var user = message.author;

    message.reply('Pong !')
};

module.exports.info = {
    names: ['ping'],
};
