const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const EMOJICONFIG = require('../config/emoji.json');
const BALANCEDATA = require('../modules/economie.js');
const { numStr } = require('../functionNumber/functionNbr.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            var randomCoin = Math.floor(Math.random() * (playerStats.player.level * (30 * playerStats.player.level)));
            var randomXp = Math.floor(Math.random() * (playerStats.player.level * (80 * playerStats.player.level)));

            balance.eco.coins += randomCoin;
            balance.eco.xp += randomXp;
            balance.save();

            message.reply(`${inlineCode("📦")} You collect: ${inlineCode(numStr(randomCoin))} ${EMOJICONFIG.coin} and ${inlineCode(numStr(randomXp))} ${EMOJICONFIG.xp}`);


        };
    };
};

module.exports.info = {
    names: ['jungling', 'mining', 'farming', 'mine', 'farm', 'jung', 'j'],
};
