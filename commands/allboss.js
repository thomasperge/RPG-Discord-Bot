const Discord = require('discord.js');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');
const BOSSCONFIG = require('../config/boss.json');
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
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {
        /**=== Account BOSs ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {
            var bossEmbed = new Discord.MessageEmbed()
                .setColor('#fc9803')
                .setTitle(`WOLD BOSS`)
                .setDescription(`**${inlineCode("➡️")} 📊 CURRENTLY WORLD BOSS :**\n${inlineCode("⚔️")} **Current World Boss**: ${inlineCode(boss.bossname)}\n${inlineCode("🔥")} **Attack** : ${boss.stats.attack}\n${inlineCode("❤️")} **Health** : ${boss.stats.health}\nAttack the boss : ${inlineCode("rbossattack")}\n\n${"`➡️`"} 🎯 **ALL WORLD BOSS** : \n`)
                .addFields(
                { name: `**BOSS ** : **${BOSSCONFIG.boss1.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss1.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss1.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss2.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss2.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss2.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss3.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss3.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss3.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss4.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss4.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss4.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss5.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss5.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss5.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss6.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss6.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss6.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss7.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss7.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss7.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss8.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss8.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss8.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss9.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss9.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss9.health}`, inline: true },
                { name: `**BOSS ** : **${BOSSCONFIG.boss10.name}**\n`, value: `\n${inlineCode("🔥")} **Attack** : ${BOSSCONFIG.boss10.attack}\n${inlineCode("❤️")} **Health** : ${BOSSCONFIG.boss10.health}`, inline: true },
                )
                .setTimestamp()
            return message.channel.send({embeds: [bossEmbed]});
        };
    };
};

module.exports.info = {
    names: ['allboss', 'bossall', 'ab', 'allB', 'AllBoss', 'Allboss', 'allboss', 'allb'],
};
