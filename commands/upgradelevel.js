const Discord = require('discord.js');
const config = require('../config.json');
const BALANCEDATA = require('../modules/economie.js');
const STATSDATA = require('../modules/player.js')
const CONFIGLEVEL = require('../config/configLevel.json')

module.exports.run = async (client, message, args) => {
      /**=== Account Economie ===*/
  let balance = await BALANCEDATA.findOne({ userId: message.author.id });
  if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
  else {
    let stats = await STATSDATA.findOne({ userId: message.author.id });
    if (!stats) return message.reply("`❌` you are not player ! : `gstart`");
    else {

        function upgradeLevel(level){
            var i = 0
        }

        if(stats.player.level == 0){
            let priceNextLevel
            upgradeLevel(priceNextLevel)
        }
    }
  }
};

module.exports.info = {
    names: ['upgrade', 'upgradelevel', 'buylevel'],
};
