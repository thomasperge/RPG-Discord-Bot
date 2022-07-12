const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
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

    var user = message.author;

    // == Player Db ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // == Squad Db ==
        let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadname });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
        else {

            // == If user is the leader of the squad ==
            if(playerStats.userId === squad.leader[0]){
                var squadEmbed = new Discord.MessageEmbed()
                    .setColor('#4dca4d')
                    .setAuthor(`🛖 Your Squad (leader)`)
                    .setDescription(`🪵 ${inlineCode(squad.squadName)}'s squad\n🪧 Squad level : ${inlineCode(Math.floor(squad.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(squad.squadbank)} 🪙\n👑 Leader : **You**\n👥 Member(s): ${inlineCode(squad.member.lenght)}\n🗿 Squad Bosses: ${inlineCode("soon")}`)
                    .setFooter('© RPG Bot 2022 | ghelp')
                    .setTimestamp();
                return message.reply({embeds: [squadEmbed]});
            } else {
                // == User is a Member of Squad ==
                var squadEmbed = new Discord.MessageEmbed()
                    .setColor('#4dca4d')
                    .setAuthor(`🛖 Your Squad`)
                    .setDescription(`🪵 ${inlineCode(squad.squadName)}'s squad\n👑 Leader : ${squad.leader[1]}\n🪧 Squad level : ${inlineCode(Math.floor(squad.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(squad.squadbank)} 🪙\n👥 Member(s): ${inlineCode(squad.member.lenght)}\n🗿 Squad Bosses: ${inlineCode("soon")}`)
                    .setFooter('© RPG Bot 2022 | ghelp')
                    .setTimestamp();
                return message.reply({embeds: [squadEmbed]});
            }
        }
    }
}

module.exports.info = {
  names: ['squad', 'mysquad', 'team', 'myteam'],
};
