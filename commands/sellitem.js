const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const CONFIGITEM = require('../config/stuff.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var item = args[0]
    var user = message.author

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            if(balance.eco.coins <= 0) return message.reply(`${inlineCode("😵‍💫")} balance error...`)

            for(let pas = 0; pas < CONFIGITEM.length; pas++){

                if(balance.eco.coins < CONFIGITEM[pas].cost) return message.reply(`${inlineCode("😵‍💫")} you don't have enought money, missing ${CONFIGITEM[pas].cost - balance.eco.coins}`)

                for(const alias of CONFIGITEM[pas].alias){

                    if(item === alias){
                        if(balance.eco.coins >= CONFIGITEM[pas].cost) {

                            function alreadyBuy(){
                                for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                                    if(itemPlayerAll.id === CONFIGITEM[pas].id) return true
                                }
                                return false
                            }

                            if(alreadyBuy()) return message.reply(`${inlineCode("😵‍💫")} you have already this item !`)
                            else {
                                balance.eco.coins -= CONFIGITEM[pas].cost
                                balance.save()

                                playerStats.player.stuff.stuffUnlock.push({id: CONFIGITEM[pas].id, level: 1})
                                playerStats.save()

                                return message.reply(`✅ Purchase made!\n**NEW** ITEM ${CONFIGITEM[pas].name}`)

                            };
                        };
                    };
                };
            };
        };
    };
};

module.exports.info = {
    names: ['b', 'itembuy'],
};
