const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const EMOJICONFIG = require('../config/emoji.json');
const CONFIGITEM = require('../config/stuff.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 4000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5min =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author
    var item = args[0]

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("rupgradeitem <item name>")}`);


    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            if(balance.eco.coins <= 0) return message.reply(`${inlineCode("😵‍💫")} balance error...`)
            if(playerStats.player.level < 10) return message.reply(`${inlineCode("😬")} You must be level 10 to improve your item...`)

            for(let pas = 0; pas < CONFIGITEM.length; pas++){

                if(balance.eco.coins < CONFIGITEM[pas].cost) return message.reply(`${inlineCode("😵‍💫")} you don't have enought money, missing ${CONFIGITEM[pas].cost - balance.eco.coins} ${EMOJICONFIG.coin}`)
                else {

                    function itemExist(item){
                        for(let pas = 0; pas < CONFIGITEM.length; pas++){
                            for(const alias of CONFIGITEM[pas].alias){
                                if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].cost, CONFIGITEM[pas].name, CONFIGITEM[pas].categorie, CONFIGITEM[pas].rarety]
                            }
                        }
                        return [false, -1, 0, 'undefined', 'undefined', 'undefined']
                    };

                    for(const alias of CONFIGITEM[pas].alias){

                        if(item === alias){
                            if(balance.eco.coins >= CONFIGITEM[pas].costperenhancement) {

                                // == Boucle dans dans les items debloquer ==
                                for(const allItemUnlock of playerStats.player.stuff.stuffUnlock){

                                    // === Player have item ===
                                    if(allItemUnlock.id === CONFIGITEM[pas].id){

                                        if(allItemUnlock.level >= 5) return message.reply(`${inlineCode("😵‍💫")} item max level !`)

                                        const IDITEM = itemExist(item)[1]
                                        if(playerStats.player.slotItem.slot1 == IDITEM) return message.reply(`${inlineCode('❌')} You can't sell an item in a slot...`);
                                        if(playerStats.player.slotItem.slot2 == IDITEM) return message.reply(`${inlineCode('❌')} You can't sell an item in a slot...`);
                                        if(playerStats.player.slotItem.slot3 == IDITEM) return message.reply(`${inlineCode('❌')} You can't sell an item in a slot...`);
                                        if(playerStats.player.slotItem.slot4 == IDITEM) return message.reply(`${inlineCode('❌')} You can't sell an item in a slot...`);
                                        if(playerStats.player.slotItem.slot5 == IDITEM) return message.reply(`${inlineCode('❌')} You can't sell an item in a slot...`);

                                        // Upgrade Level : 
                                        balance.eco.coins -= CONFIGITEM[pas].costperenhancement
                                        balance.save()

                                        var currencyLevel = allItemUnlock.level + 1

                                        // == Delete Array ==
                                        var index = playerStats.player.stuff.stuffUnlock.indexOf(allItemUnlock)
                                        playerStats.player.stuff.stuffUnlock.splice(index, 1)

                                        // == Add array with level + 1 ==
                                        playerStats.player.stuff.stuffUnlock.push({id: CONFIGITEM[pas].id, name: CONFIGITEM[pas].name, level: currencyLevel})
                                        playerStats.save()

                                        return message.reply('✅ Upgrade Done !')
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

module.exports.info = {
    names: ['m', 'upgradeitem', 'itemupgrade', 'improveitem', 'itemimprove', 'uitem'],
};
