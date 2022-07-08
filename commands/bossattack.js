const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');
/**Config Cooldown */
// const shuffleTime = 8.64e7;
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        /**=== Account BOSS ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            /**=== Cooldown Commands: Daily: 24h */
            if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                var measuredTime = new Date(null);
                measuredTime.setSeconds(Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000)); // specify value of SECONDS
                var MHSTime = measuredTime.toISOString().substr(11, 8);
                message.channel.send('⌚ Please wait `' + MHSTime + ' hours` and try again.');
                return;
            }

            cooldownPlayers.set(message.author.id, new Date().getTime());

            // ==== Boss Attack ====
            var damage = Math.floor(Math.random() * playerStats.player.attack)
            message.reply(`You attack the boss, and make : ${damage} dmg (Wait pls soon)`)

            boss.stats.health -= damage
            var newUser = {userId : message.author.id, dmg : damage}
            // boss.userattack.push(newUser)

            if(boss.userattack.length != 0){
                // Check si le joueur est deja enregistre dans la base de donnée
                for(const userDb of boss.userattack){
                    if(userDb.userId == user.id){
                        console.log(`${user.username} dans la databse`)
                    } else{
                        console.log(`${user.username} n'est pas dans la databse`)
                    }
                    console.log(userDb)
                }              
            }

            // Save modules Boss
            boss.save()
        }
    }

};

module.exports.info = {
    names: ['g'],
};
