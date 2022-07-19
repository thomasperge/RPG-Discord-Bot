const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var item = args[0]
    var user = message.author

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("gsellitem <item name>")}`);

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            if(balance.eco.coins <= 0) return message.reply(`${inlineCode("😵‍💫")} balance error..., contact Owner elthomas#2441`)

            function itemExist(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].cost, CONFIGITEM[pas].name]
                    }
                }
                return [false, -1, 0, 'undefined']
            }

            if(itemExist(item)[0]){

                function ifItemInInventory(item){
                    for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                        var itemPlayer = itemPlayerAll.id
                        var itemPlayerExist = itemExist(item)[1]

                        if(itemPlayer == itemPlayerExist) return [true, itemPlayer]
                    }
                    return [false, -1]
                };

                if(ifItemInInventory(item) == false) return message.reply(`${inlineCode("😵‍💫")} you don't have this item !`)
                else {
                    // == Seling 5% of the prices ==
                    balance.eco.coins += (itemExist(item)[2] * 5)/100
                    balance.save()

                    // == Delete Array ==
                    var index = playerStats.player.stuff.stuffUnlock.indexOf(ifItemInInventory()[1])
                    playerStats.player.stuff.stuffUnlock.splice(index, 1)
                    playerStats.save()

                    return message.reply(`✅ Selling made!\nSelling for: ${(itemExist(item)[2] * 5)/100}`)

                };
            } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
        };
    };
};

module.exports.info = {
    names: ['s', 'sellitem', 'itemsell', 'sellingitem'],
};
