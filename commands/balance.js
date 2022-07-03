const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');

module.exports.run = async (client, message, args) => {
  var user = message.author;

  /**=== Account Economie ===*/
  let balance = await BALANCEDATA.findOne({ userId: message.author.id });
  if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
  else {

    function main() {
      /**Command */
      var balanceEmbed = new Discord.MessageEmbed()
        .setColor('#fc9803')
        .setAuthor(`${client.users.cache.get(user.id).username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
        .addFields(
          { name: '**📰 Bank Account :**\n', value: `:coin: ${"`Coin`"}: ${balance.eco.coins}\n:izakaya_lantern:  ${"`Xp`"}: ${balance.eco.xp}`, inline: true },
        )
        .setFooter('© RPG Bot 2022 | ghelp')
        .setTimestamp();
      message.channel.send(balanceEmbed);
    }

    main();
    }
}

module.exports.info = {
  names: ['balance', 'cois', 'money'],
};
