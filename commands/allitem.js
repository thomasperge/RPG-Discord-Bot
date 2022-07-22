const Discord = require('discord.js');
const CONFIG = require('../config/stuff.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author

    var itemEmbed = new Discord.MessageEmbed()
        .setColor('#4dca4d')
        .setTitle(`📦 All Item`)
        .addFields(
          { name: '🏹 Weapon(s)', value: `${inlineCode(CONFIG[0].name)}, ${inlineCode(CONFIG[1].name)}, ${inlineCode(CONFIG[2].name)}, ${inlineCode(CONFIG[3].name)}, ${inlineCode(CONFIG[4].name)}, ${inlineCode(CONFIG[9].name)}, ${inlineCode(CONFIG[10].name)}, ${inlineCode(CONFIG[11].name)}, ${inlineCode(CONFIG[14].name)}, ${inlineCode(CONFIG[15].name)}`, inline: true },
          { name: '🦶 Boot(s)', value: `${inlineCode(CONFIG[5].name)}, ${inlineCode(CONFIG[6].name)}, ${inlineCode(CONFIG[7].name)}, ${inlineCode(CONFIG[8].name)}`, inline: true },
          { name: '🪖 Armor(s)', value: `${inlineCode(CONFIG[13].name)}, ${inlineCode(CONFIG[18].name)}, ${inlineCode(CONFIG[19].name)}, ${inlineCode(CONFIG[20].name)}, ${inlineCode(CONFIG[22].name)}, ${inlineCode(CONFIG[23].name)}, ${inlineCode(CONFIG[24].name)}`, inline: true },
          { name: '🔮 Magic Item(s)', value: `${inlineCode(CONFIG[12].name)}, ${inlineCode(CONFIG[16].name)}, ${inlineCode(CONFIG[17].name)}, ${inlineCode(CONFIG[20].name)}, ${inlineCode(CONFIG[21].name)}, ${inlineCode(CONFIG[25].name)}`, inline: true },
        )
        .setTimestamp();
      message.reply({embeds: [itemEmbed], ephemeral: true });
};

module.exports.info = {
    names: ['allitem', 'fullitem', 'aitem'],
};
