const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const BALANCEDATA = require('../modules/economie.js');
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

            /**=== Account Economie ===*/
            let balance = await BALANCEDATA.find();
            if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
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

                // ==== Boss Attack Player ====
                var damage = Math.floor(Math.random() * playerStats.player.attack)
                message.reply(`You attack the boss and make ${damage} dmg`)

                playerStats.player.other.bossattack += damage
                playerStats.save()

                boss.stats.health -= damage
                boss.save()

                // ==== Boss Death ====
                if(boss.stats.health > 0){
                    message.reply(`**BOSS DESTROY !!!**\nChaque Participant à voir attaquer le boss va recevoir une prime !`)

                    const allPLayer = await PLAYERDATA.find()

                    for(const userDB of allPLayer){
                        if(userDB.player.other.bossattack >= 1){

                            for(const userBAL of balance){
                                if(userDB.userId == userBAL.userId){
                                    let balance2 = await BALANCEDATA.findOne({userId: userDB.userId});
                                    balance2.eco.xp += userDB.player.other.bossattack * 150
                                    balance2.save()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports.info = {
    names: ['g'],
};
