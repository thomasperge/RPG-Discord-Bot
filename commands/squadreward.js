const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const STATS = require('../modules/statsBot.js');
const BALANCEDATA = require('../modules/economie.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 4.32e+7;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
  //  ======= CoolDowns: 24h =======
  if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
    message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
    return;
  }
  cooldownPlayers.set(message.author.id, new Date().getTime());
  // ===============================

  var user = message.author;

    // == Player Db ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        // == Balance Data ==
        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            // == Squad Data ==
            let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
            if (!squad) return message.reply(`${inlineCode('❌')} you haven't joined a squad yet : ${inlineCode('rjoinsquad <squad name>')}`);
            else {

                //  ======= CoolDowns: 12h =======
                if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                var measuredTime = new Date(null);
                measuredTime.setSeconds(Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000)); // specify value of SECONDS
                var MHSTime = measuredTime.toISOString().substr(11, 8);
                message.channel.send('⌚ Please wait `' + MHSTime + ' hours` and try again.');
                return;
                }
                
                cooldownPlayers.set(message.author.id, new Date().getTime());
                // ===============================

                var rewardPlayer = Math.floor( ((squad.squadXp / 1000) * playerStats.player.level) * (playerStats.player.other.squadCoinGiven / 250) );
                message.reply(`🪧 Your reward of the day is ${inlineCode(rewardPlayer)} 🪙 thanks to your squad: ${inlineCode(squad.squadName + "'s")}`);

                balance.eco.coins += rewardPlayer;
                balance.save();

                let stats = await STATS.findOne({ botID: 899 });
                stats.amoutCoin += rewardPlayer;
                stats.save();
                
                squad.squadXp += 50;
                squad.save();
            };
        };
    };
};

module.exports.info = {
    names: ['reward', 'bonus', 'squadreward', 'squadbonus'],
};
