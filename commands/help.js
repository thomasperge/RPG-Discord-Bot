const Discord = require('discord.js');
const CONFIG = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author

    var itemEmbed = new Discord.MessageEmbed()
        .setColor('#cda744')
        .setTitle(`📦 Rpg Help - RPGBot`)
        .addFields(
          { name: '👤 Profile(s)', value: `${inlineCode("rstart")}\n ${inlineCode("rprofile")}\n ${inlineCode("rbalance")}\n ${inlineCode("ritem")}\n ${inlineCode("rupgradelevel")}\n ${inlineCode("rleaderboard")}\n ${inlineCode("rslot")}`, inline: true }, 
          { name: '⚔️ Fighting(s)', value: `${inlineCode("rmonster")}\n ${inlineCode("rboss")}\n ${inlineCode("rbossattack")}\n ${inlineCode("rallboss")}\n ${inlineCode("rduel <@user>")}\n ${inlineCode("rfight <@user>")}\n ${inlineCode("rspar")}`,  inline: true }, 
          { name: '🛖 Squad(s)', value: `${inlineCode("rsquad")}\n ${inlineCode("rcreatesquad")}\n ${inlineCode("rsquadjoin")}\n ${inlineCode("rsquadleave")}\n ${inlineCode("rsquadreward / rbonus")}\n ${inlineCode("rsquadgive")}\n ${inlineCode("rsquadattack")}\n ${inlineCode("rsquadban")}\n ${inlineCode("rupgradesquadboss / rusb")}`, inline: true },
          { name: '🎪 Squad Tournament(s)', value: `${inlineCode("rsquadTournament")}\n ${inlineCode("rcreateTournament")}\n ${inlineCode("rjoinsquadtournament")}\n ${inlineCode("rstarttournament")}`, inline: true },
          { name: '🏹 Item(s)', value: `${inlineCode("ritem")}\n ${inlineCode("rallitem")}\n ${inlineCode("rbuyitem")}\n ${inlineCode("rsellitem")}\n ${inlineCode("rslot")}\n ${inlineCode("requip")}\n ${inlineCode("runequip")}\n ${inlineCode("rupgradeitem")}\n ${inlineCode("rbuybox")}\n ${inlineCode("ropenbox")}`, inline: true },
          { name: '📦 Other(s)', value: `${inlineCode("rhelp")}\n ${inlineCode("rjungling")}\n ${inlineCode("rping")}\n ${inlineCode("rconvert")}\n ${inlineCode("rdm")}\n ${inlineCode("rgive <@user> <item> <amout>")}`, inline: true },
        )
        .setTimestamp();
      message.reply({embeds: [itemEmbed], ephemeral: true });
};

module.exports.info = {
    names: ['help'],
};
