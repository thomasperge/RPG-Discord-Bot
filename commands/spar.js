const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 5000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userInput = message.mentions.users.first();

    if (userInput === ' ' || userInput === '') return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("gduel <@user>")}`);
    if (user === userInput) return message.reply(`${inlineCode('❌')} it's not good to want to cheat...`);


    // === Try if player are real ===
    function userReal(userInput){
        try {
            var test = userInput.id
            return true
        } catch {
            return false
        }
    };


    // === Player 1 : DataBase ===
    let playerOne = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerOne) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // === Player 2 : DataBase ===
        let playerTwo = await PLAYERDATA.findOne({ userId: userInput.id });
        if (!playerTwo) return message.reply(`${inlineCode('❌')} player 2 are not a player : ${inlineCode('gstart')}`);
        else {


            if(userReal(userInput)){


                var totalStatsP1 = playerOne.player.attack + playerOne.player.health + playerOne.player.defense
                var totalStatsP2 = playerTwo.player.attack + playerTwo.player.health + playerTwo.player.defense
                var totalStats = totalStatsP1 + totalStatsP2

                var percentageWin = (100 * totalStatsP1) / totalStats

                var percentageWin = new Discord.MessageEmbed()
                    .setColor('#1fa5ed')
                    .setAuthor(`🧮 ${user.username}'s Win %`)
                    .setDescription(`📰 ${inlineCode(user.username)} vs ${inlineCode(playerTwo.pseudo)}\n`)
                    .addFields(
                        {name: `🪧 Your Stats:`, value:`${inlineCode("💥")}: ${playerOne.player.attack}\n${inlineCode("🛡️")}: ${playerOne.player.defense}\n${inlineCode("❤️")}: ${playerOne.player.health}`, inline: true},
                        {name: `🪧 ${playerTwo.pseudo} Stats:`, value:`${inlineCode("💥")}: ${playerTwo.player.attack}\n${inlineCode("🛡️")}: ${playerTwo.player.defense}\n${inlineCode("❤️")}: ${playerTwo.player.health}`, inline: true},
                        {name: `📭 Result :`, value:`🍀 Your percentage chance of winning is : **${Math.floor(percentageWin)}%**`, inline: false},
                    )
                    .setFooter('© RPG Bot 2022 | ghelp')
                    .setTimestamp();
                return message.channel.send({embeds: [percentageWin]});

            } else return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("gduel <@user>")}`);
            
        };
    };
};

module.exports.info = {
    names: ['spar'],
};
