const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const EMOJICONFIG = require('../config/emoji.json');
const BALANCEDATA = require('../modules/economie.js');
const { numStr } = require('../functionNumber/functionNbr.js')
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
    var item = args[0];


    let balance = await BALANCEDATA.findOne({ userId: user.id });
    if(!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        if(item == 'xp' || item == 'level'){
            // == Xp leaderboard ==

            const sortedCollection = await BALANCEDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                sortedArray.push({name: i.pseudo, xp: i.eco.xp})
            }

            sortedArray.sort((a, b) => a.xp - b.xp);
            sortedArray.reverse()

            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#4dca4d')
                .setTitle(`📊 Top 10 Richest Xp Adventure ${EMOJICONFIG.xp}`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(numStr(sortedArray[0].xp) + `${EMOJICONFIG.xp}`)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(numStr(sortedArray[1].xp) + `${EMOJICONFIG.xp}`)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(numStr(sortedArray[2].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(numStr(sortedArray[3].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(numStr(sortedArray[4].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(numStr(sortedArray[5].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(numStr(sortedArray[7].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(numStr(sortedArray[8].xp) + `${EMOJICONFIG.xp}`)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(numStr(sortedArray[9].xp) + `${EMOJICONFIG.xp}`)}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});

        } else if(item == 'coin' || item == 'coins' || item == 'gold'){
            // == Coin leaderboard ==

            const sortedCollection = await BALANCEDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                sortedArray.push({name: i.pseudo, coins: i.eco.coins})
            }

            sortedArray.sort((a, b) => a.coins - b.coins);
            sortedArray.reverse()

            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#ffd100')
                .setTitle(`📊 Top 10 Richest Coins Adventure ${EMOJICONFIG.coin}`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(numStr(sortedArray[0].coins) + `${EMOJICONFIG.coin}`)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(numStr(sortedArray[1].coins) + `${EMOJICONFIG.coin}`)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(numStr(sortedArray[2].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(numStr(sortedArray[3].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(numStr(sortedArray[4].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(numStr(sortedArray[5].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(numStr(sortedArray[7].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(numStr(sortedArray[8].coins) + `${EMOJICONFIG.coin}`)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(numStr(sortedArray[9].coins) + `${EMOJICONFIG.coin}`)}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
            
        } else if (item == 'squad' || item == 'escouade'){
            // == Squad leaderboard ==

            const sortedCollection = await SQUADDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                sortedArray.push({name: i.squadName, level: Math.floor(i.squadXp / 1000)})
            }

            sortedArray.sort((a, b) => a.level - b.level);
            sortedArray.reverse()

            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#ffd100')
                .setTitle(`📊 Top 10 most powerful squads`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode('level ' + sortedArray[0].level)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode('level ' + sortedArray[1].level)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode('level ' + sortedArray[2].level)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode('level ' + sortedArray[3].level)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode('level ' + sortedArray[4].level)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode('level ' + sortedArray[5].level)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode('level ' + sortedArray[6].level)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode('level ' + sortedArray[6].level)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode('level ' + sortedArray[7].level)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode('level ' + sortedArray[8].level)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode('level ' + sortedArray[9].level)}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
        } else if (item == 'kill' || item == 'monstrer' || item == 'monstrekill'){
            // == Kill leaderboard ==

            const sortedCollection = await PLAYERDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                sortedArray.push({name: i.pseudo, kill: i.player.other.monsterKill})
            }

            sortedArray.sort((a, b) => a.kill - b.kill);
            sortedArray.reverse()


            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#ffd100')
                .setTitle(`📊 Top 10 players with the most kills`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(numStr(sortedArray[0].kill) + ' kill')}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(numStr(sortedArray[1].kill) + ' kill')}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(numStr(sortedArray[2].kill) + ' kill')}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(numStr(sortedArray[3].kill) + ' kill')}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(numStr(sortedArray[4].kill) + ' kill')}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(numStr(sortedArray[5].kill) + ' kill')}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].kill) + ' kill')}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(numStr(sortedArray[6].kill) + ' kill')}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(numStr(sortedArray[7].kill) + ' kill')}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(numStr(sortedArray[8].kill) + ' kill')}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(numStr(sortedArray[9].kill) + ' kill')}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
        } else if (item == 'elo' || item == 'ELO' || item == 'duel'){
            // == Kill leaderboard ==

            const sortedCollection = await PLAYERDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                sortedArray.push({name: i.pseudo, elo: i.player.elo})
            }

            sortedArray.sort((a, b) => a.elo - b.elo);
            sortedArray.reverse()

            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#ffd100')
                .setTitle(`📊 Top 10 players with the most ELO`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].elo + ' elo')}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].elo + ' elo')}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].elo + ' elo')}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].elo + ' elo')}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].elo + ' elo')}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].elo + ' elo')}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].elo + ' elo')}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].elo + ' elo')}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].elo + ' elo')}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].elo + ' elo')}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(sortedArray[9].elo + ' elo')}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
        } else {
            return message.reply(`${inlineCode("❌")} Use  ${inlineCode("rleaderboard <xp/coin/squad/kill/elo>")}!`)
        }
    }
};

module.exports.info = {
    names: ['leadboard', 'lb', 'leaderboard'],
};
