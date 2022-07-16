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

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            if(balance.eco.coins <= 0) return message.reply(`${inlineCode("😵‍💫")} balance error...`)

            for(let pas = 0; pas < CONFIGITEM.length; pas++){

                for(const alias of CONFIGITEM[pas].alias){

                    if(item === alias){

                        function itemInInventory(){
                            for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                                var i = itemPlayerAll
                                if(itemPlayerAll.id === CONFIGITEM[pas].id) return [true, i]
                            }
                            return [false, i]
                        }

                        if(itemInInventory()[0] == false) return message.reply(`${inlineCode("😵‍💫")} you don't have this item !`)
                        else {
                            // == Seling 5% of the prices ==
                            balance.eco.coins += (CONFIGITEM[pas].cost * 5)/100
                            balance.save()

                            // == Delete Array ==
                            var index = playerStats.player.stuff.stuffUnlock.indexOf(itemInInventory()[1])
                            playerStats.player.stuff.stuffUnlock.splice(index, 1)
                            playerStats.save()

                            return message.reply(`✅ Selling made!\nSelling for: ${(CONFIGITEM[pas].cost * 5)/100}`)

                        };
                    };
                };
            };
        };
    };
};

module.exports.info = {
    names: ['s', 'sellitem', 'itemsell', 'sellingitem'],
};
