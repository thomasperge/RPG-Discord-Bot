const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const { numStr } = require('../functionNumber/functionNbr.js');
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

  /**=== Account Economie ===*/
  let balance = await BALANCEDATA.findOne({ userId: message.author.id });
  if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
  else {

    function main() {
      var balanceEmbed = new Discord.MessageEmbed()
        .setColor('#d1d72c')
        .setTitle(`🏦 ${user.username}'s Bank`)
        .addFields(
          { name: '**📰 Bank Account :**\n', value: `🪙 **Coin** : ${inlineCode(numStr(balance.eco.coins))}\n🏮 **Xp** : ${inlineCode(numStr(balance.eco.xp))}`, inline: true },
        )
        .setTimestamp();
      message.channel.send({embeds: [balanceEmbed]});
    }

    main();
    }
}

module.exports.info = {
  names: ['balance', 'coins', 'money', 'coin' ,'xp', 'exp', 'bank', 'bal', 'wal', 'wallet'],
};
