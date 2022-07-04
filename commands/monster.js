const Discord = require('discord.js');
const MONSTERCONFIG = require('../config/monster.json');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');

module.exports.run = async (client, message, args) => {
    var user = message.author;

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
    else {
        /**=== Account Economie ===*/
        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply("`❌` you are not player ! : `gstart`");
        else {
            function dodgeFunction(dodge){
                // True = dodge, False = not dodge
                if((Math.floor(Math.random() * 100) + 1) < dodge){
                    return true
                } else {
                    return false
                }
            }

            function critFunction(crit){
                // True = critik, False = not critik
                if((Math.floor(Math.random() * 100) + 1) < crit){
                    return true
                } else {
                    return false
                }
            }

            function battle(MAXATK_PLAYER, MAXATK_MONSTER, HEALTH_PLAYER, HEALTH_MONSTER, DODGEPLAYER, CRITPLAYER){
                while(HEALTH_PLAYER != 0 || HEALTH_MONSTER != 0){
                    var NB_CRIT = 0
                    var NB_DODGE = 0
                    var NB_ATTACK_PLAYER = 0
                    var NB_ATTACK_MONSTER = 0
                    var ATK_SOMME_PLAYER = 0
                    var ATK_SOMME_MONSTER = 0

                    // ====== Joueur attaque ======
                    if(CRITPLAYER == false){
                        var attackDamagePLayer = Math.floor(Math.random() * MAXATK_PLAYER) + 1
                        NB_ATTACK_PLAYER += 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayer
                        console.log(ATK_SOMME_PLAYER)
                        
                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayer;
                    } else {
                        var attackDamagePLayerCrit = Math.floor((Math.random() * (MAXATK_PLAYER)) * playerStats.player.critMultplicator) + 1
                        NB_CRIT += 1
                        NB_ATTACK_PLAYER += 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayerCrit

                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayerCrit;
                    }

                    // ====== Monstre attaque ======
                    if(DODGEPLAYER == false){
                        var attackDamageMonster = Math.floor(Math.random() * MAXATK_MONSTER) + 1
                        NB_ATTACK_MONSTER += 1
                        ATK_SOMME_MONSTER = ATK_SOMME_MONSTER + attackDamageMonster

                        HEALTH_PLAYER = HEALTH_PLAYER - attackDamageMonster;
                    } else {
                        NB_DODGE += 1
                        NB_ATTACK_MONSTER += 1
                        HEALTH_PLAYER = HEALTH_PLAYER
                    }

                    // Result :
                    if (HEALTH_PLAYER <= 0){
                        balance.eco.coins = Math.floor(balance.eco.coins - (balance.eco.coins*10)/100)
                        balance.save()
                        return message.reply('Monster win...\nYou lose `10%` of your balance !')
                    }
                    if (HEALTH_MONSTER <= 0){
                        var randomcoin = Math.floor(Math.random() * playerStats.player.health);
                        balance.eco.coins = balance.eco.coins + randomcoin
                        balance.save()

                        if(NB_DODGE == undefined) NB_DODGE = 0
                        if(NB_CRIT == undefined) NB_CRIT = 0

                        // === Embed ===
                        var battleEmbed = new Discord.MessageEmbed()
                            .setColor('#fc9803')
                            .setAuthor(`${client.users.cache.get(user.id).username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                            .setDescription(`**:crossed_swords: BATTLE**\n${client.users.cache.get(user.id).username} :vs: Monster\n**${`:tada: You've won!**`}`)
                            .addFields(
                            { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYER}x** and did **${ATK_SOMME_PLAYER} damage** to the Monster\nThe Monster attacked **${NB_ATTACK_MONSTER}x** and did **${ATK_SOMME_MONSTER}** damage to you\n:boxing_glove: You dodged ${NB_DODGE}x the attacks of the monster, and put ${NB_CRIT} critical hits!`, inline: true },

                            )
                            .setFooter('© RPG Bot 2022 | ghelp')
                            .setTimestamp();
                        message.channel.send(battleEmbed);
                        return message.reply(`You Win !\nAnd get: ${randomcoin} :coin:`)
                    }
                }
            }

            if(playerStats.player.level == 0){
                var randomMonster = Math.floor(Math.random() * 2);
                // Choose monster between 1 and 3 :
                var MONSTER
                if(randomMonster == 0) MONSTER = MONSTERCONFIG.level0.monsterlvl1
                if(randomMonster == 1) MONSTER = MONSTERCONFIG.level0.monsterlvl2
                if(randomMonster == 2) MONSTER = MONSTERCONFIG.level0.monsterlvl3
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };




            if(playerStats.player.level == 1){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level1[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level1[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level1[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level1[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 2){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level2[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level2[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level2[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level2[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 3){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level3[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level3[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level3[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level3[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 4){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level4[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level4[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level4[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level4[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 5){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level5[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level5[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level5[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level5[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 6){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level6[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level6[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level6[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level6[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 7){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level7[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level7[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level7[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level7[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 8){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level8[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level8[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level8[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level8[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 9){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level9[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level9[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level9[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level9[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 10){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level10[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level10[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level10[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level10[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 11){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level11[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level11[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level11[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level11[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 12){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level12[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level12[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level12[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level12[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 13){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level13[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level13[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level13[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level13[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 14){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level14[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level14[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level14[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level14[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
            if(playerStats.player.level == 15){
                var randomMonster = Math.floor(Math.random() * 3) + 1;
                // Choose monster between 1 and 3 :
                const MONSTER = MONSTERCONFIG.level15[randomMonster]
                // Initialize MAX ATTACK Player and Monster :
                const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level15[randomMonster].defense
                const MAXATK_MONSTER = MONSTERCONFIG.level15[randomMonster].attack - playerStats.player.defense
                battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level15[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
            };
        }
    }
};

module.exports.info = {
    names: ['monster'],
};
