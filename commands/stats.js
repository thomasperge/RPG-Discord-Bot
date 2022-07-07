const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');

module.exports.run = async (client, message, args) => {
  var user = message.author;
  var userInput = message.mentions.users.first();

  if(userInput == ' ' || userInput == '' || userInput == undefined){
    /**=== Account Stats Mine ===*/
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {

      /**=== Account Economie Mine ===*/
      let balance = await BALANCEDATA.findOne({ userId: user.id });
      if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
      else {

        function main() {
          var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setAuthor(`${user.username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
            .addFields(
              { name: '**📊 Info :**\n', value: `:pencil: ${"`Level`"}: ${playerStats.player.level}`, inline: true },
              { name: '**🏦 Balance :**\n', value: `🪙: ${balance.eco.coins}\n🏮: ${balance.eco.xp}`, inline: true },
              { name: '**👥 Squad :**\n', value: `⚒️: ${'soon'}`, inline: false },
              { name: '**📈 Stats :**\n', value: `:fire: ${"`Attack`"}: ${playerStats.player.attack}\n:shield: ${"`Defense`"}: ${playerStats.player.defense}\n:heart: ${"`Health`"}: ${playerStats.player.health}\n:dash: ${"`Dodge`"}: ${playerStats.player.dodge}%\n:boom: ${"`Critick`"}: ${playerStats.player.crit}%\n:heavy_multiplication_x: ${"`Critick Multplicator`"}: ${playerStats.player.critMultplicator}%\n:comet: ${"`Attack Speed`"}: ${playerStats.player.attackSpeed}%\n:heart_on_fire: ${"`Life Steal`"}: ${playerStats.player.lifeSteal}%\n:wind_chime: ${"`Execute`"}: ${playerStats.player.execute}\n:fire_extinguisher: ${"`Aegis`"}: ${playerStats.player.aegis}\n:firecracker: ${"`Vengance`"}: ${playerStats.player.vengeance}\n`, inline: false },
              { name: '**⚔️ Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: ${playerStats.player.ultimate.reflect}%\n:mending_heart: ${"`Heal`"}: ${playerStats.player.ultimate.heal}%\n:four_leaf_clover: ${"`Lucky Strike`"}: ${playerStats.player.ultimate.luckyStrike}%\n`, inline: true },
              { name: '**📰 Others :**\n', value: `📜 ${"`Battle Diary`"} : ${playerStats.player.other.dm}`, inline: true },
            )
            .setFooter('© RPG Bot 022 | ghelp')
            .setTimestamp();
          message.channel.send(statsEmbed);
        }

        main()

      }
    }
  } else {
    /**=== Account Stats Other ===*/
    let playerStats2 = await PLAYERDATA.findOne({ userId: userInput.id });
    if (!playerStats2) return message.reply("`❌` you are not player ! : `gstart`");
    else {

      /**=== Account Economie Other ===*/
      let balance2 = await BALANCEDATA.findOne({ userId: userInput.id });
      if (!balance2) return message.reply("`❌` you are not player ! : `gstart`");
      else {

        function main2() {
          var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setAuthor(`${userInput.username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
            .addFields(
              { name: '**📊 Info :**\n', value: `:pencil: ${"`Level`"}: ${playerStats2.player.level}`, inline: true },
              { name: '**🏦 Balance :**\n', value: `🪙: ${balance2.eco.coins}\n🏮: ${balance2.eco.xp}`, inline: true },
              { name: '**👥 Squad :**\n', value: `⚒️: ${'soon'}`, inline: false },
              { name: '**📈 Stats :**\n', value: `:fire: ${"`Attack`"}: ${playerStats2.player.attack}\n:shield: ${"`Defense`"}: ${playerStats2.player.defense}\n:heart: ${"`Health`"}: ${playerStats2.player.health}\n:dash: ${"`Dodge`"}: ${playerStats2.player.dodge}%\n:boom: ${"`Critick`"}: ${playerStats2.player.crit}%\n:heavy_multiplication_x: ${"`Critick Multplicator`"}: ${playerStats2.player.critMultplicator}%\n:comet: ${"`Attack Speed`"}: ${playerStats2.player.attackSpeed}%\n:heart_on_fire: ${"`Life Steal`"}: ${playerStats2.player.lifeSteal}%\n:wind_chime: ${"`Execute`"}: ${playerStats2.player.execute}\n:fire_extinguisher: ${"`Aegis`"}: ${playerStats2.player.aegis}\n:firecracker: ${"`Vengance`"}: ${playerStats2.player.vengeance}\n`, inline: false },
              { name: '**⚔️ Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: ${playerStats2.player.ultimate.reflect}%\n:mending_heart: ${"`Heal`"}: ${playerStats2.player.ultimate.heal}%\n:four_leaf_clover: ${"`Lucky Strike`"}: ${playerStats2.player.ultimate.luckyStrike}%\n`, inline: true },
              { name: '**📰 Others :**\n', value: `📜 ${"`Battle Diary`"} : ${playerStats2.player.other.dm}`, inline: true },
            )
            .setFooter('© RPG Bot 2022 | ghelp')
            .setTimestamp();
          message.channel.send(statsEmbed);
        }

        main2()

      }
    }
  }

}

module.exports.info = {
  names: ['profile', 'statistics', 'stats'],
};
