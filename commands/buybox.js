const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const STATS = require('../modules/statsBot.js');
const CONFIGITEM = require('../config/stuff.json')
const { numStr } = require('../functionNumber/functionNbr.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 15s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
      message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
      return;
      }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;
    var item = args[0]

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("rbuybox <item name>")}`);

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            function itemExist(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].cost, CONFIGITEM[pas].name]
                    }
                }
                return [false, -1, 0, 'undefined']
            };

            function returnStatsItem(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [CONFIGITEM[pas].name, CONFIGITEM[pas].categorie, CONFIGITEM[pas].rarety, CONFIGITEM[pas].levelAttack.level1, CONFIGITEM[pas].levelDefense.level1, CONFIGITEM[pas].levelDodge.level1, CONFIGITEM[pas].levelCrit.level1, CONFIGITEM[pas].levelPenetration.level1, CONFIGITEM[pas].levelLifeSteal.level1, CONFIGITEM[pas].levelHealth.level1]
                    }
                }
            };

            if(balance.eco.coins < ((itemExist(item)[2]*68)/100)) return message.reply(`${inlineCode("😵‍💫")} you don't have enought money, missing ${inlineCode(numStr((itemExist(item)[2]*68)/100 - balance.eco.coins))} ${CONFIGITEM.coin}`)
            
            else {
                if(itemExist(item)[0]){
                    function alreadyBuy(){
                        for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                            if(itemPlayerAll.id === itemExist(item)[1]) return true
                        }
                        return false
                    };

                    if(alreadyBuy()) return message.reply(`${inlineCode("😵‍💫")} you have already this item !`);
                    else {

                        var percentageGetItem = Math.floor(Math.random() * 20) + 1
                        if(percentageGetItem == 2){
                            // == Item get ==
                            balance.eco.coins -= (itemExist(item)[2]*68)/100
                            balance.save()
    
                            playerStats.player.stuff.stuffUnlock.push({id: itemExist(item)[1], name: itemExist(item)[3], level: 1})
                            playerStats.save()
    
                            let stats = await STATS.findOne({ botID: 899 });
                            stats.amoutItem += 1;
                            stats.save();

                            return message.reply(`${inlineCode("✅")} You get the item **${inlineCode(itemExist(item)[3])}**\nThe item has been added to your inventory !`);

                        } else {
                            var randomCoin = Math.floor(Math.random() * playerStats.player.level * 25) + 50
                            
                            let stats = await STATS.findOne({ botID: 899 });
                            stats.amoutCoin += randomCoin;
                            stats.save();
                            
                            return message.reply(`${inlineCode("📦")} Sorry, the box gave you nothing...\nTry again next time! 😶‍🌫️\nTo make you wait, here are ${inlineCode(numStr(randomCoin))} ${CONFIGITEM.coin}`);
                        }
                    };
                } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
            };
        };
    };
};

module.exports.info = {
  names: ['buybox', 'boxbuy', 'bb', 'coin'],
};
