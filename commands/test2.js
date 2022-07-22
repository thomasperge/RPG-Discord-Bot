const Discord = require('discord.js');
const STATS = require('../modules/statsBot.js');

module.exports.run = async (client, message, args) => {

    let stats = await STATS.findOne({ botID: 899 });
    stats.amoutCoin += 4;
    stats.save();



};
module.exports.info = {
    names: ['t2'],
};
