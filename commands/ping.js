const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;

    let balance = await BALANCEDATA.findOne({ userId: user.id });
    if(!balance) return -1;


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
        .setAuthor(`${client.users.cache.get(user.id).username}'s LeadBoarrd (Xp)`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
        .setDescription(`**🥇 #1 ** ${sortedArray[0].name}: ${inlineCode(sortedArray[0].xp)}\n**🥈 #2 **${sortedArray[1].name}: ${inlineCode(sortedArray[1].xp)}\n**🥉 #3 **${sortedArray[2].name}: ${inlineCode(sortedArray[2].xp)}\n**🎟️ #4 **${sortedArray[3].name}: ${inlineCode(sortedArray[3].xp)}\n**🎟️ #5 **${sortedArray[4].name}: ${inlineCode(sortedArray[4].xp)}\n**🎟️ #6 **${sortedArray[5].name}: ${inlineCode(sortedArray[5].xp)}\n**🎟️ #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**🎟️ #7 **${sortedArray[6].name}: ${inlineCode(sortedArray[6].xp)}\n**🎟️ #8 **${sortedArray[7].name}: ${inlineCode(sortedArray[7].xp)}\n**🎟️ #9 **${sortedArray[8].name}: ${inlineCode(sortedArray[8].xp)}\n`)
        .setFooter('© RPG Bot 2022 | ghelp')
        .setTimestamp();
      message.channel.send({embeds: [leadboardEmbed]});
};

module.exports.info = {
    names: ['ping'],
};
