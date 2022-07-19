const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        function slotDisplay(slotID){
            if(slotID == -1) return 'no item'
            else {
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    if(slotID == CONFIGITEM[pas].id) return CONFIGITEM[pas].name
                }
                return 'no item'
            };
        };

        const slotEmbed = new MessageEmbed()
            .setColor('#4dca4d')
            .setAuthor(`🪧 ${user.username}'s item slot`)
            .setDescription(`📦 Slot 1: ${inlineCode(slotDisplay(playerStats.player.slotItem.slot1))}\n📦 Slot 2: ${inlineCode(slotDisplay(playerStats.player.slotItem.slot2))}\n📦 Slot 3: ${inlineCode(slotDisplay(playerStats.player.slotItem.slot3))}\n📦 Slot 4: ${inlineCode(slotDisplay(playerStats.player.slotItem.slot4))}\n📦 Slot 5: ${inlineCode(slotDisplay(playerStats.player.slotItem.slot5))}\n`)
            .setTimestamp();
        message.reply({embeds: [slotEmbed] });

    };
};

module.exports.info = {
    names: ['slot', 'slotitem', 'object', 'armor', 'helmet', 'boots', 'pants', 'weapon'],
};
