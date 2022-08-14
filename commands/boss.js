const Discord = require('discord.js');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 3s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {
            var bossEmbed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setTitle(`🗿 Current World Boss`)
                .setDescription(`**${inlineCode('➡️')} 📊 CURRENTLY BOSS WORLD :**\n${inlineCode('🗿')} **Current World Boss**: **${inlineCode(boss.bossname)}**\n${inlineCode('🔥')} **Attack** : ${numStr(boss.stats.attack)}\n${inlineCode('❤️')} **Health** : ${numStr(boss.stats.health)}\n(Attack the boss : ${inlineCode("rbossattack")})`)
                .setTimestamp();
            return message.channel.send({embeds: [bossEmbed]});
        };
    };
};

module.exports.info = {
    names: ['boss', 'currentboss', 'bossactually', 'bossnow', 'worldboss'],
};
