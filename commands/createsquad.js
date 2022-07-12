const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 0;
// const shuffleTime = 8.64e7; (= 24h)
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 24h =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;
    var squadName = args[0]

    function playerInSquad(){
        let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
        if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            if(playerStats.player.other.squadName != undefined) return true
        }
        return false
    }

    // == Balance Db ==
    let balance = await BALANCEDATA.findOne({ userId: message.author.id });
    if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
    else {

        if (balance.eco.coins <= 125000) return message.reply(`${inlineCode("😬")} you don't have ${inlineCode('125 000')} 🪙 to create a squad...`)
        else {

            if(squadName === '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquad <squad name>")}`)
            else if(squadName === ' ') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquad <squad name>")}`)
            else if(squadName === undefined) return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquad <squad name>")}`)
            else if(squadName != undefined) {

                if(playerInSquad() == false){
                    var newSquad = new SQUADDATA({
                        squadName : squadName,
                        squadXp: 0,
                        leader: [message.author.id, user.username],
                        member: [message.author.id],
                        squadbank: 0,
                        squadboss: {
                            bossattack: 0,
                            bosshealth: 0
                        }
                    })

                    newSquad.save()

                    var squadEmbed = new Discord.MessageEmbed()
                        .setColor('#4dca4d')
                        .setAuthor(`🛖 New Squad by ${user.username}`)
                        .setDescription(`👊 You created ${inlineCode(squadName)} squad\n📰 Squad Bank : ${inlineCode("0")} 🪙\n👑 Leader : ${user.username}\n👥 Member: ${inlineCode("none")}`)
                        .setFooter('© RPG Bot 2022 | ghelp')
                        .setTimestamp();
                    return message.channel.send({embeds: [squadEmbed]});
                } else return message.reply(`${inlineCode("😵‍💫")} you are already in a squad...`) 
            } 
        }
    }  
}

module.exports.info = {
  names: ['createsquad', 'squadcreate', 'newsquad', 'createteam', 'newteam'],
};
