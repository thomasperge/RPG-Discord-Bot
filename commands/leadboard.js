const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
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
    var item = args[0];


    let balance = await BALANCEDATA.findOne({ userId: user.id });
    if(!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
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
                .setTitle(`📊 Top 10 Richest Xp Adventure 🏮`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].xp)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].xp)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].xp)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].xp)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].xp)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].xp)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].xp)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].xp)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(sortedArray[9].xp)}`)
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
                .setTitle(`📊 Top 10 Richest Coins Adventure 🪙`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].coins)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].coins)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].coins)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].coins)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].coins)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].coins)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].coins)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].coins)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].coins)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].coins)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(sortedArray[9].coins)}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
            
        } else if (item == 'squad' || item == 'escouade'){
            // == Squad leaderboard ==

            const sortedCollection = await SQUADDATA.find()
            var sortedArray = []

            for(const i of sortedCollection){
                console.log(i)
                sortedArray.push({name: i.squadName, level: Math.floor(i.squadXp / 1000)})
            }

            sortedArray.sort((a, b) => a.level - b.level);
            sortedArray.reverse()

            console.log(sortedArray)

            var leadboardEmbed = new Discord.MessageEmbed()
                .setColor('#ffd100')
                .setTitle(`📊 Top 10 most powerful squads`)
                .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode('level ' + sortedArray[0].level)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode('level ' + sortedArray[1].level)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode('level ' + sortedArray[2].level)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode('level ' + sortedArray[3].level)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode('level ' + sortedArray[4].level)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode('level ' + sortedArray[5].level)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode('level ' + sortedArray[6].level)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode('level ' + sortedArray[6].level)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode('level ' + sortedArray[7].level)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode('level ' + sortedArray[8].level)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode('level ' + sortedArray[9].level)}`)
                .setTimestamp();
            return message.channel.send({embeds: [leadboardEmbed]});
        }
        
        else {
            return message.reply(`${inlineCode("❌")} Use gleaderboard ${inlineCode("gold")} or ${inlineCode("xp")}!`)
        }
    }
};

module.exports.info = {
    names: ['leadboard', 'lb', 'leaderboard'],
};
