const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const PLAYERSTATSDATA = require('../modules/player.js')
const SQUADDATA = require('../modules/squad.js')
const CONFIGLEVEL = require('../config/configLevel.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

// Config Cooldown :
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author

    //  ======= CoolDowns: 5min =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;

    // ==== Economie Accout ====
    let balance = await BALANCEDATA.findOne({ userId: message.author.id });
    if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // ==== Player Accout ====
        let stats = await PLAYERSTATSDATA.findOne({ userId: user.id });
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
                if(priceNextLevel > balance.eco.xp) message.reply(`${inlineCode('❌')} You have not enought Xp...`)
                if(priceNextLevel <= balance.eco.xp){
                    // Pricing :
                    balance.eco.xp = balance.eco.xp - priceNextLevel
                    balance.save()

                    // Stats :
                    stats.player.attack += 10
                    stats.player.defense += 4
                    stats.player.health += 200
                    stats.player.dodge += 1
                    stats.player.crit += 1
                    stats.player.penetretion += 1.5
                    stats.player.lifeSteal += 1
                    stats.player.level += 1
                    stats.save()

                    // Embed :
                    var upgradeEmbed = new Discord.MessageEmbed()
                        .setColor('#fc9803')
                        .setTitle(`${user.username}'s Upgrade Level`)
                        .setDescription(`** ${inlineCode('✅')} NEW LEVEL !**\n${inlineCode('➡️')} You are now levels: **${nextLevel}** !\n🪧 Cost: ${inlineCode(priceNextLevel)} 🏮`)
                        .addFields(
                            { name: '**📊 NEW STATS :**\n', value: `:fire: ${inlineCode('Attack')}: ${stats.player.attack}\n:shield: ${inlineCode('Defense')}: ${stats.player.defense}\n:heart: ${inlineCode('Health')}: ${stats.player.health}\n:dash: ${inlineCode('Dodge')}: ${stats.player.dodge}%\n🏑 ${inlineCode('Penetration')}: ${stats.player.penetration}%\n:boom: ${inlineCode('Critick')}: ${stats.player.crit}%\n:heart_on_fire: ${inlineCode('Life Steal')}: ${stats.player.lifeSteal}%`, inline: true },
                        )
                        .setTimestamp();
                    return message.channel.send({embeds: [upgradeEmbed]});
                }
            };;


            function addSquadXp(squad, levelUser){
                if(squad){
                    squad.squadXp += Math.floor(Math.random() * levelUser * 500)
                    squad.save()
                }
            };

            // === Leveling Function => Return Function ===
            if(stats.player.level == 0){
                if(checkPrice(CONFIGLEVEL.level1.XPcost)){

                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 1)

                    return upgradeLevel(CONFIGLEVEL.level1.XPcost, 1)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level1.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 1){
                if(checkPrice(CONFIGLEVEL.level2.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 2)

                    return upgradeLevel(CONFIGLEVEL.level2.XPcost, CONFIGLEVEL.level1.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level2.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 2){
                if(checkPrice(CONFIGLEVEL.level3.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 3)

                    return upgradeLevel(CONFIGLEVEL.level3.XPcost, CONFIGLEVEL.level2.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level3.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 3){
                if(checkPrice(CONFIGLEVEL.level4.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 3)

                    return upgradeLevel(CONFIGLEVEL.level4.XPcost, CONFIGLEVEL.level3.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level4.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 4){
                if(checkPrice(CONFIGLEVEL.level5.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 5)

                    return upgradeLevel(CONFIGLEVEL.level5.XPcost, CONFIGLEVEL.level4.nextLevel)
                }  else {
                    return message.reply(`❌ **${CONFIGLEVEL.level5.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 5){
                if(checkPrice(CONFIGLEVEL.level6.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 6)

                    return upgradeLevel(CONFIGLEVEL.level6.XPcost, CONFIGLEVEL.level5.nextLevel) 
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level6.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 6){
                if(checkPrice(CONFIGLEVEL.level7.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 7)

                    return upgradeLevel(CONFIGLEVEL.level7.XPcost, CONFIGLEVEL.level6.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level7.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 7){
                if(checkPrice(CONFIGLEVEL.level8.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 8)

                    return upgradeLevel(CONFIGLEVEL.level8.XPcost, CONFIGLEVEL.level7.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level8.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 8){
                if(checkPrice(CONFIGLEVEL.level9.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 9)

                    return upgradeLevel(CONFIGLEVEL.level9.XPcost, CONFIGLEVEL.level8.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level9.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 9){
                if(checkPrice(CONFIGLEVEL.level10.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 10)

                    return upgradeLevel(CONFIGLEVEL.level10.XPcost, CONFIGLEVEL.level9.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level10.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 10){
                if(checkPrice(CONFIGLEVEL.level11.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 11)

                    return upgradeLevel(CONFIGLEVEL.level11.XPcost, CONFIGLEVEL.level10.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level11.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 11){
                if(checkPrice(CONFIGLEVEL.level12.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 12)

                    return upgradeLevel(CONFIGLEVEL.level12.XPcost, CONFIGLEVEL.level11.nextLevel)
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level12.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 12){
                if(checkPrice(CONFIGLEVEL.level13.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 13)

                    return upgradeLevel(CONFIGLEVEL.level13.XPcost, CONFIGLEVEL.level12.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level13.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 13){
                if(checkPrice(CONFIGLEVEL.level14.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 14)

                    return upgradeLevel(CONFIGLEVEL.level14.XPcost, CONFIGLEVEL.level13.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level14.XPcost - balance.eco.xp}** 🏮 are missing`)
                };
            };
            if(stats.player.level == 14){
                if(checkPrice(CONFIGLEVEL.level15.XPcost)){
                    
                    // ==== Squad Accout ====
                    let squad = await SQUADDATA.findOne({ squadName: stats.player.other.squadName });
                    if (squad) addSquadXp(squad, 15)

                    return upgradeLevel(CONFIGLEVEL.level15.XPcost, CONFIGLEVEL.level14.nextLevel)  
                } else {
                    return message.reply(`❌ **${CONFIGLEVEL.level15.XPcost - balance.eco.xp}** 🏮 are missing`)
                }
            };
            if(stats.player.level == 15){
                return message.reply('Max Level')
            };
        };
    };
};

module.exports.info = {
    names: ['upgrade', 'upgradelevel', 'buylevel', 'upgradeprofile'],
};
