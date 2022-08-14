const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 5000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
  //  ======= CoolDowns: 5s =======
  if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
    message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
    return;
  }
  cooldownPlayers.set(message.author.id, new Date().getTime());
  // ===============================

  var user = message.author;

  /**=== Account Stats ===*/
  let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
  if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
  else {
    if(playerStats.player.other.dm == false){
        playerStats.player.other.dm = true
        playerStats.save()
        return message.reply(`${inlineCode('✅')} Battle diary activate in your DM`)
    } else {
        playerStats.player.other.dm = false
        playerStats.save()
        return message.reply(`${inlineCode('❌')} Battle diary not activate in your DM`)
    }
  }
};

module.exports.info = {
    names: ['dm'],
};
