const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js')
const BALANCEDATA = require('../modules/economie.js')
const STATS = require('../modules/statsBot.js')
const { numStr } = require('../functionNumber/functionNbr.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { inlineCode } = require('@discordjs/builders')

// Config Cooldown :
const shuffleTime = 4000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author
    var amoutBox = args[0]

    let stats = await STATS.findOne({ botID: 899 });

    /**=== Account Stats Mine ===*/
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            // Ouvrir une Box : 
            if(isNaN(amoutBox) || amoutBox == undefined){
                if(playerStats.player.other.box >= 1){
                    var randomItem = Math.floor(Math.random() * 2) + 1;

                    if(randomItem == 1){
                        var randomCoin = Math.floor(Math.random() * (playerStats.player.level * 90)) + 80

                        balance.eco.coins += randomCoin
                        balance.save()
                        playerStats.player.other.box -= 1
                        playerStats.save()
                        stats.boxOpen += 1
                        stats.save()

                        return message.reply(`${inlineCode('📦')} you get : ${inlineCode(numStr(randomCoin) + " 🪙")}`)
                    } else {
                        var randomXp = Math.floor(Math.random() * (playerStats.player.level * 170)) + 140
                        
                        balance.eco.coins += ranrandomXpdomCoin
                        balance.save()
                        playerStats.player.other.box -= 1
                        playerStats.save()
                        stats.boxOpen += 1
                        stats.save()

                        return message.reply(`${inlineCode('📦')} you get : ${inlineCode(numStr(randomXp) + " 🏮")}`)
                    };
                } else return message.reply(`${inlineCode('❌')} You don't have a box to open`)
            };

            if(isNaN(amoutBox) == false && amoutBox >= playerStats.player.other.box) {
                if(amoutBox >= 0 && amoutBox >= 99){
                    var randomItem = Math.floor(Math.random() * 2) + 1;

                    if(randomItem == 1){
                        var randomCoin = Math.floor(Math.random() * (playerStats.player.level * 90)) + 80
                        randomCoin * amoutBox
                        
                        balance.eco.coins += randomCoin
                        balance.save()
                        playerStats.player.other.box -= amoutBox
                        playerStats.save()
                        stats.boxOpen += 1
                        stats.save()

                        return message.reply(`${inlineCode('📦')} you get : ${inlineCode(numStr(randomCoin) + " 🪙")}`)
                    } else {
                        var randomXp = Math.floor(Math.random() * (playerStats.player.level * 170)) + 140
                        randomXp * amoutBox

                        balance.eco.coins += ranrandomXpdomCoin
                        balance.save()
                        playerStats.player.other.box -= amoutBox
                        playerStats.save()
                        stats.boxOpen += 1
                        stats.save()

                        return message.reply(`${inlineCode('📦')} You open ${inlineCode(amoutBox)} boxes, and you get : ${inlineCode(numStr(randomXp) + " 🏮")}`)
                    };
                } else return message.reply(`${inlineCode('❌')} Error, you can only open between 0 and 99 boxes`);
            };
        };
    };
};

module.exports.info = {
    names: ['ob', 'openbox', 'boxopen', 'lootbox', 'open'],
};
