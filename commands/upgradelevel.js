const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');
const STATSDATA = require('../modules/player.js')
const CONFIGLEVEL = require('../config/configLevel.json')

module.exports.run = async (client, message, args) => {
      /**=== Account Economie ===*/
  let balance = await BALANCEDATA.findOne({ userId: message.author.id });
  if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
  else {
    let stats = await STATSDATA.findOne({ userId: message.author.id });
    if (!stats) return message.reply("`❌` you are not player ! : `gstart`");
    else {

        function upgradeLevel(priceNextLevel, level, nextLevel){
            if(priceNextLevel > balance.eco.xp) message.reply('`❌` You have enought xp... !')
            elif(priceNextLevel <= balance.eco.xp){
                // Pricing :
                balance.eco.xp = balance.eco.xp - priceNextLevel
                balance.save()
                // Stats :
                stats.player.attack = CONFIGLEVEL.level_1.stats.attack
                stats.player.defense = CONFIGLEVEL.level_1.stats.defense
                stats.player.health = CONFIGLEVEL.level_1.stats.health
                stats.player.dodge = CONFIGLEVEL.level_1.stats.dodge
                stats.player.crit = CONFIGLEVEL.level_1.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level_1.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level_1.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level_1.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level_1.stats.execute
                stats.player.aegis = CONFIGLEVEL.level_1.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level_1.stats.vengeance
                stats.save()
                // Embed :
                var upgradeEmbed = new Discord.MessageEmbed()
                    .setColor('#fc9803')
                    .setAuthor(`${client.users.cache.get(user.id).username}'s Upgrade Level`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                    .setDescription(`** ${`:white_check_mark:`} NEW LEVEL !\n${`:arrow_forward:`} You are now levels: ${nextLevel} !`)
                    .addFields(
                        { name: '**📊 NEW STATS :**\n', value: `:mirror: ${"`Reflect`"}: ${playerStats.player.ultimate.reflect}\n:mending_heart: ${"`Heal`"}: ${playerStats.player.ultimate.heal}\n:four_leaf_clover: ${"`Lucky Strike`"}: ${playerStats.player.ultimate.luckyStrike}\n`, inline: true },
                    )
                    .setFooter('© RPG Bot 2022 | ghelp')
                    .setTimestamp();
                message.channel.send(upgradeEmbed);
            }
        }

        if(stats.player.level == 0){
            upgradeLevel(CONFIGLEVEL.level_1.XPcost, CONFIGLEVEL.level_1, CONFIGLEVEL.level_1.NextLevel)  
        };
        if(stats.player.level == 1){
            upgradeLevel(CONFIGLEVEL.level_2.XPcost, CONFIGLEVEL.level_2, CONFIGLEVEL.level_2.NextLevel)  
        };
        if(stats.player.level == 2){
            upgradeLevel(CONFIGLEVEL.level_3.XPcost, CONFIGLEVEL.level_3, CONFIGLEVEL.level_3.NextLevel)  
        };
        if(stats.player.level == 3){
            upgradeLevel(CONFIGLEVEL.level_4.XPcost, CONFIGLEVEL.level_4, CONFIGLEVEL.level_4.NextLevel)  
        };
        if(stats.player.level == 4){
            upgradeLevel(CONFIGLEVEL.level_5.XPcost, CONFIGLEVEL.level_5, CONFIGLEVEL.level_5.NextLevel)  
        };
        if(stats.player.level == 5){
            upgradeLevel(CONFIGLEVEL.level_6.XPcost, CONFIGLEVEL.level_6, CONFIGLEVEL.level_6.NextLevel)  
        };
        if(stats.player.level == 6){
            upgradeLevel(CONFIGLEVEL.level_7.XPcost, CONFIGLEVEL.level_7, CONFIGLEVEL.level_7.NextLevel)  
        };
        if(stats.player.level == 7){
            upgradeLevel(CONFIGLEVEL.level_8.XPcost, CONFIGLEVEL.level_8, CONFIGLEVEL.level_8.NextLevel)  
        };
        if(stats.player.level == 8){
            upgradeLevel(CONFIGLEVEL.level_9.XPcost, CONFIGLEVEL.level_9, CONFIGLEVEL.level_9.NextLevel)  
        };
        if(stats.player.level == 9){
            upgradeLevel(CONFIGLEVEL.level_10.XPcost, CONFIGLEVEL.level_10, CONFIGLEVEL.level_10.NextLevel)  
        };
        if(stats.player.level == 10){
            upgradeLevel(CONFIGLEVEL.level_11.XPcost, CONFIGLEVEL.level_11, CONFIGLEVEL.level_11.NextLevel)  
        };
        if(stats.player.level == 11){
            upgradeLevel(CONFIGLEVEL.level_12.XPcost, CONFIGLEVEL.level_12, CONFIGLEVEL.level_12.NextLevel)  
        };
        if(stats.player.level == 12){
            upgradeLevel(CONFIGLEVEL.level_13.XPcost, CONFIGLEVEL.level_13, CONFIGLEVEL.level_13.NextLevel)  
        };
        if(stats.player.level == 13){
            upgradeLevel(CONFIGLEVEL.level_14.XPcost, CONFIGLEVEL.level_14, CONFIGLEVEL.level_14.NextLevel)  
        };
        if(stats.player.level == 14){
            upgradeLevel(CONFIGLEVEL.level_15.XPcost, CONFIGLEVEL.level_15, CONFIGLEVEL.level_15.NextLevel)  
        };
        if(stats.player.level == 15){
            message.reply('Max Level')
        }

    }
  }
};

module.exports.info = {
    names: ['upgrade', 'upgradelevel', 'buylevel'],
};
