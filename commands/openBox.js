const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js')
const EMOJICONFIG = require('../config/emoji.json');
const CONFIGITEM = require('../config/stuff.json')
const BALANCEDATA = require('../modules/economie.js')
const STATS = require('../modules/statsBot.js')
const { numStr } = require('../functionNumber/functionNbr.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { inlineCode } = require('@discordjs/builders')

// Config Cooldown :
const shuffleTime = 4000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 5s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author
    let stats = await STATS.findOne({ botID: 899 });

    /**=== Account Stats Mine ===*/
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {
            // Ouvrir une Box : 
            if(playerStats.player.other.box >= 1){

                function randomitem(){
                    var randomItem = Math.floor(Math.random() * 25);

                    for(let pas = 0; pas < CONFIGITEM.length; pas++){
                        for(const id of CONFIGITEM[pas].id){
                            if(id == randomItem){
                                for(const allitemPlayer of playerStats.player.stuff.stuffUnlock) if(allitemPlayer.id == id) return `📦 **NEW ITEM** : **${inlineCode(CONFIGITEM[pas].name)}** (You already have this item in your inventory)`
                                playerStats.player.stuff.stuffUnlock.push({id: randomItem, name: CONFIGITEM[pas].name, level: 1})
                                playerStats.save()
                                return `📦 **NEW ITEM** : **${inlineCode(CONFIGITEM[pas].name)}**`
                            }
                        };
                    };
                };

                var itemEmbed = new MessageEmbed()
                    .setColor('#6d4534')
                    .setTitle(`📦 ${user.username}'s New Item(s)`)
                    .setDescription(`✅ **Box open!**\n${randomitem()}\n🪧 Don't forget to equip yourself with : ${inlineCode(`requip ${item} <1/2/3/4/5>`)}\n🏹 To see your items equip : ${inlineCode("rslot")}`)
                    .setTimestamp()
                return message.reply({ embeds: [itemEmbed]})
            } else return message.reply(`${inlineCode('❌')} You don't have a box to open`)
        };
    };
};

module.exports.info = {
    names: ['ob', 'openbox', 'boxopen', 'lootbox', 'open'],
};
