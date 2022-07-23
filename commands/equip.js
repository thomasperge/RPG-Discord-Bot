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

                if(slotItem == 1){ if(playerStats.player.slotItem.slot1 != -1) return message.reply(`${inlineCode('❌')} There is already an item in this slot, first remove it with : ${inlineCode("gunequip <1>")}`)}
                if(slotItem == 2){ if(playerStats.player.slotItem.slot2 != -1) return message.reply(`${inlineCode('❌')} There is already an item in this slot, first remove it with : ${inlineCode("gunequip <2>")}`)}
                if(slotItem == 3){ if(playerStats.player.slotItem.slot3 != -1) return message.reply(`${inlineCode('❌')} There is already an item in this slot, first remove it with : ${inlineCode("gunequip <3>")}`)}
                if(slotItem == 4){ if(playerStats.player.slotItem.slot4 != -1) return message.reply(`${inlineCode('❌')} There is already an item in this slot, first remove it with : ${inlineCode("gunequip <4>")}`)}
                if(slotItem == 5){ if(playerStats.player.slotItem.slot5 != -1) return message.reply(`${inlineCode('❌')} There is already an item in this slot, first remove it with : ${inlineCode("gunequip <5>")}`)}

                function itemExist(item){
                    for(let pas = 0; pas < CONFIGITEM.length; pas++){
                        for(const alias of CONFIGITEM[pas].alias){
                            if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].name]
                        };
                    };
                    return [false, -1]
                };

                if(itemExist(item)[0]){

                    function ifItemInInventory(item){
                        for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                            var itemPlayer = itemPlayerAll.id
                            var itemLevel = itemPlayerAll.level
                            var itemPlayerExist = itemExist(item)[1]

                            if(itemPlayer == itemPlayerExist) return [true, itemPlayerExist, itemLevel]
                        }
                        return [false, -1, -1]
                    };

                    const IDITEM = itemExist(item)[1]
                    if(playerStats.player.slotItem.slot1 == IDITEM) return message.reply(`${inlineCode('❌')} You have already put this object in a slot...`);
                    if(playerStats.player.slotItem.slot2 == IDITEM) return message.reply(`${inlineCode('❌')} You have already put this object in a slot...`);
                    if(playerStats.player.slotItem.slot3 == IDITEM) return message.reply(`${inlineCode('❌')} You have already put this object in a slot...`);
                    if(playerStats.player.slotItem.slot4 == IDITEM) return message.reply(`${inlineCode('❌')} You have already put this object in a slot...`);
                    if(playerStats.player.slotItem.slot5 == IDITEM) return message.reply(`${inlineCode('❌')} You have already put this object in a slot...`);

                    function addStatsPlayers(){
                        var idItem = ifItemInInventory(item)[1];
                        var levelItem = ifItemInInventory(item)[2];

                        for(let pas = 0; pas < CONFIGITEM.length; pas++){
                            if(CONFIGITEM[pas].id == idItem){
                                if(levelItem == 1){
                                    playerStats.player.attack += CONFIGITEM[pas].levelAttack.level1
                                    playerStats.player.defense += CONFIGITEM[pas].levelDefense.level1
                                    playerStats.player.dodge += CONFIGITEM[pas].levelDodge.level1
                                    playerStats.player.crit += CONFIGITEM[pas].levelCrit.level1
                                    playerStats.player.penetration += CONFIGITEM[pas].levelPenetration.level1
                                    playerStats.player.lifeSteal += CONFIGITEM[pas].levelLifeSteal.level1
                                    playerStats.player.health += CONFIGITEM[pas].levelHealth.level1
                                };
                                if(levelItem == 2){
                                    playerStats.player.attack += CONFIGITEM[pas].levelAttack.level2
                                    playerStats.player.defense += CONFIGITEM[pas].levelDefense.level2
                                    playerStats.player.dodge += CONFIGITEM[pas].levelDodge.level2
                                    playerStats.player.crit += CONFIGITEM[pas].levelCrit.level2
                                    playerStats.player.penetration += CONFIGITEM[pas].levelPenetration.level2
                                    playerStats.player.lifeSteal += CONFIGITEM[pas].levelLifeSteal.level2
                                    playerStats.player.health += CONFIGITEM[pas].levelHealth.level2
                                };
                                if(levelItem == 3){
                                    playerStats.player.attack += CONFIGITEM[pas].levelAttack.level3
                                    playerStats.player.defense += CONFIGITEM[pas].levelDefense.level3
                                    playerStats.player.dodge += CONFIGITEM[pas].levelDodge.level3
                                    playerStats.player.crit += CONFIGITEM[pas].levelCrit.level3
                                    playerStats.player.penetration += CONFIGITEM[pas].levelPenetration.level3
                                    playerStats.player.lifeSteal += CONFIGITEM[pas].levelLifeSteal.level3
                                    playerStats.player.health += CONFIGITEM[pas].levelHealth.level3
                                };
                                if(levelItem == 4){
                                    playerStats.player.attack += CONFIGITEM[pas].levelAttack.level4
                                    playerStats.player.defense += CONFIGITEM[pas].levelDefense.level4
                                    playerStats.player.dodge += CONFIGITEM[pas].levelDodge.level4
                                    playerStats.player.crit += CONFIGITEM[pas].levelCrit.level4
                                    playerStats.player.penetration += CONFIGITEM[pas].levelPenetration.level4
                                    playerStats.player.lifeSteal += CONFIGITEM[pas].levelLifeSteal.level4
                                    playerStats.player.health += CONFIGITEM[pas].levelHealth.level4
                                };
                                if(levelItem == 5){
                                    playerStats.player.attack += CONFIGITEM[pas].levelAttack.level5
                                    playerStats.player.defense += CONFIGITEM[pas].levelDefense.level5
                                    playerStats.player.dodge += CONFIGITEM[pas].levelDodge.level5
                                    playerStats.player.crit += CONFIGITEM[pas].levelCrit.level5
                                    playerStats.player.penetration += CONFIGITEM[pas].levelPenetration.level5
                                    playerStats.player.lifeSteal += CONFIGITEM[pas].levelLifeSteal.level5
                                    playerStats.player.health += CONFIGITEM[pas].levelHealth.level5
                                };
                            };
                        };
                    };

                    if(ifItemInInventory(item)[0]){
                        var slotEquipItem = ifItemInInventory(item)[1]
                        addStatsPlayers()

                        if(slotItem == 1) playerStats.player.slotItem.slot1 = slotEquipItem
                        if(slotItem == 2) playerStats.player.slotItem.slot2 = slotEquipItem
                        if(slotItem == 3) playerStats.player.slotItem.slot3 = slotEquipItem
                        if(slotItem == 4) playerStats.player.slotItem.slot4 = slotEquipItem
                        if(slotItem == 5) playerStats.player.slotItem.slot5 = slotEquipItem
                        playerStats.save()

                        message.reply(`${inlineCode("📦")} You equip your: **${inlineCode(itemExist(item)[2])}** in your slot number : **${inlineCode(slotItem)}**\nTo remove your equipment type : ${inlineCode("gunequip <1/2/3/4/5>")}`)

                    };
                } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
            };
        };
    } else return message.reply(`${inlineCode("😵‍💫")} please specify a correct slot: ${inlineCode("gequip <item> <1/2/3/4/5>")}`);
};

module.exports.info = {
    names: ['equip'],
};
