const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');
const BOSSCONFIG = require('../config/boss.json')

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
                .setAuthor(`${client.users.cache.get(user.id).username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                .setDescription(`**${"`➡️`"} 📊 CURRENTLY BOSS WORLD :**\n${"`⚔️`"} **Current World Boss**: ${boss.bossname}\n${"`🔥`"} **Attack** : ${boss.stats.attack}\n${"`❤️`"} **Health** : ${boss.stats.health}`)
                .setFooter('© RPG Bot 2022 | ghelp')
                .setTimestamp();
            return message.channel.send(bossEmbed);
        }
    }

};

module.exports.info = {
    names: ['currentboss', 'bossactually', 'bossnow'],
};
