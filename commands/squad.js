const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const EMOJICONFIG = require('../config/emoji.json');
const SQUADDATA = require('../modules/squad.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { numStr } = require('../functionNumber/functionNbr.js')

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    var squadMention = args[0]

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
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        // == Squad Db ==
        let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} you have not joined any squad yet...`)
        else {

            // == Squad Player ==
            if(squadMention == '' || squadMention == ' ' || squadMention == undefined){
                // === If user is the leader of the squad ===
                if(playerStats.userId === squad.leader[0]){

                    // === If user is the leader of the squad ===
                    if(playerStats.userId === squad.leader[0]){
                        var memberLenght
                        if(squad.member.length == undefined) memberLenght = 0
                        else memberLenght = squad.member.length

                        // == Display All Members ==
                        var allmember = ``
                        for(const allPlayerInSquad of squad.member){
                            allmember += `${inlineCode(allPlayerInSquad.pseudo)}, `
                        }

                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#6d4534')
                            .setTitle(`🛖 Your Squad (leader)`)
                            .setDescription(`🪵 ${inlineCode(squad.squadName + "'s")} squad\n👑 Leader : **You**\n🪧 Squad level : ${inlineCode(Math.floor(squad.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(numStr(squad.squadbank))} ${inlineCode(`${EMOJICONFIG.coin}`)}\n👥 Number of Members(s): ${inlineCode(memberLenght)}\n👥 Member(s) : ${allmember}\n🗿 Squad Bosses: 💥: ${inlineCode(squad.squadboss.bossattack)} **/** ❤️: ${inlineCode(squad.squadboss.bosshealth)} **/** 🛡️: ${inlineCode(squad.squadboss.bossdefense)}`)
                            .setTimestamp();
                        return message.reply({embeds: [squadEmbed]});
                    }
                } else {
                    // === User is a Member of Squad ===
                    var memberLenght
                    if(squad.member.length == undefined) memberLenght = 0
                    else memberLenght = squad.member.length

                    var squadEmbed = new Discord.MessageEmbed()
                        .setColor('#6d4534')
                        .setTitle(`🛖 Your Squad`)
                        .setDescription(`🪵 ${inlineCode(squad.squadName + "'s")} squad\n👑 Leader : ${squad.leader[1]}\n🪧 Squad level : ${inlineCode(Math.floor(squad.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(numStr(squad.squadbank))} ${inlineCode(`${EMOJICONFIG.coin}`)}\n👥 Member(s): ${inlineCode(memberLenght)}\n🗿 Squad Bosses: 💥: ${inlineCode(squad.squadboss.bossattack)} **/** ❤️: ${inlineCode(squad.squadboss.bosshealth)} **/** 🛡️: ${inlineCode(squad.squadboss.bossdefense)}`)
                        .setTimestamp();
                    return message.reply({embeds: [squadEmbed]});
                };
            } else {
                // == Squad Db ==
                let squadMentionned = await SQUADDATA.findOne({ squadName: squadMention });
                if (!squadMentionned) return message.reply(`${inlineCode("😵‍💫")} This squad does not exist...`)
                else {
                    // === If user is the leader of the squad ===
                    if(playerStats.userId === squadMentionned.leader[0]){

                        var memberLenght
                        if(squadMentionned.member.length == undefined) memberLenght = 0
                        else memberLenght = squadMentionned.member.length

                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#6d4534')
                            .setTitle(`🛖 Your Squad (leader)`)
                            .setDescription(`🪵 ${inlineCode(squadMentionned.squadName + "'s")} squad\n👑 Leader : **You**\n🪧 Squad level : ${inlineCode(Math.floor(squadMentionned.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(numStr(squadMentionned.squadbank))} ${inlineCode(`${EMOJICONFIG.coin}`)}\n👥 Member(s): ${inlineCode(`${memberLenght}/20`)}\n🗿 Squad Bosses: 💥: ${inlineCode(squadMentionned.squadboss.bossattack)} **/** ❤️: ${inlineCode(squadMentionned.squadboss.bosshealth)} **/** 🛡️: ${inlineCode(squadMentionned.squadboss.bossdefense)}`)
                            .setTimestamp();
                        return message.reply({embeds: [squadEmbed]});
                    } else {
                    // === User is a Member of Squad ===
                        var memberLenght
                        if(squadMentionned.member.length == undefined) memberLenght = 0
                        else memberLenght = squadMentionned.member.length

                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#6d4534')
                            .setTitle(`🛖 ${squadMentionned.squadName} Squad`)
                            .setDescription(`🪵 ${inlineCode(squadMentionned.squadName + "'s")} squad\n👑 Leader : ${squadMentionned.leader[1]}\n🪧 Squad level : ${inlineCode(Math.floor(squadMentionned.squadXp / 1000))}\n📰 Squad Bank : ${inlineCode(numStr(squadMentionned.squadbank))} ${inlineCode(`${EMOJICONFIG.coin}`)}\n👥 Member(s): ${inlineCode(`${memberLenght}/20`)}\n🗿 Squad Bosses: 💥: ${inlineCode(squadMentionned.squadboss.bossattack)} **/** ❤️: ${inlineCode(squadMentionned.squadboss.bosshealth)} **/** 🛡️: ${inlineCode(squadMentionned.squadboss.bossdefense)}`)
                            .setTimestamp();
                        return message.reply({embeds: [squadEmbed]});
                    };
                };
            };
        };
    };
};

module.exports.info = {
  names: ['squad', 'mysquad', 'team', 'myteam', 'squd', 'squads'],
};
