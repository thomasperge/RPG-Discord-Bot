const Discord = require('discord.js');
const BOSSDATA = require('../modules/boss.js')
const BALANCEDATA = require('../modules/economie.js');
const PLAYERDATA = require('../modules/player.js');
const CONFIGBOSS = require('../config/boss.json')
const CONFIGPLAYER = require('../config/configLevel.json')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
// const shuffleTime = 8.64e7; (= 24h)
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    // Stats
    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {
        /**=== Account BOSS ===*/
        let boss = await BOSSDATA.findOne({ idboss: 0 });
        if (!boss) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            /**=== Account Economie ===*/
            let balance = await BALANCEDATA.find();
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
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

                if(boss.stats.health >= 0){
                    // ==== Boss Attack Player ====
                    var damage = Math.floor(Math.random() * playerStats.player.attack)
                    var damageBoss = Math.floor(Math.random() * boss.stats.attack) + 1

                    // === Balance Player ===
                    let balancePlayer = await BALANCEDATA.findOne({userId: user.id});
                    if (!balancePlayer) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
                    else {
                        
                        message.reply(`You attack the boss and make ${damage} dmg\nThe Boss attack you and make ${damageBoss} dmg`)

                        // add dammage :
                        playerStats.player.other.bossattack += damage
                        // clear health player : 
                        playerStats.player.health -= damageBoss
                        
                        // ==== Player loses ====
                        if(playerStats.player.health <= 0){
                            // ==== Initialize Lose Coin ====
                            var losecoin10 = Math.floor((balancePlayer.eco.coins*10)/100)

                            message.reply(`You lose... and lose 10% of your coin: ${losecoin10}`)

                            // delete coins of user : 
                            balancePlayer.eco.coins -= losecoin10
                            balancePlayer.save()

                            if(playerStats.player.level === 0) playerStats.player.health = CONFIGPLAYER.level0.stats.health
                            if(playerStats.player.level === 1) playerStats.player.health = CONFIGPLAYER.level1.stats.health
                            if(playerStats.player.level === 2) playerStats.player.health = CONFIGPLAYER.level2.stats.health
                            if(playerStats.player.level === 3) playerStats.player.health = CONFIGPLAYER.level3.stats.health
                            if(playerStats.player.level === 4) playerStats.player.health = CONFIGPLAYER.level4.stats.health
                            if(playerStats.player.level === 5) playerStats.player.health = CONFIGPLAYER.level5.stats.health
                            if(playerStats.player.level === 6) playerStats.player.health = CONFIGPLAYER.level6.stats.health
                            if(playerStats.player.level === 7) playerStats.player.health = CONFIGPLAYER.level7.stats.health
                            if(playerStats.player.level === 8) playerStats.player.health = CONFIGPLAYER.level8.stats.health
                            if(playerStats.player.level === 9) playerStats.player.health = CONFIGPLAYER.level9.stats.health
                            if(playerStats.player.level === 10) playerStats.player.health = CONFIGPLAYER.level10.stats.health
                            if(playerStats.player.level === 11) playerStats.player.health = CONFIGPLAYER.level11.stats.health
                            if(playerStats.player.level === 12) playerStats.player.health = CONFIGPLAYER.level12.stats.health
                            if(playerStats.player.level === 13) playerStats.player.health = CONFIGPLAYER.level13.stats.health
                            if(playerStats.player.level === 14) playerStats.player.health = CONFIGPLAYER.level14.stats.health
                            if(playerStats.player.level === 15) playerStats.player.health = CONFIGPLAYER.level15.stats.health
                        }
    
                        playerStats.save()
    
                        boss.stats.health -= damage
                        boss.save()
                    }
                }

                // ==== Boss Death - Player WIN ====
                if(boss.stats.health <= 0){
                    message.reply(`**BOSS DESTROY !!!**\nChaque Participant à voir attaquer le boss va recevoir une prime !`)

                    const allPLayer = await PLAYERDATA.find()

                    for(const userDB of allPLayer){
                        if(userDB.player.other.bossattack >= 1){

                            for(const userBAL of balance){
                                if(userDB.userId == userBAL.userId){
                                    let balance2 = await BALANCEDATA.findOne({userId: userDB.userId});
                                    balance2.eco.xp += userDB.player.other.bossattack * 150
                                    balance2.save()
                                    playerStats.player.other.bossattack = 0
                                }
                            }
                            // Generate New Boss
                            function newBoss(name, health, attack){
                                boss.stats.health = health
                                boss.stats.attack = attack
                                boss.bossname = name
                            }

                            var randomBoss = Math.floor(Math.random() * 10) + 1
                            if(randomBoss == 1) newBoss(CONFIGBOSS.boss1.name, CONFIGBOSS.boss1.health, CONFIGBOSS.boss1.attack)
                            if(randomBoss == 2) newBoss(CONFIGBOSS.boss2.name, CONFIGBOSS.boss2.health, CONFIGBOSS.boss2.attack)
                            if(randomBoss == 3) newBoss(CONFIGBOSS.boss3.name, CONFIGBOSS.boss3.health, CONFIGBOSS.boss3.attack)
                            if(randomBoss == 4) newBoss(CONFIGBOSS.boss4.name, CONFIGBOSS.boss4.health, CONFIGBOSS.boss4.attack)
                            if(randomBoss == 5) newBoss(CONFIGBOSS.boss5.name, CONFIGBOSS.boss5.health, CONFIGBOSS.boss5.attack)
                            if(randomBoss == 6) newBoss(CONFIGBOSS.boss6.name, CONFIGBOSS.boss6.health, CONFIGBOSS.boss6.attack)
                            if(randomBoss == 7) newBoss(CONFIGBOSS.boss7.name, CONFIGBOSS.boss7.health, CONFIGBOSS.boss7.attack)
                            if(randomBoss == 8) newBoss(CONFIGBOSS.boss8.name, CONFIGBOSS.boss8.health, CONFIGBOSS.boss8.attack)
                            if(randomBoss == 9) newBoss(CONFIGBOSS.boss9.name, CONFIGBOSS.boss9.health, CONFIGBOSS.boss9.attack)
                            if(randomBoss == 10) newBoss(CONFIGBOSS.boss10.name, CONFIGBOSS.boss10.health, CONFIGBOSS.boss10.attack)
                        }

                    }
                    boss.save()
                }
            }
        }
    }
};

module.exports.info = {
    names: ['g'],
};
