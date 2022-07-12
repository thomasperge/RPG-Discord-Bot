const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const PLAYERSTATSDATA = require('../modules/player.js')
const SQUADDATA = require('../modules/squad.js')
const CONFIGLEVEL = require('../config/configLevel.json')
const { promptMessage } = require("../function.js");
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 300000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5min =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;

    /**=== Account Economie ===*/
    let balance = await BALANCEDATA.findOne({ userId: message.author.id });
    if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {
        let stats = await PLAYERSTATSDATA.findOne({ userId: message.author.id });
        if (!stats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            function checkPrice(priceNextLevel){
                if(priceNextLevel <= balance.eco.xp){
                    return true
                } else {
                    return false
                } 
            }

            // Function display upgrade level :
            function upgradeLevel(priceNextLevel, nextLevel){
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
                    message.channel.send({embeds: [upgradeEmbed]});
                }
            }


            function addSquadXp(levelUser){
                let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                if (!squad) return
                else {
                    squad.squadXp += Math.floor(levelUser * 1350)
                    squad.save()
                }
            }

            if(stats.player.level == 0){
                if(checkPrice(CONFIGLEVEL.level1.XPcost)){
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
                    stats.player.level = 1
                    stats.save()
                    addSquadXp(1)
                    return upgradeLevel(CONFIGLEVEL.level1.XPcost, 1)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level1.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 1){
                if(checkPrice(CONFIGLEVEL.level2.XPcost)){
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
                    stats.player.level = 2
                    stats.save()
                    addSquadXp(2)
                    return upgradeLevel(CONFIGLEVEL.level2.XPcost, CONFIGLEVEL.level1.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level2.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 2){
                if(checkPrice(CONFIGLEVEL.level3.XPcost)){
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
                    stats.player.level = 3
                    stats.save()
                    addSquadXp(3)
                    return upgradeLevel(CONFIGLEVEL.level3.XPcost, CONFIGLEVEL.level2.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level3.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 3){
                if(checkPrice(CONFIGLEVEL.level4.XPcost)){
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
                    stats.player.level = 4
                    stats.save()
                    addSquadXp(4)
                    upgradeLevel(CONFIGLEVEL.level4.XPcost, CONFIGLEVEL.level3.nextLevel)
                    // Choose Ultimate :
                    var ultimateEmbed = new Discord.MessageEmbed()
                        .setColor('#fc9803')
                        .setAuthor(`${client.users.cache.get(user.id).username}'s ultimate`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                        .addFields(
                        { name: '**📰 Choose Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: **+5%**\n:mending_heart: ${"`Heal`"}: **+5%**\n:four_leaf_clover: ${"`Lucky Strike`"}: **+5%**`, inline: true },
                        )
                        .setFooter('© RPG Bot 2022 | ghelp')
                        .setTimestamp();

                    await message.reply({embeds: [ultimateEmbed]}).then(async msg => {
                        const emoji = await promptMessage(msg, message.author, 3800, ['🪞', '❤️‍🩹', '🍀']);
                            if(emoji === '🪞'){
                                stats.player.ultimate.reflect = stats.player.ultimate.reflect + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.reflect}%** of reflect`);
                            };
                            if(emoji === '❤️‍🩹'){
                                stats.player.ultimate.heal = stats.player.ultimate.heal + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.heal}%** of heal`);
                            };
                            if(emoji === '🍀'){
                                stats.player.ultimate.luckyStrike = stats.player.ultimate.luckyStrike + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.luckyStrike}%** of luckyStrike`);
                            }
                    });
                    return
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level4.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 4){
                if(checkPrice(CONFIGLEVEL.level5.XPcost)){
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
                    stats.player.level = 5
                    stats.save()
                    addSquadXp(5)
                    return upgradeLevel(CONFIGLEVEL.level5.XPcost, CONFIGLEVEL.level4.nextLevel)
                }  else {
                    return message.reply(`❌ **${CONFIGLEVEL.level5.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 5){
                if(checkPrice(CONFIGLEVEL.level6.XPcost)){
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
                    stats.player.level = 6
                    stats.save()
                    addSquadXp(6)
                    return upgradeLevel(CONFIGLEVEL.level6.XPcost, CONFIGLEVEL.level5.nextLevel) 
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level6.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 6){
                if(checkPrice(CONFIGLEVEL.level7.XPcost)){
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
                    stats.player.level = 7
                    stats.save()
                    addSquadXp(7)
                    return upgradeLevel(CONFIGLEVEL.level7.XPcost, CONFIGLEVEL.level6.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level7.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 7){
                if(checkPrice(CONFIGLEVEL.level8.XPcost)){
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
                    stats.player.level = 8
                    stats.save()
                    addSquadXp(8)
                    upgradeLevel(CONFIGLEVEL.level8.XPcost, CONFIGLEVEL.level7.nextLevel)
                    // Choose Ultimate :
                    var ultimateEmbed = new Discord.MessageEmbed()
                        .setColor('#fc9803')
                        .setAuthor(`${client.users.cache.get(user.id).username}'s ultimate`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                        .addFields(
                        { name: '**📰 Choose Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: **+5%**\n:mending_heart: ${"`Heal`"}: **+5%**\n:four_leaf_clover: ${"`Lucky Strike`"}: **+5%**`, inline: true },
                        )
                        .setFooter('© RPG Bot 2022 | ghelp')
                        .setTimestamp();

                    await message.reply({embeds: [ultimateEmbed]}).then(async msg => {
                        const emoji = await promptMessage(msg, message.author, 3800, ['🪞', '❤️‍🩹', '🍀']);
                            if(emoji === '🪞'){
                                stats.player.ultimate.reflect = stats.player.ultimate.reflect + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.reflect}%** of reflect`);
                            };
                            if(emoji === '❤️‍🩹'){
                                stats.player.ultimate.heal = stats.player.ultimate.heal + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.heal}%** of heal`);
                            };
                            if(emoji === '🍀'){
                                stats.player.ultimate.luckyStrike = stats.player.ultimate.luckyStrike + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.luckyStrike}%** of luckyStrike`);
                            }
                    });
                    return
                }  else {
                    return message.reply(`❌ **${CONFIGLEVEL.level8.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 8){
                if(checkPrice(CONFIGLEVEL.level9.XPcost)){
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
                    stats.player.level = 9
                    stats.save()
                    addSquadXp(9)
                    return upgradeLevel(CONFIGLEVEL.level9.XPcost, CONFIGLEVEL.level8.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level9.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 9){
                if(checkPrice(CONFIGLEVEL.level10.XPcost)){
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
                    stats.player.level = 10
                    stats.save()
                    addSquadXp(10)
                    return upgradeLevel(CONFIGLEVEL.level10.XPcost, CONFIGLEVEL.level9.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level10.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 10){
                if(checkPrice(CONFIGLEVEL.level11.XPcost)){
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
                    stats.player.level = 11
                    stats.save()
                    addSquadXp(11)
                    return upgradeLevel(CONFIGLEVEL.level11.XPcost, CONFIGLEVEL.level10.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level11.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 11){
                if(checkPrice(CONFIGLEVEL.level12.XPcost)){
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
                    stats.player.level = 12
                    stats.save()
                    addSquadXp(12)
                    upgradeLevel(CONFIGLEVEL.level12.XPcost, CONFIGLEVEL.level11.nextLevel)
                    // Choose Ultimate :
                    var ultimateEmbed = new Discord.MessageEmbed()
                        .setColor('#fc9803')
                        .setAuthor(`${client.users.cache.get(user.id).username}'s ultimate`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                        .addFields(
                        { name: '**📰 Choose Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: **+5%**\n:mending_heart: ${"`Heal`"}: **+5%**\n:four_leaf_clover: ${"`Lucky Strike`"}: **+5%**`, inline: true },
                        )
                        .setFooter('© RPG Bot 2022 | ghelp')
                        .setTimestamp();

                    await message.reply({embeds: [ultimateEmbed]}).then(async msg => {
                        const emoji = await promptMessage(msg, message.author, 3800, ['🪞', '❤️‍🩹', '🍀']);
                            if(emoji === '🪞'){
                                stats.player.ultimate.reflect = stats.player.ultimate.reflect + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.reflect}%** of reflect`);
                            };
                            if(emoji === '❤️‍🩹'){
                                stats.player.ultimate.heal = stats.player.ultimate.heal + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.heal}%** of heal`);
                            };
                            if(emoji === '🍀'){
                                stats.player.ultimate.luckyStrike = stats.player.ultimate.luckyStrike + 5
                                stats.save()
                                return message.channel.send(`${`:white_check_mark: `} Great! You now have : **${stats.player.ultimate.luckyStrike}%** of luckyStrike`);
                            }
                    });
                    return
                }  else {
                    return message.reply(`❌ **${CONFIGLEVEL.level12.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 12){
                if(checkPrice(CONFIGLEVEL.level13.XPcost)){
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
                    stats.player.level = 13
                    stats.save()
                    addSquadXp(13)
                    return upgradeLevel(CONFIGLEVEL.level13.XPcost, CONFIGLEVEL.level12.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level13.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 13){
                if(checkPrice(CONFIGLEVEL.level14.XPcost)){
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
                    stats.player.level = 14
                    stats.save()
                    addSquadXp(14)
                    return upgradeLevel(CONFIGLEVEL.level14.XPcost, CONFIGLEVEL.level13.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level14.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 14){
                if(checkPrice(CONFIGLEVEL.level15.XPcost)){
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
                    stats.player.level = 15
                    stats.save()
                    addSquadXp(15)
                    return upgradeLevel(CONFIGLEVEL.level15.XPcost, CONFIGLEVEL.level14.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level15.XPcost - balance.eco.xp}** :izakaya_lantern: are missing`)
                }
            };
            if(stats.player.level == 15){
                return message.reply('Max Level')
            }

        }
    }
};

module.exports.info = {
    names: ['upgrade', 'upgradelevel', 'buylevel', 'upgradeprofile'],
};
