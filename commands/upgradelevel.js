const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');
const STATSDATA = require('../modules/player.js')
const CONFIGLEVEL = require('../config/configLevel.json')

module.exports.run = async (client, message, args) => {
    var user = message.author;

    /**=== Account Economie ===*/
    let balance = await BALANCEDATA.findOne({ userId: message.author.id });
    if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        let stats = await STATSDATA.findOne({ userId: message.author.id });
        if (!stats) return message.reply("`❌` you are not player ! : `gstart`");
        else {

            function upgradeLevel(priceNextLevel, level, nextLevel){
                if(priceNextLevel > balance.eco.xp) message.reply('`❌` You have enought xp... !')
                if(priceNextLevel <= balance.eco.xp){
                    // Pricing :
                    balance.eco.xp = balance.eco.xp - priceNextLevel
                    balance.save()
                    // Embed :
                    var upgradeEmbed = new Discord.MessageEmbed()
                        .setColor('#fc9803')
                        .setAuthor(`${client.users.cache.get(user.id).username}'s Upgrade Level`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                        .setDescription(`** ${`:white_check_mark:`} NEW LEVEL !**\n${`:arrow_forward:`} You are now levels: **${nextLevel}** !`)
                        .addFields(
                            { name: '**📊 NEW STATS :**\n', value: `:fire: ${"`Attack`"}: ${stats.player.attack}\n:shield: ${"`Defense`"}: ${stats.player.defense}\n:heart: ${"`Health`"}: ${stats.player.health}\n:dash: ${"`Dodge`"}: ${stats.player.dodge}%\n:boom: ${"`Critick`"}: ${stats.player.crit}%\n:heavy_multiplication_x: ${"`Critick Multplicator`"}: ${stats.player.critMultplicator}%\n:comet: ${"`Attack Speed`"}: ${stats.player.attackSpeed}%\n:heart_on_fire: ${"`Life Steal`"}: ${stats.player.lifeSteal}%\n:wind_chime: ${"`Execute`"}: ${stats.player.execute}\n:fire_extinguisher: ${"`Aegis`"}: ${stats.player.aegis}\n:firecracker: ${"`Vengance`"}: ${stats.player.vengeance}\n`, inline: true },
                        )
                        .setFooter('© RPG Bot 2022 | ghelp')
                        .setTimestamp();
                    message.channel.send(upgradeEmbed);
                }
            }

            if(stats.player.level == 0){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level1.stats.attack
                stats.player.defense = CONFIGLEVEL.level1.stats.defense
                stats.player.health = CONFIGLEVEL.level1.stats.health
                stats.player.dodge = CONFIGLEVEL.level1.stats.dodge
                stats.player.crit = CONFIGLEVEL.level1.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level1.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level1.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level1.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level1.stats.execute
                stats.player.aegis = CONFIGLEVEL.level1.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level1.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_1.XPcost, CONFIGLEVEL.level_1.nextLevel)  
            };
            if(stats.player.level == 1){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level2.stats.attack
                stats.player.defense = CONFIGLEVEL.level2.stats.defense
                stats.player.health = CONFIGLEVEL.level2.stats.health
                stats.player.dodge = CONFIGLEVEL.level2.stats.dodge
                stats.player.crit = CONFIGLEVEL.level2.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level2.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level2.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level2.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level2.stats.execute
                stats.player.aegis = CONFIGLEVEL.level2.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level2.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_2.XPcost, CONFIGLEVEL.level_2.nextLevel)  
            };
            if(stats.player.level == 2){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level3.stats.attack
                stats.player.defense = CONFIGLEVEL.level3.stats.defense
                stats.player.health = CONFIGLEVEL.level3.stats.health
                stats.player.dodge = CONFIGLEVEL.level3.stats.dodge
                stats.player.crit = CONFIGLEVEL.level3.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level3.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level3.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level3.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level3.stats.execute
                stats.player.aegis = CONFIGLEVEL.level3.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level3.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_3.XPcost, CONFIGLEVEL.level_3.nextLevel)  
            };
            if(stats.player.level == 3){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level4.stats.attack
                stats.player.defense = CONFIGLEVEL.level4.stats.defense
                stats.player.health = CONFIGLEVEL.level4.stats.health
                stats.player.dodge = CONFIGLEVEL.level4.stats.dodge
                stats.player.crit = CONFIGLEVEL.level4.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level4.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level4.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level4.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level4.stats.execute
                stats.player.aegis = CONFIGLEVEL.level4.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level4.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_4.XPcost, CONFIGLEVEL.level_4.nextLevel)  
            };
            if(stats.player.level == 4){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level5.stats.attack
                stats.player.defense = CONFIGLEVEL.level5.stats.defense
                stats.player.health = CONFIGLEVEL.level5.stats.health
                stats.player.dodge = CONFIGLEVEL.level5.stats.dodge
                stats.player.crit = CONFIGLEVEL.level5.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level5.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level5.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level5.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level5.stats.execute
                stats.player.aegis = CONFIGLEVEL.level5.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level5.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_5.XPcost, CONFIGLEVEL.level_5.nextLevel)  
            };
            if(stats.player.level == 5){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level6.stats.attack
                stats.player.defense = CONFIGLEVEL.level6.stats.defense
                stats.player.health = CONFIGLEVEL.level6.stats.health
                stats.player.dodge = CONFIGLEVEL.level6.stats.dodge
                stats.player.crit = CONFIGLEVEL.level6.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level6.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level6.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level6.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level6.stats.execute
                stats.player.aegis = CONFIGLEVEL.level6.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level6.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_6.XPcost, CONFIGLEVEL.level_6.nextLevel)  
            };
            if(stats.player.level == 6){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level7.stats.attack
                stats.player.defense = CONFIGLEVEL.level7.stats.defense
                stats.player.health = CONFIGLEVEL.level7.stats.health
                stats.player.dodge = CONFIGLEVEL.level7.stats.dodge
                stats.player.crit = CONFIGLEVEL.level7.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level7.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level7.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level7.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level7.stats.execute
                stats.player.aegis = CONFIGLEVEL.level7.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level7.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_7.XPcost, CONFIGLEVEL.level_7.nextLevel)  
            };
            if(stats.player.level == 7){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level8.stats.attack
                stats.player.defense = CONFIGLEVEL.level8.stats.defense
                stats.player.health = CONFIGLEVEL.level8.stats.health
                stats.player.dodge = CONFIGLEVEL.level8.stats.dodge
                stats.player.crit = CONFIGLEVEL.level8.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level8.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level8.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level8.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level8.stats.execute
                stats.player.aegis = CONFIGLEVEL.level8.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level8.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_8.XPcost, CONFIGLEVEL.level_8.nextLevel)  
            };
            if(stats.player.level == 8){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level9.stats.attack
                stats.player.defense = CONFIGLEVEL.level9.stats.defense
                stats.player.health = CONFIGLEVEL.level9.stats.health
                stats.player.dodge = CONFIGLEVEL.level9.stats.dodge
                stats.player.crit = CONFIGLEVEL.level9.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level9.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level9.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level9.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level9.stats.execute
                stats.player.aegis = CONFIGLEVEL.level9.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level9.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_9.XPcost, CONFIGLEVEL.level_9.nextLevel)  
            };
            if(stats.player.level == 9){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level10.stats.attack
                stats.player.defense = CONFIGLEVEL.level10.stats.defense
                stats.player.health = CONFIGLEVEL.level10.stats.health
                stats.player.dodge = CONFIGLEVEL.level10.stats.dodge
                stats.player.crit = CONFIGLEVEL.level10.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level10.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level10.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level10.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level10.stats.execute
                stats.player.aegis = CONFIGLEVEL.level10.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level10.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_10.XPcost, CONFIGLEVEL.level_10.nextLevel)  
            };
            if(stats.player.level == 10){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level11.stats.attack
                stats.player.defense = CONFIGLEVEL.level11.stats.defense
                stats.player.health = CONFIGLEVEL.level11.stats.health
                stats.player.dodge = CONFIGLEVEL.level11.stats.dodge
                stats.player.crit = CONFIGLEVEL.level11.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level11.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level11.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level11.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level11.stats.execute
                stats.player.aegis = CONFIGLEVEL.level11.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level11.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_11.XPcost, CONFIGLEVEL.level_11.nextLevel)  
            };
            if(stats.player.level == 11){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level12.stats.attack
                stats.player.defense = CONFIGLEVEL.level12.stats.defense
                stats.player.health = CONFIGLEVEL.level12.stats.health
                stats.player.dodge = CONFIGLEVEL.level12.stats.dodge
                stats.player.crit = CONFIGLEVEL.level12.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level12.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level12.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level12.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level12.stats.execute
                stats.player.aegis = CONFIGLEVEL.level12.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level12.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_12.XPcost, CONFIGLEVEL.level_12.nextLevel)  
            };
            if(stats.player.level == 12){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level13.stats.attack
                stats.player.defense = CONFIGLEVEL.level13.stats.defense
                stats.player.health = CONFIGLEVEL.level13.stats.health
                stats.player.dodge = CONFIGLEVEL.level13.stats.dodge
                stats.player.crit = CONFIGLEVEL.level13.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level13.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level13.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level13.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level13.stats.execute
                stats.player.aegis = CONFIGLEVEL.level13.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level13.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_13.XPcost, CONFIGLEVEL.level_13.nextLevel)  
            };
            if(stats.player.level == 13){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level14.stats.attack
                stats.player.defense = CONFIGLEVEL.level14.stats.defense
                stats.player.health = CONFIGLEVEL.level14.stats.health
                stats.player.dodge = CONFIGLEVEL.level14.stats.dodge
                stats.player.crit = CONFIGLEVEL.level14.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level14.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level14.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level14.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level14.stats.execute
                stats.player.aegis = CONFIGLEVEL.level14.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level14.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_14.XPcost, CONFIGLEVEL.level_14.nextLevel)  
            };
            if(stats.player.level == 14){
                // Stats :
                stats.player.attack = CONFIGLEVEL.level15.stats.attack
                stats.player.defense = CONFIGLEVEL.level15.stats.defense
                stats.player.health = CONFIGLEVEL.level15.stats.health
                stats.player.dodge = CONFIGLEVEL.level15.stats.dodge
                stats.player.crit = CONFIGLEVEL.level15.stats.crit
                stats.player.critMultplicator = CONFIGLEVEL.level15.stats.critMultplicator
                stats.player.attackSpeed = CONFIGLEVEL.level15.stats.attackSpeed
                stats.player.lifeSteal = CONFIGLEVEL.level15.stats.lifeSteal
                stats.player.execute = CONFIGLEVEL.level15.stats.execute
                stats.player.aegis = CONFIGLEVEL.level15.stats.aegis
                stats.player.vengeance = CONFIGLEVEL.level15.stats.vengeance
                stats.save()
                upgradeLevel(CONFIGLEVEL.level_15.XPcost, CONFIGLEVEL.level_15.nextLevel)  
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