const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const player = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
    var item = args[0]
    var slotItem = args[1]
    var user = message.author

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("gequip <item> <1/2/3/4/5>")}`);

    if(isNaN(slotItem) == false && slotItem <= 5 && slotItem >= 0){
        let playerStats = await PLAYERDATA.findOne({ userId: user.id });
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            let balance = await BALANCEDATA.findOne({ userId: user.id });
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {

                function itemExist(item){
                    for(let pas = 0; pas < CONFIGITEM.length; pas++){
                        for(const alias of CONFIGITEM[pas].alias){
                            if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].name]
                        }
                    }
                    return [false, -1]
                };

                if(itemExist(item)[0]){

                    function ifItemInInventory(item){
                        for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                            var itemPlayer = itemPlayerAll.id
                            var itemPlayerExist = itemExist(item)[1]

                            if(itemPlayer == itemPlayerExist) return [true, itemPlayerExist]
                        }
                        return [false, -1]
                    };

                    if(ifItemInInventory(item)[0]){
                        var slotEquipItem = ifItemInInventory(item)[1]

                        if(slotItem == 1) playerStats.player.slotItem.slot1 = slotEquipItem
                        if(slotItem == 2) playerStats.player.slotItem.slot2 = slotEquipItem
                        if(slotItem == 3) playerStats.player.slotItem.slot3 = slotEquipItem
                        if(slotItem == 4) playerStats.player.slotItem.slot4 = slotEquipItem
                        if(slotItem == 5) playerStats.player.slotItem.slot5 = slotEquipItem
                        playerStats.save()

                        message.reply(`You equip your: **${itemExist(item)[2]}** in your slot number : **${slotItem}**`)

                    };
                } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
            };
        };
    } else return message.reply(`${inlineCode("😵‍💫")} please specify a correct slot: ${inlineCode("gequip <item> <1/2/3/4/5>")}`);
};

module.exports.info = {
    names: ['equip'],
};
