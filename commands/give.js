const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userInput = message.mentions.users.first();
    var item = args[1]
    var amout = args[2]

    console.log(item, amout)

    if(userInput == undefined || userInput == ' ' || userInput == '') return message.reply(`${inlineCode('❌')} bad command : ${inlineCode('ggive <@user> <item> <amout>')}`);
    if(isNaN(amout) == false || amout >= 0){

        let balance = await BALANCEDATA.findOne({ userId: userInput.id });
        if (!balance) return message.reply(`${inlineCode('😶‍🌫️')} ${userInput} are not a player... ! `);
        else {

            console.log(user.id)

            if(user.id == '564050802566627358' || user.id == '369531783471038474'){
                if(item == 'coin' || item == 'coins' || item == 'Coins' || item == 'Coin' || item == 'money'){
                    // == Give Coins ==
                    balance.eco.coins += amout;
                    balance.save();
                    return message.reply(`${inlineCode("✅")} you give ${inlineCode(amout)} 🪙 to ${userInput}`);

                } else if (item == 'xp' || item == 'level' || item == 'experience' || item == 'XP' || item == 'Xp'){
                    // == Give XP ==
                    balance.eco.xp += amout;
                    balance.save();
                    return message.reply(`${inlineCode("✅")} you give ${inlineCode(amout)} 🏮 to ${userInput}`);
                
                } else return message.reply(`${inlineCode("🥱")} This item does not exist or is not recognized... : ${inlineCode('ggive <@user> <item> <amout>')}`);
            } else return message.reply(`${inlineCode("🥱")} you are not administrator to execute this command...`);
        };
    } else return message.reply(`${inlineCode("😶‍🌫️")} please use a correct amout : ${inlineCode('ggive <@user> <item> <amout>')}`);
};

module.exports.info = {
  names: ['give', 'donate', 'g', 'Give'],
};
