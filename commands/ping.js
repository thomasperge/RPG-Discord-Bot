const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');

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

    sortedArray.sort((a, b) => a.value + b.value);

    var leadboardEmbed = new Discord.MessageEmbed()
        .setColor('#4dca4d')
        .setAuthor(`${client.users.cache.get(user.id).username}'s LeadBoarrd (Xp)`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
        .addFields(
          { name: '**🥇 Top 1 :**\n', value: `${"`Pseudo`"}: ${sortedArray[0].name} / Xp: ${sortedArray[0].xp}`, inline: false },
          { name: '**🥈 Top 2 :**\n', value: `${"`Pseudo`"}: ${sortedArray[1].name} / Xp: ${sortedArray[1].xp}`, inline: false },
          { name: '**🥉 Top 3 :**\n', value: `${"`Pseudo`"}: ${sortedArray[2].name} / Xp: ${sortedArray[2].xp}`, inline: false },
          { name: '**🎟️ Top 4 :**\n', value: `${"`Pseudo`"}: ${sortedArray[3].name} / Xp: ${sortedArray[3].xp}`, inline: false },
          { name: '**🎟️ Top 5 :**\n', value: `${"`Pseudo`"}: ${sortedArray[4].name} / Xp: ${sortedArray[4].xp}`, inline: false },
          { name: '**🎟️ Top 6 :**\n', value: `${"`Pseudo`"}: ${sortedArray[5].name} / Xp: ${sortedArray[5].xp}`, inline: false },
          { name: '**🎟️ Top 7 :**\n', value: `${"`Pseudo`"}: ${sortedArray[6].name} / Xp: ${sortedArray[6].xp}`, inline: false },
          { name: '**🎟️ Top 8 :**\n', value: `${"`Pseudo`"}: ${sortedArray[7].name} / Xp: ${sortedArray[7].xp}`, inline: false },
          { name: '**🎟️ Top 9 :**\n', value: `${"`Pseudo`"}: ${sortedArray[8].name} / Xp: ${sortedArray[8].xp}`, inline: false },
          { name: '**🎟️ Top 10 :**\n', value: `${"`Pseudo`"}: ${sortedArray[9].name} / Xp: ${sortedArray[9].xp}`, inline: false },
        )
        .setFooter('© RPG Bot 2022 | ghelp')
        .setTimestamp();
      message.channel.send(leadboardEmbed);
};

module.exports.info = {
    names: ['ping'],
};
