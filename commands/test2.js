const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');

/**Config Cooldown */
// const shuffleTime = 8.64e7;
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        /**=== Account BOSS ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            console.log('t', boss.userattack.find((obj => obj.userId === user.id)).dmg)
        }
    }

};

module.exports.info = {
    names: ['t'],
};
