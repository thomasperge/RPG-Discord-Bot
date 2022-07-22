const Discord = require('discord.js');
const CONFIG = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author

    var itemEmbed = new Discord.MessageEmbed()
        .setColor('#4dca4d')
        .setTitle(`📦 All Item`)
        .addFields(
          { name: '👤 Profile(s)', value: `${inlineCode("rstart")}\n ${inlineCode("rprofile")}\n ${inlineCode("rbalance")}\n ${inlineCode("ritem")}\n ${inlineCode("rupgradelevel")}\n ${inlineCode("rleaderboard")}\n ${inlineCode("rslot")}`, inline: true }, 
          { name: '⚔️ Fighting(s)', value: `${inlineCode("rmonster")}\n ${inlineCode("rboss")}\n ${inlineCode("rbossattack")}\n ${inlineCode("rallboss")}\n ${inlineCode("rduel <@user>")}\n ${inlineCode("rspar")}`,  inline: true }, 
          { name: '🛖 Squad(s)', value: `${inlineCode("rsquad")}\n ${inlineCode("rsquadjoin")}\n ${inlineCode("rsquadleave")}\n ${inlineCode("rsquadreward / rbonus")}\n ${inlineCode("rsquadgive")}\n ${inlineCode("rsquadattack")}\n ${inlineCode("rsquadban")}\n ${inlineCode("rupgradesquadboss / rusb")}`, inline: true },
          { name: '🏹 Item(s)', value: `${inlineCode("ritem")}\n ${inlineCode("rallitem")}\n ${inlineCode("rbuyitem")}\n ${inlineCode("rsellitem")}\n ${inlineCode("rslot")}\n ${inlineCode("requip")}\n ${inlineCode("runequip")}\n ${inlineCode("rupgradeitem")}`, inline: true },
          { name: '📦 Other(s)', value: `${inlineCode("rhelp")}\n ${inlineCode("rping")}\n ${inlineCode("rconvert")}\n ${inlineCode("rdm")}`, inline: true },
        )
        .setTimestamp();
      message.reply({embeds: [itemEmbed], ephemeral: true });
};

module.exports.info = {
    names: ['help'],
};
