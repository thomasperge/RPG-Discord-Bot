const Discord = require('discord.js');
const STATS = require('../modules/statsBot.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {

    /**=== Account Economie Mine ===*/
    let stats = await STATS.findOne({ botID: 899 });
    if (!stats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {


        var statsEmbed = new Discord.MessageEmbed()
        .setColor('#fc9803')
        .setTitle(`RPG BOT Stats`)
        .setDescription(`👥 `)
        .setTimestamp();
        message.channel.send({embeds: [statsEmbed]});


    };
};

module.exports.info = {
  names: ['profile', 'statistics', 'user', 'p', 'pro', 'profil'],
};
