const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 5000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;
    var coinGiven = args[0]

    if(coinGiven === '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("ggivesquad <coin amout>")}`)
    else if(coinGiven === ' ') message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("ggivesquad <coin amout>")}`)
    else if(coinGiven === undefined) message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("ggivesquad <coin amout>")}`)
    else if(isNaN(coinGiven)) message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("ggivesquad <coin amout>")}`)
    else if(coinGiven != undefined && isNaN(coinGiven) == false && coinGiven > 0) {


        function playerInSquad(playerStats){
            // == Player Db ==
            if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {
                if(playerStats.player.other.squadName != 'undefined') return true
            }
            return false
        }
        
        // == Balance Db ==
        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            // == Player Db ==
            let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
            if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {

                // == Squad Db ==
                let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
                if (!squad) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
                else {

                    if(playerInSquad(playerStats)){
                        if(balance.eco.coins < coinGiven) return message.reply(`${inlineCode("😬")} you don't have ${inlineCode(coinGiven)} 🪙 to give in the bank squad...`)
                        else {
                            balance.eco.coins -= Math.floor(coinGiven)
                            balance.save()

                            squad.squadbank += Math.floor(coinGiven)
                            squad.save()

                            playerStats.player.other.squadCoinGiven += Math.floor(coinGiven)
                            playerStats.save()

                            var squadEmbed = new Discord.MessageEmbed()
                                .setColor('#4dca4d')
                                .setAuthor(`🛖 Squad Coin Given`)
                                .setDescription(`🪵 ${inlineCode(squad.squadName + "'s")} squad\n🪧 You given : ${inlineCode(coinGiven)} 🪙\n📰 Current Squad Bank : ${inlineCode(squad.squadbank + "🪙")}`)
                                .setFooter('© RPG Bot 2022 | ghelp')
                                .setTimestamp();
                            return message.reply({embeds: [squadEmbed]});
                        } 
                    } else return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`);
                }
            }
        }
    } else return message.reply(`${inlineCode("😶‍🌫️")} number of coins is invalid...`) ;
}

module.exports.info = {
  names: ['squadgive', 'give', 'givesquad', 'givecoinsquad', 'squadcoin', 'coinsquad', 'teamgive', 'giveteam', 'ivesquad'],
};
