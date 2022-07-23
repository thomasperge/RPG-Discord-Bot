const Discord = require('discord.js');
const STATS = require('../modules/statsBot.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {

    /**=== Account Economie Mine ===*/
    let stats = await STATS.findOne({ botID: 899 });
    if (!stats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {


        var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setTitle(`RPG BOT Stats`)
            .setDescription(`👥 Number of players : ${inlineCode(stats.numberPlayer)}\n🛖 Number of squads : ${inlineCode(stats.numberSquad)}\n💰 Total number of coins in circulation : ${inlineCode(numStr(stats.amoutCoin))}\n🪖 Total number of items in circulation : ${inlineCode(numStr(stats.amoutItem))}\n💀 Total number of dead monsters : ${inlineCode(numStr(stats.amoutMonsterKilled))}`)
            .setTimestamp();
        message.channel.send({embeds: [statsEmbed]});


    };
};

module.exports.info = {
  names: ['stats', 'statistics', 'bot', 'botstats', 'rpgbot', 'statsbot', 'statisticsbot'],
};
