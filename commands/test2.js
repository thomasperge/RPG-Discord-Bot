const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
    var user = message.author

    PLAYERDATA.updateOne({userId: user.id},{$set:{ pseudo:["Test"]}})

};
module.exports.info = {
    names: ['f'],
};
