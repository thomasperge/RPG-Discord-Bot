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
                    if(slotID == -1) return ['no item', -1]
                    else {
                        for(let pas = 0; pas < CONFIGITEM.length; pas++){
                            if(slotID == CONFIGITEM[pas].id) return [CONFIGITEM[pas].name, CONFIGITEM[pas].id]
                        }
                        return ['no item', -1]
                    };
                };

                function itemLevel(itemInputID){
                    for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                        if(itemPlayerAll.id == itemInputID) return itemPlayerAll.level
                    }
                    return 0
                };

                function removeStatsPlayers(idItem, levelItem){
                    for(let pas = 0; pas < CONFIGITEM.length; pas++){
                        if(CONFIGITEM[pas].id == idItem){
                            if(levelItem == 1){
                                playerStats.player.attack -= CONFIGITEM[pas].levelAttack.level1
                                playerStats.player.defense -= CONFIGITEM[pas].levelDefense.level1
                                playerStats.player.dodge -= CONFIGITEM[pas].levelDodge.level1
                                playerStats.player.crit -= CONFIGITEM[pas].levelCrit.level1
                                playerStats.player.penetration -= CONFIGITEM[pas].levelPenetration.level1
                                playerStats.player.lifeSteal -= CONFIGITEM[pas].levelLifeSteal.level1
                                playerStats.player.health -= CONFIGITEM[pas].levelHealth.level1
                            };
                            if(levelItem == 2){
                                playerStats.player.attack -= CONFIGITEM[pas].levelAttack.level2
                                playerStats.player.defense -= CONFIGITEM[pas].levelDefense.level2
                                playerStats.player.dodge -= CONFIGITEM[pas].levelDodge.level2
                                playerStats.player.crit -= CONFIGITEM[pas].levelCrit.level2
                                playerStats.player.penetration -= CONFIGITEM[pas].levelPenetration.level2
                                playerStats.player.lifeSteal -= CONFIGITEM[pas].levelLifeSteal.level2
                                playerStats.player.health -= CONFIGITEM[pas].levelHealth.level2
                            };
                            if(levelItem == 3){
                                playerStats.player.attack -= CONFIGITEM[pas].levelAttack.level3
                                playerStats.player.defense -= CONFIGITEM[pas].levelDefense.level3
                                playerStats.player.dodge -= CONFIGITEM[pas].levelDodge.level3
                                playerStats.player.crit -= CONFIGITEM[pas].levelCrit.level3
                                playerStats.player.penetration -= CONFIGITEM[pas].levelPenetration.level3
                                playerStats.player.lifeSteal -= CONFIGITEM[pas].levelLifeSteal.level3
                                playerStats.player.health -= CONFIGITEM[pas].levelHealth.level3
                            };
                            if(levelItem == 4){
                                playerStats.player.attack -= CONFIGITEM[pas].levelAttack.level4
                                playerStats.player.defense -= CONFIGITEM[pas].levelDefense.level4
                                playerStats.player.dodge -= CONFIGITEM[pas].levelDodge.level4
                                playerStats.player.crit -= CONFIGITEM[pas].levelCrit.level4
                                playerStats.player.penetration -= CONFIGITEM[pas].levelPenetration.level4
                                playerStats.player.lifeSteal -= CONFIGITEM[pas].levelLifeSteal.level4
                                playerStats.player.health -= CONFIGITEM[pas].levelHealth.level4
                            };
                            if(levelItem == 5){
                                playerStats.player.attack -= CONFIGITEM[pas].levelAttack.level5
                                playerStats.player.defense -= CONFIGITEM[pas].levelDefense.level5
                                playerStats.player.dodge -= CONFIGITEM[pas].levelDodge.level5
                                playerStats.player.crit -= CONFIGITEM[pas].levelCrit.level5
                                playerStats.player.penetration -= CONFIGITEM[pas].levelPenetration.level5
                                playerStats.player.lifeSteal -= CONFIGITEM[pas].levelLifeSteal.level5
                                playerStats.player.health -= CONFIGITEM[pas].levelHealth.level5
                            };
                        };
                    };
                };


                var itemname
                if(slotItem == 1){
                    if(playerStats.player.slotItem.slot1 == -1) return message.reply(`${inlineCode('📦')} No objects in this slot...`);
                    
                    itemname = slotDisplay(playerStats.player.slotItem.slot1)[0]
                    removeStatsPlayers(slotDisplay(playerStats.player.slotItem.slot1)[1], itemLevel(slotDisplay(playerStats.player.slotItem.slot1)[1]))
                    playerStats.player.slotItem.slot1 = -1;
                };
                if(slotItem == 2){
                    if(playerStats.player.slotItem.slot2 == -1) return message.reply(`${inlineCode('📦')} No objects in this slot...`);
                    
                    itemname = slotDisplay(playerStats.player.slotItem.slot2)[0]
                    removeStatsPlayers(slotDisplay(playerStats.player.slotItem.slot2)[1], itemLevel(slotDisplay(playerStats.player.slotItem.slot2)[1]))
                    playerStats.player.slotItem.slot2 = -1;
                };
                if(slotItem == 3){
                    if(playerStats.player.slotItem.slot3 == -1) return message.reply(`${inlineCode('📦')} No objects in this slot...`);
                    
                    itemname = slotDisplay(playerStats.player.slotItem.slot3)[0]
                    removeStatsPlayers(slotDisplay(playerStats.player.slotItem.slot3)[1], itemLevel(slotDisplay(playerStats.player.slotItem.slot3)[1]))
                    playerStats.player.slotItem.slot3 = -1;
                };
                if(slotItem == 4){
                    if(playerStats.player.slotItem.slot4 == -1) return message.reply(`${inlineCode('📦')} No objects in this slot...`);
                    
                    itemname = slotDisplay(playerStats.player.slotItem.slot4)[0]
                    removeStatsPlayers(slotDisplay(playerStats.player.slotItem.slot4)[1], itemLevel(slotDisplay(playerStats.player.slotItem.slot4)[1]))
                    playerStats.player.slotItem.slot4 = -1;
                };
                if(slotItem == 5){
                    if(playerStats.player.slotItem.slot5 == -1) return message.reply(`${inlineCode('📦')} No objects in this slot...`);
                    
                    itemname = slotDisplay(playerStats.player.slotItem.slot5)[0]
                    removeStatsPlayers(slotDisplay(playerStats.player.slotItem.slot5)[1], itemLevel(slotDisplay(playerStats.player.slotItem.slot5)[1]))
                    playerStats.player.slotItem.slot5 = -1;
                };
                playerStats.save();

                return message.reply(`${inlineCode("📦")} You de-equip your: **${inlineCode(itemname)}** to slot number : **${inlineCode(slotItem)}**`)
            };
        };
    } else return message.reply(`${inlineCode("😵‍💫")} please specify a correct slot: ${inlineCode("gunequip <1/2/3/4/5>")}`);
};

module.exports.info = {
    names: ['unequip', 'ue', 'une'],
};
