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
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {
        /**=== Account BOSs ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {
            var bossEmbed = new Discord.MessageEmbed()
                .setColor('#fc9803')
                .setTitle(`${client.users.cache.get(user.id).username}'s Stats`)
                .setDescription(`**${inlineCode('➡️')} 📊 CURRENTLY BOSS WORLD :**\n${inlineCode('⚔️')} **Current World Boss**: ${boss.bossname}\n${inlineCode('🔥')} **Attack** : ${numStr(boss.stats.attack)}\n${inlineCode('❤️')} **Health** : ${numStr(boss.stats.health)}\n(Attack the boss : ${inlineCode("gbossattack")})`)
                .setTimestamp();
            return message.channel.send({embeds: [bossEmbed]});
        }
    }

};

module.exports.info = {
    names: ['boss', 'currentboss', 'bossactually', 'bossnow', 'worldboss'],
};
