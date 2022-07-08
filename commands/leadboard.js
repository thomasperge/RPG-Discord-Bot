const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var item = args[0];


    let balance = await BALANCEDATA.findOne({ userId: user.id });
    if(!balance) message.reply('`❌` You already have a bank account... !')


    if(item == 'xp'){
        // LeadBoard Xp
        const sortedCollection = await BALANCEDATA.find()
        var sortedArray = []

        for(const i of sortedCollection){
            sortedArray.push({name: i.pseudo, xp: i.eco.xp})
        }

        sortedArray.sort((a, b) => a.xp - b.xp);
        sortedArray.reverse()

        var leadboardEmbed = new Discord.MessageEmbed()
            .setColor('#4dca4d')
            .setAuthor(`📊 Top 10 Richest Xp Adventure 🏮`)
            .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].xp)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].xp)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].xp)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].xp)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].xp)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].xp)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].xp)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].xp)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(sortedArray[9].xp)}`)
            .setFooter('© RPG Bot 2022 | ghelp')
            .setTimestamp();
        return message.channel.send({embeds: [leadboardEmbed]});
    } else if(item == 'coin' || item == 'coins' || item == 'gold'){
        // LeadBoard Coins
        const sortedCollection = await BALANCEDATA.find()
        var sortedArray = []

        for(const i of sortedCollection){
            sortedArray.push({name: i.pseudo, coins: i.eco.coins})
        }

        sortedArray.sort((a, b) => a.coins - b.coins);
        sortedArray.reverse()

        var leadboardEmbed = new Discord.MessageEmbed()
            .setColor('#ffd100')
            .setAuthor(`📊 Top 10 Richest Coins Adventure 🪙`)
            .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].coins)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].coins)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].coins)}\n**📦 #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].coins)}\n**📦 #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].coins)}\n**📦 #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].coins)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].coins)}\n**📦 #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].coins)}\n**📦 #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].coins)}\n**📦 #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].coins)}\n**📦 #10 **${sortedArray[9].name}: ${inlineCode(sortedArray[9].coins)}`)
            .setFooter('© RPG Bot 2022 | ghelp')
            .setTimestamp();
        return message.channel.send({embeds: [leadboardEmbed]});
    } else {
        return message.reply(`${inlineCode("❌")} Use gleaderboard ${inlineCode("gold")} or ${inlineCode("xp")}!`)
    }
};

module.exports.info = {
    names: ['leadboard', 'lb'],
};
