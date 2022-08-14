const Discord = require('discord.js');
const EMOJICONFIG = require('../config/emoji.json');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userInput = message.mentions.users.first();
    var item = args[1]
    var amount = args[2]

    if(user.id == '564050802566627358' || user.id == '369531783471038474' || user.id == '217025723573993474'){

        if(userInput == undefined || userInput == ' ' || userInput == '') return message.reply(`${inlineCode('❌')} bad command : ${inlineCode('rgive <@user> <item> <amount>')}`);
        if(isNaN(amount) == false || amount >= 0){

            let balance = await BALANCEDATA.findOne({ userId: userInput.id });
            if (!balance) return message.reply(`${inlineCode('😶‍🌫️')} ${userInput} is not a player...`);
            else {

                if(item == 'coin' || item == 'coins' || item == 'Coins' || item == 'Coin' || item == 'money'){
                    // == Give Coins ==
                    balance.eco.coins += parseInt(amount);
                    balance.save();
                    return message.reply(`${inlineCode("✅")} you give ${inlineCode(amount)} ${EMOJICONFIG.coin} to ${userInput}`);

                } else if (item == 'xp' || item == 'level' || item == 'experience' || item == 'XP' || item == 'Xp'){
                    // == Give XP ==
                    balance.eco.xp += parseInt(amount);
                    balance.save();
                    return message.reply(`${inlineCode("✅")} you give ${inlineCode(amount)} ${EMOJICONFIG.xp} to ${userInput}`);
                
                } else return message.reply(`${inlineCode("🥱")} This item does not exist or is not recognized... : ${inlineCode('rgive <@user> <item> <amount>')}`);
            };
        } else return message.reply(`${inlineCode("😶‍🌫️")} please use a correct amount : ${inlineCode('rgive <@user> <item> <amount>')}`);
    } else return message.reply(`${inlineCode("🥱")} you are not administrator to execute this command...`);
};

module.exports.info = {
  names: ['give', 'donate', 'g', 'Give'],
};
