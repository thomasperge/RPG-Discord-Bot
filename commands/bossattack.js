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
            var damage = Math.floor(Math.random() * playerStats.player.attack)
            message.reply(`You attack the boss, and make : ${damage} dmg`)
            boss.stats.health -= damage
            boss.save()
        }
    }

};

module.exports.info = {
    names: ['bossattack'],
};
