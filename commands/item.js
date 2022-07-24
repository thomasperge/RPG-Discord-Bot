const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const CONFIGITEM = require('../config/stuff.json')
const { numStr } = require('../functionNumber/functionNbr.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author


        let playerStats = await PLAYERDATA.findOne({ userId: user.id });
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            var allITemEmbed = ``
            var numberItem = 1
            var totalvalue = 0

            for(const allItem of playerStats.player.stuff.stuffUnlock){
                for(const itemConfig of CONFIGITEM){
                    if(itemConfig.name == allItem.name) totalvalue += itemConfig.cost * allItem.level
                }
                allITemEmbed += `**#${numberItem}** **${inlineCode(allItem.name)}** ${inlineCode("lvl: " + allItem.level)}\n`
                numberItem += 1
            };

            var itemEmbed = new MessageEmbed()
            .setColor('#9696ab')
            .setTitle(`📦 ${user.username}'s Item(s)`)
            .setDescription(`🪖 Number of items : ${inlineCode(playerStats.player.stuff.stuffUnlock.length)}\n💰 Total value : ${inlineCode(numStr(totalvalue))} ${inlineCode("🪙")}\n${allITemEmbed}`)
            .setTimestamp()

            message.reply({ embeds: [itemEmbed] });
    };
};

module.exports.info = {
    names: ['item', 'allobject', 'object'],
};
