const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const EMOJICONFIG = require('../config/emoji.json');
const SQUADDATA = require('../modules/squad.js')
const BALANCEDATA = require('../modules/economie.js');
const { numStr } = require('../functionNumber/functionNbr.js')
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
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

      /**=== Account Economie Mine ===*/
      let balance = await BALANCEDATA.findOne({ userId: user.id });
      if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
      else {

        async function returnSquadGrad(squadName){
          let squad = await SQUADDATA.findOne({ squadName: squadName });
          if(squad.leader[0] == user.id) return `${squadName} (leader)`
          else return `${squadName} (member)`
        };

        var squad
        if(playerStats.player.other.squadName == 'undefined'){
          squad = 'No Squad'
        } else squad = returnSquadGrad(playerStats.player.other.squadName)

        var statsEmbed = new Discord.MessageEmbed()
          .setColor('#fc9803')
          .setTitle(`${user.username}'s Stats`)
          .addFields(
            { name: '**📊 Info :**\n', value: `📝 Level: ${inlineCode(playerStats.player.level)}\n✨ ELO : ${inlineCode(playerStats.player.elo)}`, inline: true },
            { name: '**🏦 Balance :**\n', value: `${EMOJICONFIG.coin}: ${inlineCode(numStr(balance.eco.coins))}\n${EMOJICONFIG.xp}: ${inlineCode(numStr(balance.eco.xp))}`, inline: true },
            { name: '**🛖 Squad :**\n', value: `🪧: ${inlineCode(squad)}`, inline: true },
            { name: '**📈 Stats :**\n', value: `🔥 Attack: ${inlineCode(playerStats.player.attack)}\n🛡️ Defense: ${inlineCode(playerStats.player.defense)}\n❤️ Health: ${inlineCode(playerStats.player.health)}\n💨 Critical Chance: ${inlineCode(playerStats.player.dodge + '%')}\n🏑 Penetration: ${inlineCode(playerStats.player.penetration + '%')}\n💥 Critical Multiplier: ${inlineCode(playerStats.player.crit + '%')}\n❤️‍🔥 Life Steal: ${inlineCode(playerStats.player.lifeSteal)}`, inline: true },
            { name: '**📰 Others :**\n', value: `📜 Battle Diary: ${inlineCode(playerStats.player.other.dm)}\n☠️ Monster killed: ${inlineCode(playerStats.player.other.monsterKill)}\n📦 Box : ${inlineCode(playerStats.player.other.box)}`, inline: true },
          )
          .setTimestamp();
        message.channel.send({embeds: [statsEmbed]});


      }
    }
  } else {
    /**=== Account Stats Other ===*/
    let playerStats2 = await PLAYERDATA.findOne({ userId: userInput.id });
    if (!playerStats2) return message.reply(`${inlineCode('❌')} this user are not player !`);
    else {

      /**=== Account Economie Other ===*/
      let balance2 = await BALANCEDATA.findOne({ userId: userInput.id });
      if (!balance2) return message.reply(`${inlineCode('❌')} this user are not player !`);
      else {

        function main2() {
          var squad
          if(playerStats2.player.other.squadName == 'undefined') squad = 'No Squad'
          else squad = playerStats2.player.other.squadName

          var statsEmbed = new Discord.MessageEmbed()
            .setColor('#fc9803')
            .setTitle(`${userInput.username}'s Stats`)
            .addFields(
              { name: '**📊 Info :**\n', value: `📝 Level: ${inlineCode(playerStats2.player.level)}\n✨ ELO : ${inlineCode(playerStats2.player.elo)}`, inline: true },
              { name: '**🏦 Balance :**\n', value: `${EMOJICONFIG.coin}: ${inlineCode(numStr(balance.eco.coins))}\n${EMOJICONFIG.xp}: ${inlineCode(numStr(balance.eco.xp))}`, inline: true },
              { name: '**🛖 Squad :**\n', value: `🪧: ${inlineCode(squad)}`, inline: true },
              { name: '**📈 Stats :**\n', value: `🔥 Attack: ${inlineCode(playerStats2.player.attack)}\n🛡️ Defense: ${inlineCode(playerStats2.player.defense)}\n❤️ Health: ${inlineCode(playerStats2.player.health)}\n💨 Critical Chance: ${inlineCode(playerStats2.player.dodge + '%')}\n🏑 Penetration: ${inlineCode(playerStats2.player.penetration + '%')}\n💥 Critical Multiplier: ${inlineCode(playerStats2.player.crit + '%')}\n❤️‍🔥 Life Steal: ${inlineCode(playerStats2.player.lifeSteal)}`, inline: true },
              { name: '**📰 Others :**\n', value: `📜 Battle Diary: ${inlineCode(playerStats2.player.other.dm)}\n☠️ Monster killed: ${inlineCode(playerStats2.player.other.monsterKill)}\n📦 Box : ${inlineCode(playerStats.player.other.box)}`, inline: true },
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
  names: ['profile', 'user', 'p', 'pro', 'profil'],
};
