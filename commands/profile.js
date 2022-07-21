const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
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
  var userInput = message.mentions.users.first();

  if(userInput == ' ' || userInput == '' || userInput == undefined){
    /**=== Account Stats Mine ===*/
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

      /**=== Account Economie Mine ===*/
      let balance = await BALANCEDATA.findOne({ userId: user.id });
      if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
      else {

        function main() {
          var squad
          if(playerStats.player.other.squadName == 'undefined') squad = 'No Squad'
          else squad = playerStats.player.other.squadName

          var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setTitle(`${user.username}'s Stats`)
            .addFields(
              { name: '**📊 Info :**\n', value: `:pencil: ${inlineCode('Level')}: ${playerStats.player.level}`, inline: true },
              { name: '**🏦 Balance :**\n', value: `🪙: ${balance.eco.coins}\n🏮: ${balance.eco.xp}`, inline: true },
              { name: '**🛖 Squad :**\n', value: `🪧: ${squad}`, inline: true },
              { name: '**📈 Stats :**\n', value: `:fire: ${inlineCode('Attack')}: ${playerStats.player.attack}\n:shield: ${inlineCode('Defense')}: ${playerStats.player.defense}\n:heart: ${inlineCode('Health')}: ${playerStats.player.health}\n:dash: ${inlineCode('Dodge')}: ${playerStats.player.dodge}%\n🏑 ${inlineCode('Penetration')}: ${playerStats.player.penetration}%\n:boom: ${inlineCode('Critick')}: ${playerStats.player.crit}%\n:heart_on_fire: ${inlineCode('Life Steal')}: ${playerStats.player.lifeSteal}`, inline: false },
              { name: '**📰 Others :**\n', value: `📜 ${inlineCode('Battle Diary')} : ${playerStats.player.other.dm}\n☠️ ${inlineCode("Monster killed")} : ${playerStats.player.other.monsterKill}`, inline: true },
            )
            .setTimestamp();
          message.channel.send({embeds: [statsEmbed]});
        }

        main()

      }
    }
  } else {
    /**=== Account Stats Other ===*/
    let playerStats2 = await PLAYERDATA.findOne({ userId: userInput.id });
    if (!playerStats2) return message.reply(`${inlineCode('❌')} this user are not player ! : ${inlineCode('gstart')}`);
    else {

      /**=== Account Economie Other ===*/
      let balance2 = await BALANCEDATA.findOne({ userId: userInput.id });
      if (!balance2) return message.reply(`${inlineCode('❌')} this user are not player ! : ${inlineCode('gstart')}`);
      else {

        function main2() {
          var squad
          if(playerStats2.player.other.squadName == 'undefined') squad = 'No Squad'
          else squad = playerStats2.player.other.squadName

          var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setTitle(`${userInput.username}'s Stats`)
            .addFields(
              { name: '**📊 Info :**\n', value: `:pencil: ${inlineCode('Level')}: ${playerStats2.player.level}`, inline: true },
              { name: '**🏦 Balance :**\n', value: `🪙: ${balance2.eco.coins}\n🏮: ${balance2.eco.xp}`, inline: true },
              { name: '**👥 Squad :**\n', value: `⚒️: ${squad}`, inline: true },
              { name: '**📈 Stats :**\n', value: `:fire: ${inlineCode('Attack')}: ${playerStats2.player.attack}\n:shield: ${inlineCode('Defense')}: ${playerStats2.player.defense}\n:heart: ${inlineCode('Health')}: ${playerStats2.player.health}\n:dash: ${inlineCode('Dodge')}: ${playerStats2.player.dodge}%\n:boom: ${inlineCode('Critick')}: ${playerStats2.player.crit}%\n:heavy_multiplication_x: ${inlineCode('Critick Multplicator')}: ${playerStats2.player.critMultplicator}%\n:heart_on_fire: ${inlineCode('Life Steal')}: ${playerStats2.player.lifeSteal}%\n:fire_extinguisher: ${inlineCode('Aegis')}: ${playerStats2.player.aegis}\n`, inline: false },
              { name: '**📰 Others :**\n', value: `📜 ${inlineCode('Battle Diary')} : ${playerStats2.player.other.dm}`, inline: true },
            )
            .setTimestamp();
          message.channel.send({embeds: [statsEmbed]});
        };
        main2();
      };
    };
  };
};

module.exports.info = {
  names: ['profile', 'statistics', 'user', 'p', 'pro', 'profil'],
};
