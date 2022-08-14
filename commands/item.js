const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const CONFIGITEM = require('../config/stuff.json')
const { numStr } = require('../functionNumber/functionNbr.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 3s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
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
