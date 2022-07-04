const Discord = require('discord.js');
const config = require('../config.json');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
  var user = message.author;

  /**=== Account Stats ===*/
  let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
  if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
  else {
    if(playerStats.player.other.dm == false){
        playerStats.player.other.dm = true
        playerStats.save()
        return message.reply('`✅` Battle diary activate in your DM')
    } else {
        playerStats.player.other.dm = false
        playerStats.save()
        return message.reply('`❌` Battle diary not activate in your DM')
    }
  }
};

module.exports.info = {
    names: ['ping'],
};
