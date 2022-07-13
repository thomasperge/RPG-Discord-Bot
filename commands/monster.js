const Discord = require('discord.js');
const MONSTERCONFIG = require('../config/monster.json');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
const BALANCEDATA = require('../modules/economie.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();


module.exports.run = async (client, message, args) => {
    var user = message.author;

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {
        /**=== Account Economie ===*/
        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            /**=== Cooldown Commands: 15s */
            if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
            message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
            return;
            }
            cooldownPlayers.set(message.author.id, new Date().getTime());

            function dodgeFunction(dodge){
                // True = dodge, False = not dodge
                if((Math.floor(Math.random() * 100) + 1) < dodge){
                    return true
                } else {
                    return false
                }
            };

            function critFunction(crit){
                // True = critik, False = not critik
                if((Math.floor(Math.random() * 100) + 1) < crit){
                    return true
                } else {
                    return false
                }
            };

            function addSquadXp(squad, xpUserEarn){
                if (!squad) return
                else {
                    squad.squadXp += Math.floor(xpUserEarn * 0.15)
                    squad.save()
                }
            };


            function battle(MAXATK_PLAYER, MAXATK_MONSTER, HEALTH_PLAYER, HEALTH_MONSTER, DEFENSE_MONSTER, DODGEPLAYER, CRITPLAYER, MAXXP){
                var monsterStats_atk = MAXATK_MONSTER
                var monsterStats_hth = HEALTH_MONSTER
                var NB_CRIT = 0
                var NB_DODGE = 0
                var NB_ATTACK_PLAYER = 0
                var NB_ATTACK_MONSTER = 0
                var ATK_SOMME_PLAYER = 0
                var ATK_SOMME_MONSTER = 0
                var ULTIMATEREFLECT = ''
                var ULTIMATEHEAL = ''
                var ULTIMATELUCKYSTRIKE = ''

                while(HEALTH_PLAYER != 0 || HEALTH_MONSTER != 0){
                    // ====== Joueur attaque ======
                    if(CRITPLAYER == false){
                        // Ultimate
                        var randomUltimateReflect = Math.floor(Math.random() * 100)
                        var randomUltimateHeal = Math.floor(Math.random() * 100)
                        var randomUltimateLuckyStrike = Math.floor(Math.random() * 100)

                        if(randomUltimateReflect < playerStats.player.ultimate.reflect){
                            ULTIMATEREFLECT = '\n📜 You use your Ultimate: `Reflect` :mirror:'
                        };
                        if(randomUltimateHeal < playerStats.player.ultimate.heal){
                            ULTIMATEHEAL = '\n📜 You use your Ultimate: `Heal` :four_leaf_clover:'
                        };
                        if(randomUltimateLuckyStrike < playerStats.player.ultimate.luckyStrike){
                            ULTIMATELUCKYSTRIKE = '\n📜 You use your Ultimate: `Lucky Strike` :mending_heart:'
                        };

                        var attackDamagePLayer = Math.floor(Math.random() * MAXATK_PLAYER) + 1
                        NB_ATTACK_PLAYER = NB_ATTACK_PLAYER + 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayer
                        
                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayer;
                    } else {
                        var attackDamagePLayerCrit = Math.floor((Math.random() * (MAXATK_PLAYER)) * playerStats.player.critMultplicator) + 1
                        NB_CRIT += 1
                        NB_ATTACK_PLAYER = NB_ATTACK_PLAYER + 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayerCrit

                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayerCrit;
                    }

                    // ====== Monstre attaque ======
                    if(DODGEPLAYER == false){
                        var attackDamageMonster = Math.floor(Math.random() * MAXATK_MONSTER) + 1;
                        NB_ATTACK_MONSTER = NB_ATTACK_MONSTER + 1;
                        ATK_SOMME_MONSTER = ATK_SOMME_MONSTER + attackDamageMonster;

                        HEALTH_PLAYER = HEALTH_PLAYER - attackDamageMonster;
                    } else {
                        NB_DODGE = NB_DODGE + 1;
                        NB_ATTACK_MONSTER = NB_ATTACK_MONSTER + 1;
                        HEALTH_PLAYER = HEALTH_PLAYER;
                    }

                    // ============================================
                    // ================= RESULT : =================

                    if (HEALTH_PLAYER <= 0){
                        // ========= PLAYER LOSE =========
                        var losecoin = Math.floor((balance.eco.coins*10)/100)

                        balance.eco.coins = Math.floor(balance.eco.coins - losecoin)
                        balance.save()

                        // Dm diary :
                        if(playerStats.player.other.dm){
                            var battleDiaryEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setAuthor(`📜 ${client.users.cache.get(user.id).username}'s Battle Diary (Monster)`)
                                .addFields(
                                { name: `${`🪦`} You Lose...\n`, value : `You lose ${losecoin} 🪙`},
                                )
                                .setFooter('© RPG Bot 2022 | Battle Diary')
                                .setTimestamp();
                            message.author.send({embeds: [battleDiaryEmbed]}).catch(error => {
                                message.channel.send(`Something went wrong while I tried to send you a DM`)
                            }) 
                        }

                        // Embed :
                        var battleEmbed = new Discord.MessageEmbed()
                            .setColor('#9696ab')
                            .setAuthor(`${client.users.cache.get(user.id).username}'s Stats`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                            .setDescription(`**:crossed_swords: BATTLE**\n${client.users.cache.get(user.id).username} ${"`🆚`"} Monster\n`)
                            .addFields(
                            { name: '**🎯 MONSTER :**\n', value: `**Attack** : ${monsterStats_atk}\n**Defense** : ${DEFENSE_MONSTER}\n**Health** : ${monsterStats_hth}\n`, inline: true },
                            { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerStats.player.attack}\n**Defense** : ${playerStats.player.defense}\n**Health** : ${playerStats.player.health}\n `, inline: true },
                            { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYER} times** and did **${ATK_SOMME_PLAYER}** damage to the Monster\nThe Monster attacked **${NB_ATTACK_MONSTER} times** and did **${ATK_SOMME_MONSTER}** damage to you\n:boxing_glove: You dodged **${NB_DODGE} times** the attacks of the monster, and put **${NB_CRIT}** critical hits!${ULTIMATEREFLECT}${ULTIMATEHEAL}${ULTIMATELUCKYSTRIKE}\n\n**${inlineCode('▶ 🪦 YOU LOSE...')}**\n${inlineCode('🎁')} You lose **10%** of your 🪙 ( -**${losecoin}**)...`, inline: false },
                            )
                            .setFooter('© RPG Bot 2022 | ghelp')
                            .setTimestamp();
                        return message.channel.send({embeds: [battleEmbed]});
                    };
                    if (HEALTH_MONSTER <= 0){
                        // ========= PLAYER WIN =========
                        var randomcoin = Math.floor((Math.random() * MAXXP));
                        var randomxp = Math.floor(Math.random() * MAXXP) + 1;

                        balance.eco.coins = balance.eco.coins + randomcoin
                        balance.eco.xp = balance.eco.xp + randomxp
                        balance.save()

                        // == DM DIARY ==
                        if(playerStats.player.other.dm){
                            var battleDiaryEmbed = new Discord.MessageEmbed()
                                .setColor('#17ff00')
                                .setAuthor(`📜 ${client.users.cache.get(user.id).username}'s Battle Diary (Monster)`)
                                .addFields(
                                { name: `${`🥇`} You Win !\n`, value : `You get ${randomxp} 🏮 and ${randomcoin} 🪙`},
                                )
                                .setFooter('© RPG Bot 2022 | Battle Diary')
                                .setTimestamp();
                            message.author.send({embeds: [battleDiaryEmbed]}).catch(error => {
                                message.channel.send(`Something went wrong while I tried to send you a DM`)
                            })
                        }

                        if(NB_DODGE == undefined) NB_DODGE = 0
                        if(NB_CRIT == undefined) NB_CRIT = 0
                        
                        // === Embed ===
                        var battleEmbed = new Discord.MessageEmbed()
                            .setColor('#fc9803')
                            .setAuthor(`${client.users.cache.get(user.id).username}'s Battle`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                            .setDescription(`**:crossed_swords: BATTLE**\n${client.users.cache.get(user.id).username} ${"`🆚`"} Monster\n`)
                            .addFields(
                            { name: '**🎯 MONSTER :**\n', value: `**Attack** : ${monsterStats_atk}\n**Defense** : ${DEFENSE_MONSTER}\n**Health** : ${monsterStats_hth}\n `, inline: true },
                            { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerStats.player.attack}\n**Defense** : ${playerStats.player.defense}\n**Health** : ${playerStats.player.health}\n `, inline: true },
                            { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYER} times** and did **${ATK_SOMME_PLAYER}** damage to the Monster\nThe Monster attacked **${NB_ATTACK_MONSTER} times** and did **${ATK_SOMME_MONSTER}** damage to you\n:boxing_glove: You dodged **${NB_DODGE} times** the attacks of the monster, and put **${NB_CRIT}** critical hits!${ULTIMATEREFLECT}${ULTIMATEHEAL}${ULTIMATELUCKYSTRIKE}\n\n**${inlineCode('▶ 🎉 YOU WIN !')}**\n${inlineCode('🎁')} And get: **${randomxp}** 🏮 and **${randomcoin}** 🪙`, inline: false },

                            )
                            .setFooter('© RPG Bot 2022 | ghelp')
                            .setTimestamp();
                        return message.channel.send({embeds: [battleEmbed]});
                    }
                }
            }
            // ====== Function Battle End ======



            function firstMessage(squad){
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('yes')
                            .setLabel('Attack')
                            .setStyle('SUCCESS'),
                        
                        new MessageButton()
                            .setCustomId('no')
                            .setLabel('I am afraid!')
                            .setStyle('DANGER'),
                    );
                
                message.reply({ content: `Monster attack for ${user.username}`, components: [row] });

                const filter = (interaction)  => {
                    if(interaction.user.id === message.author.id) return true
                    return interaction.reply({ content: 'You cant use this button bro' })
                }
                const collector = message.channel.createMessageComponentCollector({
                    filter, 
                    max: 1
                })
            
                collector.on('end', (ButtonInteraction) => {
                    ButtonInteraction.first().deferUpdate()
                    const id = ButtonInteraction.first().customId
                    if(id === 'yes'){

                        // === Ad Squad Xp ===
                        var randomxp = Math.floor(Math.random() * playerStats.player.health) + 1;
                        addSquadXp(squad, randomxp)

                        // ================= LEVEL CONFIG =================
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
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 27);
                        };
                        if(playerStats.player.level == 1){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level1.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level1.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level1.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 39)
                        };
                        if(playerStats.player.level == 2){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level2.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level2.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level2.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 60)
                        };
                        if(playerStats.player.level == 3){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level3.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level3.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level3.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 98)
                        };
                        if(playerStats.player.level == 4){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level4.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level4.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level4.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 163)
                        };
                        if(playerStats.player.level == 5){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level5.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level5.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level5.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 278)
                        };
                        if(playerStats.player.level == 6){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level6.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level6.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level6.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 479)
                        };
                        if(playerStats.player.level == 7){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level7.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level7.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level7.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 831)
                        };
                        if(playerStats.player.level == 8){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level8.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level8.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level8.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 1447)
                        };
                        if(playerStats.player.level == 9){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level9.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level9.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level9.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 2524)
                        };
                        if(playerStats.player.level == 10){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level10.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level10.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level10.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 4410)
                        };
                        if(playerStats.player.level == 11){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level11.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level11.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level11.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 7710)
                        };
                        if(playerStats.player.level == 12){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level12.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level12.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level12.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 13485)
                        };
                        if(playerStats.player.level == 13){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level13.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level13.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level13.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 23592)
                        };
                        if(playerStats.player.level == 14){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level14.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level14.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level14.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 41278)
                        };
                        if(playerStats.player.level == 15){
                            var randomMonster = Math.floor(Math.random() * 2);
                            // Choose monster between 1 and 3 :
                            var MONSTER
                            if(randomMonster == 0) MONSTER = MONSTERCONFIG.level15.monsterlvl1
                            if(randomMonster == 1) MONSTER = MONSTERCONFIG.level15.monsterlvl2
                            if(randomMonster == 2) MONSTER = MONSTERCONFIG.level15.monsterlvl3
                            // Initialize MAX ATTACK Player and Monster :
                            const MAXATK_PLAYER = playerStats.player.attack - MONSTER.defense
                            const MAXATK_MONSTER = MONSTER.attack - playerStats.player.defense
                            return battle(MAXATK_PLAYER, MAXATK_MONSTER, playerStats.player.health, MONSTER.health, MONSTER.defense, dodgeFunction(playerStats.player.dodge), critFunction(playerStats.player.crit), 72228)
                        };
                    }
                    if(id === 'no') return message.reply('YOU AFRAID HAHHAHAHAHH !!!!!!')
                })
            }
            // ======== END FUNCTION FIRSTMESSAGE() ========
            squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName })
            firstMessage(squad)

        }
    }
};

module.exports.info = {
    names: ['monster'],
};
