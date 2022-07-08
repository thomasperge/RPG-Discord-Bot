const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');
const BOSSCONFIG = require('../config/boss.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        /**=== Account BOSs ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            var bossEmbed = new Discord.MessageEmbed()
                .setColor('#fc9803')
                .setAuthor(`WOLD BOSS`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                .setDescription(`**${inlineCode("➡️")} 📊 CURRENTLY WORLD BOSS :**\n${inlineCode("⚔️")} **Current World Boss**: ${inlineCode(boss.bossname)}\n${inlineCode("🔥")} **Attack** : ${boss.stats.attack}\n${inlineCode("❤️")} **Health** : ${boss.stats.health}\nAttack the boss : ${inlineCode("gbossattack")}\n\n${"`➡️`"} 🎯 **ALL WORLD BOSS** : \n`)
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
                .setFooter('© RPG Bot 2022 | ghelp')
                .setTimestamp();
            return message.channel.send({embeds: [bossEmbed]});
        }
    }

};

module.exports.info = {
    names: ['boss', 'worldboss'],
};
