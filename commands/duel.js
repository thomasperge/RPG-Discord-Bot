const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userInput = message.mentions.users.first();

    if (userInput === ' ' || userInput === '') return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("gduel <@user>")}`);
    if (user === userInput) return message.reply(`${inlineCode('❌')} it's not good to want to cheat...`);

    // === Try if player are real ===
    function userReal(userInput){
        try {
            var test = userInput.id
            return true
        } catch {
            return false
        }
    };

    // === Add Xp for his squad ===
    function addSquadXp(squad, xpUserEarn){
        if (!squad) return
        else {
            squad.squadXp += Math.floor(xpUserEarn * 0.15)
            squad.save()
        }
    };

    if(userReal(userInput)){

        // === Player 1 : DataBase ===
        let playerOne = await PLAYERDATA.findOne({ userId: message.author.id });
        if (!playerOne) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            // === Balance Player 1 : DataBase ===
            let balance = await BALANCEDATA.findOne({ userId: message.author.id });
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {

                // === Player 2 : DataBase ===
                let playerTwo = await PLAYERDATA.findOne({ userId: userInput.id });
                if (!playerTwo) return message.reply(`${inlineCode('❌')} player 2 are not a player : ${inlineCode('gstart')}`);
                else {

                    function battle(MAXATK_PLAYERONE, MAXATK_PLAYERTWO, HEALTH_PLAYERONE, HEALTH_PLAYERTWO, DEFENSE_PLAYERONE, DEFENSE_PLAYERTWO){
                        var maxAtkP1 = MAXATK_PLAYERONE
                        var maxAtkP2 = MAXATK_PLAYERTWO
                        var NB_ATTACK_PLAYERONE = 0
                        var NB_ATTACK_PLAYERTWO = 0
                        var ATK_SOMME_PLAYERONE = 0
                        var ATK_SOMME_PLAYERTWO = 0
                        var ULTIMATEREFLECT = ''
                        var ULTIMATEHEAL = ''
                        var ULTIMATELUCKYSTRIKE = ''
        
                        while(HEALTH_PLAYERONE != 0 || HEALTH_PLAYERTWO != 0){
                            // ========= Player 1 Fight =========
                            var randomUltimateReflect_one = Math.floor(Math.random() * 100)
                            var randomUltimateHeal_one = Math.floor(Math.random() * 100)
                            var randomUltimateLuckyStrike_one = Math.floor(Math.random() * 100)

                            if(randomUltimateReflect_one < playerOne.player.ultimate.reflect) ULTIMATEREFLECT = '\n📜 You use your Ultimate: `Reflect` :mirror:'
                            if(randomUltimateHeal_one < playerOne.player.ultimate.heal) ULTIMATEHEAL = '\n📜 You use your Ultimate: `Heal` :four_leaf_clover:'
                            if(randomUltimateLuckyStrike_one < playerOne.player.ultimate.luckyStrike) ULTIMATELUCKYSTRIKE = '\n📜 You use your Ultimate: `Lucky Strike` :mending_heart:'

                            var attackDamagePLayerOne = Math.floor(Math.random() * MAXATK_PLAYERONE) + 1
                            NB_ATTACK_PLAYERONE += + 1
                            ATK_SOMME_PLAYERONE += attackDamagePLayerOne
                            
                            HEALTH_PLAYERTWO -= attackDamagePLayerOne;
                            
        
                            // ========= Player 2 Fight =========
                            var attackDamagePLayerTwo = Math.floor(Math.random() * MAXATK_PLAYERTWO) + 1;
                            NB_ATTACK_PLAYERTWO += 1;
                            ATK_SOMME_PLAYERTWO += attackDamagePLayerTwo;

                            HEALTH_PLAYERONE -= attackDamagePLayerTwo;
                            
        
        
                            if (HEALTH_PLAYERONE <= 0){
                                // =================================
                                // ======== PLAYER ONE LOSE ========

                                if(playerOne.player.elo >= playerTwo.player.elo){
                                    var loseELO = Math.floor(Math.random() * 30) + 16;
                                } else if(playerOne.player.elo < playerTwo.player.elo){
                                    var loseELO = Math.floor(Math.random() * 16) + 2;
                                }

                                balance.elo -= loseELO
                                balance.save()
        
                                // == Embed LOSE : ==
                                var battleEmbed = new Discord.MessageEmbed()
                                    .setColor('#9696ab')
                                    .setAuthor(`${user.username}'s Battle`)
                                    .setDescription(`:crossed_swords: : ${user.username} ${inlineCode("🆚")} ${playerTwo.pseudo}\n`)
                                    .addFields(
                                    { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerOne.player.attack}\n**Defense** : ${playerOne.player.defense}\n**Health** : ${playerOne.player.health}\n`, inline: true },
                                    { name: `**🎯 ${playerTwo.pseudo.toUpperCase()} :**\n`, value: `**Attack** : ${playerTwo.player.attack}\n**Defense** : ${playerTwo.player.defense}\n**Health** : ${playerTwo.player.health}\n `, inline: true },
                                    { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYERONE} times** and did **${ATK_SOMME_PLAYERONE}** damage to ${playerTwo.pseudo}\n${playerTwo.pseudo} attacked **${NB_ATTACK_PLAYERTWO} times** and did **${ATK_SOMME_PLAYERTWO}** damage to you\n${ULTIMATEREFLECT}${ULTIMATEHEAL}${ULTIMATELUCKYSTRIKE}\n\n**${inlineCode('▶ 🪦 YOU LOSE...')}**\n${inlineCode('🎁')} You lose -${loseELO} ELO`, inline: false },
                                    )
                                    .setFooter('© RPG Bot 2022 | ghelp')
                                    .setTimestamp();
                                return battleEmbed
                            };
                            if (HEALTH_PLAYERTWO <= 0){
                                // ======================================
                                // =========== PLAYER ONE WIN ===========

                                if(playerOne.player.elo >= playerTwo.player.elo){
                                    var earnELO = Math.floor(Math.random() * 30) + 16;
                                } else if(playerOne.player.elo < playerTwo.player.elo){
                                    var earnELO = Math.floor(Math.random() * 16) + 2;
                                }


                                balance.elo += earnELO
                                balance.save()
        
                                // == Embed WIN : ==
                                var battleEmbed = new Discord.MessageEmbed()
                                    .setColor('#fc9803')
                                    .setAuthor(`${user.username}'s Battle`)
                                    .setDescription(`:crossed_swords: : ${user.username} ${inlineCode("🆚")} ${playerTwo.pseudo}\n`)
                                    .addFields(
                                        { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerOne.player.attack}\n**Defense** : ${playerOne.player.defense}\n**Health** : ${playerOne.player.health}\n`, inline: true },
                                        { name: `**🎯 ${playerTwo.pseudo.toUpperCase()} :**\n`, value: `**Attack** : ${playerTwo.player.attack}\n**Defense** : ${playerTwo.player.defense}\n**Health** : ${playerTwo.player.health}\n `, inline: true },
                                        { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYERONE} times** and did **${ATK_SOMME_PLAYERONE}** damage to ${playerTwo.pseudo}\n${playerTwo.pseudo} attacked **${NB_ATTACK_PLAYERTWO} times** and did **${ATK_SOMME_PLAYERTWO}** damage to you\n${ULTIMATEREFLECT}${ULTIMATEHEAL}${ULTIMATELUCKYSTRIKE}\n\n**${inlineCode('▶ 🎉 YOU WIN !')}**\n${inlineCode('🎁')} You earn +${earnELO} ELO`, inline: false },
                                    )
                                    .setFooter('© RPG Bot 2022 | ghelp')
                                    .setTimestamp();
                                return battleEmbed
                            };
                        };
                    };
                    // [================ Function Battle End ================]



                    // [=========== BUTTON MESSAGE ===========]
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
                        );
        
                    const embedMessage = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${user.username}'s Battle`)
                        .addFields(
                            { name: '**📊 YOU :**\n', value: `${inlineCode("💥")}: ${playerOne.player.attack}\n${inlineCode("🛡️")}: ${playerOne.player.defense}\n${inlineCode("❤️")}: ${playerOne.player.health}`, inline: true},
                            { name: `**🎯 ${playerTwo.pseudo.toUpperCase()} :**\n`, value: `${inlineCode("💥")}: ${playerTwo.player.attack}\n${inlineCode("🛡️")}: ${playerTwo.player.defense}\n${inlineCode("❤️")}: ${playerTwo.player.health}`, inline: true},
                        )
                        .setTimestamp()
        
                    const msg = await message.reply({ embeds: [embedMessage], components: [row] });
        
                    const collector = msg.createMessageComponentCollector({
                        componentType: "BUTTON",
                        max: 1, // Seulement pour 1 joueur !
                        time: 15_000 // how long you want it to collect for, in ms (this is 15 seconds)
                    });
                    
                    collector.on('collect', async interaction => {
                        if (interaction.customId == 'yes') {
        
                        // ================ AD SQUAD XP ================
                        squad = await SQUADDATA.findOne({ squadName: playerOne.player.other.squadName })
    
                        var randomxp = Math.floor(Math.random() * (playerOne.player.health / 60)) + 1;
                        addSquadXp(squad, randomxp)
    
                        // ================= LEVEL CONFIG =================
                        if(interaction.user.id === message.author.id) await interaction.reply({ embeds:[battle(playerOne.player.attack , playerTwo.player.attack, playerOne.player.health, playerTwo.player.health, playerOne.player.defense, playerTwo.player.defense)], ephemeral: true });
                        else await interaction.reply({ content: 'Hummm... What do you want to do?', ephemeral: true });

        
                        };
                        if(interaction.customId === 'no') await interaction.reply('YOU AFRAID HAHHAHAHAHH !!!!!!');
                    });
                };
            };
        };
    } else return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("gduel <@user>")}`);
};

module.exports.info = {
  names: ['duel'],
};
