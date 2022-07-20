const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var slotItem = args[0]
    var user = message.author

    if(isNaN(slotItem) == false && slotItem <= 5 && slotItem >= 0){

        let playerStats = await PLAYERDATA.findOne({ userId: user.id });
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            let balance = await BALANCEDATA.findOne({ userId: user.id });
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {

                function slotDisplay(slotID){
                    if(slotID == -1) return 'no item'
                    else {
                        for(let pas = 0; pas < CONFIGITEM.length; pas++){
                            if(slotID == CONFIGITEM[pas].id) return CONFIGITEM[pas].name
                        }
                        return 'no item'
                    };
                };

                var itemname
                if(slotItem == 1){
                    itemname = slotDisplay(playerStats.player.slotItem.slot1)
                    playerStats.player.slotItem.slot1 = -1
                };
                if(slotItem == 2){
                    itemname = slotDisplay(playerStats.player.slotItem.slot2)
                    playerStats.player.slotItem.slot2 = -1
                };
                if(slotItem == 3){
                    itemname = slotDisplay(playerStats.player.slotItem.slot3)
                    playerStats.player.slotItem.slot3 = -1
                };
                if(slotItem == 4){
                    itemname = slotDisplay(playerStats.player.slotItem.slot4)
                    playerStats.player.slotItem.slot4 = -1
                };
                if(slotItem == 5){
                    itemname = slotDisplay(playerStats.player.slotItem.slot5)
                    playerStats.player.slotItem.slot5 = -1
                };
                playerStats.save()

                return message.reply(`You de-equip your: **${itemname}** to slot number : **${slotItem}**`)

            };
        };
    } else return message.reply(`${inlineCode("😵‍💫")} please specify a correct slot: ${inlineCode("gunequip <1/2/3/4/5>")}`);
};

module.exports.info = {
    names: ['unequip', 'ue', 'une'],
};
