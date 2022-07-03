const Discord = require('discord.js');
const EconomyData = require('../modules/economy.js');
const ConfigEmoji = require('../config/configemoji.json');

module.exports.run = async (client, message, args) => {
  var user = message.author;
  /**Account Economy */
  let economy = await EconomyData.findOne({ userId: message.author.id });
  if (!economy) return message.reply("❌ you don't have an account: `gcreate`");
  else {
    /**Function Number Separate */
    function numStr(a, b) {
      a = '' + a;
      b = b || ' ';
      var c = '',
        d = 0;
      while (a.match(/^0[0-9]/)) {
        a = a.substr(1);
      }
      for (var i = a.length - 1; i >= 0; i--) {
        c = d != 0 && d % 3 == 0 ? a[i] + b + c : a[i] + c;
        d++;
      }
      return c;
    }

    function main() {
      var bankEmbed = new Discord.MessageEmbed()
      bankEmbed.setColor('#00ff26')
      bankEmbed.setAuthor(`${client.users.cache.get(user.id).username}'s Bank`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
      bankEmbed.setDescription(`📦 **Money** : ${numStr(economy.eco.money)}${ConfigEmoji.economyEmoji.coins}\n📦 **Gem** : ${numStr(economy.eco.gem)}${ConfigEmoji.economyEmoji.gem}\n⚖️ Business Value: ${numStr(economy.eco.businessvalue)}$`)
      bankEmbed.setTimestamp();
      return message.channel.send(bankEmbed);
    }
    main();
  }
};

module.exports.info = {
  names: ['bank', 'coins', 'money', 'value', 'argent'],
};
