const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
  var user = message.author;

  /**=== Account Tools ===*/
  let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
  if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
  else {

    function main() {
      /**Command */
      var statsEmbed = new Discord.MessageEmbed()
        .setColor('#fc9803')
        .setAuthor(`${client.users.cache.get(user.id).username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
        // .setDescription(`**Tools**: ${emojiShovel} ${emojiPickaxe}`)
        .addFields(
          { name: '**📊 Info :**\n', value: `:pencil: ${"`Level`"}: ${playerStats.player.level}`, inline: false },
          { name: '**📈 Stats :**\n', value: `:fire: ${"`Attack`"}: ${playerStats.player.attack}\n:shield: ${"`Defense`"}: ${playerStats.player.defense}\n:heart: ${"`Health`"}: ${playerStats.player.health}\n:dash: ${"`Dodge`"}: ${playerStats.player.dodge}%\n:boom: ${"`Critick`"}: ${playerStats.player.crit}%\n:heavy_multiplication_x: ${"`Critick Multplicator`"}: ${playerStats.player.critMultplicator}%\n:comet: ${"`Attack Speed`"}: ${playerStats.player.attackSpeed}%\n:heart_on_fire: ${"`Life Steal`"}: ${playerStats.player.lifeSteal}%\n:wind_chime: ${"`Execute`"}: ${playerStats.player.execute}\n:fire_extinguisher: ${"`Aegis`"}: ${playerStats.player.aegis}\n:firecracker: ${"`Vengance`"}: ${playerStats.player.vengeance}\n`, inline: true },
          { name: '**⚔️ Ultimate :**\n', value: `:mirror: ${"`Reflect`"}: ${playerStats.player.ultimate.reflect}\n:mending_heart: ${"`Heal`"}: ${playerStats.player.ultimate.heal}\n:four_leaf_clover: ${"`Lucky Strike`"}: ${playerStats.player.ultimate.luckyStrike}\n`, inline: true },
          { name: '**📰 Others :**\n', value: `📜 ${"`Battle Diary`"} : ${playerStats.player.other.dm}`, inline: true },
        )
        .setFooter('© RPG Bot 2022 | ghelp')
        .setTimestamp();
      message.channel.send(statsEmbed);
    }

    main();
    }
}

module.exports.info = {
  names: ['stats', 'statistics'],
};
