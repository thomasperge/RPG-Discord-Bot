const Discord = require('discord.js');
const STATS = require('../modules/statsBot.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {

    /**=== Account Stats ===*/
    let stats = await STATS.findOne({ botID: 899 });
    if (!stats) return message.reply(`${inlineCode('ā')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setTitle(`RPG BOT Stats`)
            .setDescription(`š„ **Number of players** : ${inlineCode(stats.numberPlayer)}\nš **Number of squads** : ${inlineCode(stats.numberSquad)}\nš° **Coins in circulation** : ${inlineCode(numStr(stats.amoutCoin))}  ${inlineCode("šŖ")}\nšŖ **Items in circulation** : ${inlineCode(numStr(stats.amoutItem))}\nš **Total number of dead monsters** : ${inlineCode(numStr(stats.amoutMonsterKilled))}`)
            .setTimestamp();
        message.channel.send({embeds: [statsEmbed]});
    };
};

module.exports.info = {
  names: ['stats', 'statistics', 'bot', 'botstats', 'rpgbot', 'statsbot', 'statisticsbot'],
};
