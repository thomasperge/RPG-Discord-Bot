const Discord = require('discord.js');
const MONSTERCONFIG = require('../config/monster.json');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
    var user = message.author;

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply("`❌` you are not player ! : `gstart`");
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
                // === Joueur attaque ===
                if(CRITPLAYER == false){
                    // pas d'attaque critique
                    HEALTH_MONSTER = HEALTH_MONSTER - Math.floor(Math.random() * MAXATK_PLAYER) + 1;
                } else {
                    // attaque critique
                    HEALTH_MONSTER = HEALTH_MONSTER - Math.floor((Math.random() * (MAXATK_PLAYER)) * critMultplicator) + 1;
                }
                // === Monstre attaque ===
                if(DODGEPLAYER == false){
                    // attaque du monstre (pas d'esquive)
                    HEALTH_PLAYER = HEALTH_PLAYER - Math.floor(Math.random() * MAXATK_MONSTER) + 1;
                } else {
                    // joueur esquive
                    HEALTH_PLAYER = HEALTH_PLAYER
                }

                // Resultat :
                if (HEALTH_PLAYER <= 0){
                    return message.reply('Monster gagne !')
                }
                if (HEALTH_MONSTER <= 0){
                    return message.reply('Player gagne !')
                }
            }
        }

        if(playerStats.player.level == 0){
            var randomMonster = Math.floor(Math.random() * 3) + 1;
            // Choose monster between 1 and 3 :
            const MONSTER = MONSTERCONFIG.level0[randomMonster]
            // Initialize MAX ATTACK Player and Monster :
            const MAXATK_PLAYER = playerStats.player.attack - MONSTERCONFIG.level0[randomMonster].defense
            const MAXATK_MONSTER = MONSTERCONFIG.level0[randomMonster].attack - playerStats.player.defense
            battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTERCONFIG.level0[randomMonster].health, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit))
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
};

module.exports.info = {
    names: ['monster'],
};
