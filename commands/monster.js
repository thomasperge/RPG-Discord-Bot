const Discord = require('discord.js');
const MONSTERCONFIG = require('../config/monster.json');
const PLAYERDATA = require('../modules/player.js');
const STATS = require('../modules/statsBot.js');
const SQUADDATA = require('../modules/squad.js')
const EMOJICONFIG = require('../config/emoji.json');
const BALANCEDATA = require('../modules/economie.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { numStr } = require('../functionNumber/functionNbr');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {

    var user = message.author;

    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: message.author.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            let stats = await STATS.findOne({ botID: 899 });

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


            // [=================== BATTLE FUNCTION ===================]
            function battle(MAXATK_PLAYER, MAXATK_MONSTER, HEALTH_PLAYER, HEALTH_MONSTER, DEFENSE_MONSTER, DODGEPLAYER, CRITPLAYER, MAXXP){
                var monsterStats_atk = MAXATK_MONSTER
                var monsterStats_hth = HEALTH_MONSTER
                var NB_CRIT = 0
                var NB_DODGE = 0
                var NB_ATTACK_PLAYER = 0
                var NB_ATTACK_MONSTER = 0
                var ATK_SOMME_PLAYER = 0
                var ATK_SOMME_MONSTER = 0

                while(HEALTH_PLAYER != 0 || HEALTH_MONSTER != 0){
                    // ==== Joueur attaque ====
                    if(CRITPLAYER == false){
                        var attackDamagePLayer = Math.floor(Math.random() * MAXATK_PLAYER) + 1
                        NB_ATTACK_PLAYER = NB_ATTACK_PLAYER + 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayer
                        
                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayer;
                    } else {
                        var attackDamagePLayerCrit = Math.floor(Math.random() * (MAXATK_PLAYER + playerStats.player.crit)) + 1;
                        NB_CRIT += 1
                        NB_ATTACK_PLAYER = NB_ATTACK_PLAYER + 1
                        ATK_SOMME_PLAYER = ATK_SOMME_PLAYER + attackDamagePLayerCrit

                        HEALTH_MONSTER = HEALTH_MONSTER - attackDamagePLayerCrit;
                    }

                    // ==== Monstre attaque ====
                    if(DODGEPLAYER == false){
                        var attackDamageMonster = Math.floor(Math.random() * MAXATK_MONSTER);
                        NB_ATTACK_MONSTER = NB_ATTACK_MONSTER + 1;
                        ATK_SOMME_MONSTER = ATK_SOMME_MONSTER + attackDamageMonster;

                        HEALTH_PLAYER = HEALTH_PLAYER - attackDamageMonster;
                    } else {
                        NB_DODGE = NB_DODGE + 1;
                        NB_ATTACK_MONSTER = NB_ATTACK_MONSTER + 1;
                        HEALTH_PLAYER = HEALTH_PLAYER;
                    }


                    if (HEALTH_PLAYER <= 0){
                    // =========== PLAYER LOSE ===========

                        var losecoin = Math.floor((balance.eco.coins*10)/100)

                        balance.eco.coins = Math.floor(balance.eco.coins - losecoin)
                        balance.save()

                        // === Dm diary : ===
                        if(playerStats.player.other.dm){
                            var battleDiaryEmbed = new Discord.MessageEmbed()
                                .setColor('#ff0000')
                                .setTitle(`📜 ${client.users.cache.get(user.id).username}'s Battle Diary (Monster)`)
                                .addFields(
                                    { name: `${`🪦`} You Lose...\n`, value : `You lose ${inlineCode(numStr(losecoin))} ${EMOJICONFIG.coin}`},
                                )
                                .setTimestamp();
                            message.author.send({embeds: [battleDiaryEmbed]}).catch(error => {
                                message.reply(`Something went wrong while I tried to send you a DM`)
                            }); 
                        };

                        // ==== Embed LOSE ====
                        var battleEmbed = new Discord.MessageEmbed()
                            .setColor('#9696ab')
                            .setTitle(`${client.users.cache.get(user.id).username}'s Stats`)
                            .setDescription(`**:crossed_swords: BATTLE**\n${user.username} 🆚 Monster\n`)
                            .addFields(
                                { name: '**🪧 YOU :**\n', value: `**Attack** : ${playerStats.player.attack}\n**Defense** : ${playerStats.player.defense}\n**Health** : ${playerStats.player.health}\n `, inline: true },
                                { name: '**🪧 MONSTER :**\n', value: `**Attack** : ${monsterStats_atk}\n**Defense** : ${DEFENSE_MONSTER}\n**Health** : ${monsterStats_hth}\n`, inline: true },
                                { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYER} times** and did **${ATK_SOMME_PLAYER}** damage to the Monster\nThe Monster attacked **${NB_ATTACK_MONSTER} times** and did **${ATK_SOMME_MONSTER}** damage to you\n:boxing_glove: You dodged **${NB_DODGE}** of the attacks of the monster, and dealt **${NB_CRIT}** critical hits!\n\n**${inlineCode('▶ 🪦 YOU LOSE...')}**\n${inlineCode('🎁')} You lose **10%** of your ${EMOJICONFIG.coin} ( -**${losecoin}**)...`, inline: false },
                            )
                            .setTimestamp();
                        return battleEmbed
                    };
                    if (HEALTH_MONSTER <= 0){
                    // =========== PLAYER WIN ===========

                        var randomcoin = Math.floor((Math.random() * (MAXXP / (MAXXP/155)))) + 1;
                        var randomxp = Math.floor(Math.random() * (MAXXP / (MAXXP/265))) + 1;

                        playerStats.player.other.monsterKill += 1
                        playerStats.save()

                        stats.amoutCoin += randomcoin;
                        stats.amoutMonsterKilled += 1;
                        stats.save();

                        balance.eco.coins = balance.eco.coins + randomcoin
                        balance.eco.xp = balance.eco.xp + randomxp
                        balance.save()

                        // === DM DIARY ===
                        if(playerStats.player.other.dm){
                            var battleDiaryEmbed = new Discord.MessageEmbed()
                                .setColor('#17ff00')
                                .setTitle(`📜 ${client.users.cache.get(user.id).username}'s Battle Diary (Monster)`)
                                .addFields(
                                    { name: `${`🥇`} You Win !\n`, value : `You get ${inlineCode(numStr(randomxp))} ${EMOJICONFIG.xp} and ${inlineCode(numStr(randomcoin))} ${EMOJICONFIG.coin}`},
                                )
                                .setTimestamp();
                            message.author.send({embeds: [battleDiaryEmbed]}).catch(error => {
                                message.reply(`Something went wrong while I tried to send you a DM`)
                            });
                        };

                        if(NB_DODGE == undefined) NB_DODGE = 0
                        if(NB_CRIT == undefined) NB_CRIT = 0
                        
                        // ==== Embed WIN ====
                        var battleEmbed = new Discord.MessageEmbed()
                            .setColor('#fc9803')
                            .setTitle(`${client.users.cache.get(user.id).username}'s Battle`, 'https://media.discordapp.net/attachments/693829568720535664/697087222146400336/logo_GoodFarm.png?width=670&height=670')
                            .setDescription(`**:crossed_swords: BATTLE**\n${client.users.cache.get(user.id).username} ${"`🆚`"} Monster\n`)
                            .addFields(
                                { name: '**🪧 YOU :**\n', value: `**Attack** : ${playerStats.player.attack}\n**Defense** : ${playerStats.player.defense}\n**Health** : ${playerStats.player.health}\n `, inline: true },
                                { name: '**🪧 MONSTER :**\n', value: `**Attack** : ${monsterStats_atk}\n**Defense** : ${DEFENSE_MONSTER}\n**Health** : ${monsterStats_hth}\n `, inline: true },
                                { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYER} times** and did **${ATK_SOMME_PLAYER}** damage to the Monster\nThe Monster attacked **${NB_ATTACK_MONSTER} times** and did **${ATK_SOMME_MONSTER}** damage to you\n:boxing_glove: You dodged **${NB_DODGE} times** the attacks of the monster, and put **${NB_CRIT}** critical hits!\n\n**${inlineCode('▶ 🎉 YOU WIN !')}**\n${inlineCode('🎁')} And get: **${inlineCode(numStr(randomxp))}** ${EMOJICONFIG.xp} and **${inlineCode(numStr(randomcoin))}** ${EMOJICONFIG.coin}`, inline: false },
                            )
                            .setTimestamp();
                        return battleEmbed
                    };
                };
            };
            // [===== Function Battle End =====]

            var MonsterAttack = Math.floor(Math.random() * ((playerStats.player.attack*11)/10)) + Math.floor((playerStats.player.attack*3)/10)
            var MonsterDefense = Math.floor(Math.random() * ((playerStats.player.defense*12)/10)) + Math.floor((playerStats.player.defense*2)/10)
            var MonsterHealth = Math.floor(Math.random() * ((playerStats.player.health*14)/10)) + Math.floor((playerStats.player.health*4)/10)
            var Player_Attack = playerStats.player.attack - MonsterDefense

            var Dodge_PLayer = dodgeFunction(playerStats.player.dodge)
            var Crit_PLayer = critFunction(playerStats.player.crit)

            if(Player_Attack <= 0) Player_Attack = 0
            if(MonsterAttack <= 0) MonsterAttack = 0
            if(MonsterHealth <= 0) MonsterHealth = 0
            if(MonsterHealth <= 0) MonsterHealth = 0


            function winPercentage(){
                var totalStatsPlayer = Player_Attack * (playerStats.player.health + playerStats.player.defense)
                var totalStatsMonster = MonsterAttack * (MonsterHealth + MonsterDefense)

                var totalStats = totalStatsPlayer + totalStatsMonster

                var percentageWin = (100 * totalStatsPlayer) / totalStats

                var percentageWin = new Discord.MessageEmbed()
                    .setColor('#ce2dcb')
                    .setTitle(`🧮 ${user.username}'s Win %`)
                    .setDescription(`📰 ${inlineCode(user.username)} vs ${inlineCode('Monster')}\n`)
                    .addFields(
                        {name: `🪧 Your Stats:`, value:`${inlineCode("💥")}: ${Player_Attack}\n${inlineCode("🛡️")}: ${playerStats.player.defense}\n${inlineCode("❤️")}: ${playerStats.player.health}`, inline: true},
                        {name: `🪧 Monster Stats:`, value:`${inlineCode("💥")}: ${MonsterAttack}\n${inlineCode("🛡️")}: ${MonsterDefense}\n${inlineCode("❤️")}: ${MonsterHealth}`, inline: true},
                        {name: `📭 Result :`, value:`🍀 Your percentage chance of winning is : **${Math.floor(percentageWin)}%**`, inline: false},
                    )
                    .setTimestamp();
                return percentageWin
            };


            // [=========== BUTTON MESSAGE ===========]
            var rM = Math.floor(Math.random() * 2)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('ATTACK')
                        .setStyle('SUCCESS'),
                    
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('I AM AFRAID')
                        .setStyle('DANGER'),
                    
                    new MessageButton()
                        .setCustomId('percentage')
                        .setLabel('WIN %')
                        .setStyle('SECONDARY'),
                );

            const embedMessage = new MessageEmbed()
                .setColor('#ce2dcb')
                .setTitle('Monster Attack - Stats')
                .addFields(
                    { name: '**📊 PLAYER :**\n', value: `${inlineCode("💥")}: ${playerStats.player.attack}\n${inlineCode("🛡️")}: ${playerStats.player.defense}\n${inlineCode("❤️")}: ${playerStats.player.health}`, inline: true},
                    { name: '**🎯 MONSTER :**\n', value: `${inlineCode("💥")}: ${MonsterAttack}\n${inlineCode("🛡️")}: ${MonsterDefense}\n${inlineCode("❤️")}: ${MonsterHealth}`, inline: true},
                )
                .setTimestamp()

            const msg = await message.reply({ embeds: [embedMessage], components: [row] });
            
            const collector = msg.createMessageComponentCollector({
                componentType: "BUTTON",
                max: 1,
                time: 30_000
            });
            
            collector.on('collect', async interaction => {
                if (interaction.customId == 'yes') {

                    //  ======= CoolDowns: 5s =======
                    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                        await interaction.reply('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
                        return;
                    }
                    cooldownPlayers.set(message.author.id, new Date().getTime());
                    // ===============================


                    // ================ AD SQUAD XP ================
                    squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName })
                    if(squad){
                        var randomxp = Math.floor(Math.random() * (playerStats.player.health / 60)) + 1;
                        addSquadXp(squad, randomxp)
                    }

                    // ================= LEVEL CONFIG =================
                    await interaction.reply({ embeds:[battle(Player_Attack, MonsterAttack, playerStats.player.health, MonsterHealth, MonsterDefense, Dodge_PLayer, Crit_PLayer, Math.floor(Math.random() * (playerStats.player.health*18)/10))], ephemeral: true });
                };
                if (interaction.customId == 'percentage') {
                    collector.options.max = 2

                    await interaction.reply({ embeds: [winPercentage()], ephemeral: true });
                }
                if (interaction.customId === 'no') await interaction.reply({content: `${inlineCode("😶‍🌫️")} You prefer to dodge the monster...`, ephemeral: true});
            });
            // [=========== BUTTON END ===========]
        };
    };
};

module.exports.info = {
    names: ['monster', 'm', 'mon'],
};
