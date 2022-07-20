const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author


        let playerStats = await PLAYERDATA.findOne({ userId: user.id });
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {


            var itemEmbed = new MessageEmbed()
                .setColor('#9696ab')
                .setTitle(`📦 ${user.username}'s Item(s)`)
                .setTimestamp()

            var numberItem = 1
            for(const allItem of playerStats.player.stuff.stuffUnlock){
                console.log(allItem.name)
                itemEmbed.addField(`Item ${numberItem} :`,`${allItem.name}`)
                numberItem += 1
            };

            message.reply({ embeds: [itemEmbed] })

    };
};

module.exports.info = {
    names: ['allitem', 'item', 'allobject', 'object'],
};
