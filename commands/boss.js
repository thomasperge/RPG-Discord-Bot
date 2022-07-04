const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        /**=== Account BOSs ===*/
        let boss = await BOSSDATA.findOne({ bossname: 'Hello' });
        if (!boss) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            message.reply(`Boss Stats : \nBoss name : ${boss.bossname} \n${boss.stats.attack} Attack / ${boss.stats.defense} Defense / ${boss.stats.health} Health`)
        }
    }

};

module.exports.info = {
    names: ['boss'],
};
