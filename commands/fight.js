const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const EMOJICONFIG = require('../config/emoji.json');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { numStr } = require('../functionNumber/functionNbr.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 1.08e+7;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 3s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        var measuredTime = new Date(null);
        measuredTime.setSeconds(Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000)); // specify value of SECONDS
        var MHSTime = measuredTime.toISOString().substr(11, 8);
        message.channel.send('⌚ Please wait `' + MHSTime + ' hours` and try again.');
        return;
      }
    
      cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================
    
    var user = message.author
    var userInput = message.mentions.users.first();

    if (userInput === ' ' || userInput === '') return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("rfight <@user>")}`);
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
        if (!playerOne) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            // === Balance Player 1 : DataBase ===
            let balance = await BALANCEDATA.findOne({ userId: message.author.id });
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
            else {

                // === Player 2 : DataBase ===
                let playerTwo = await PLAYERDATA.findOne({ userId: userInput.id });
                if (!playerTwo) return message.reply(`${inlineCode('❌')} the user mentioned is not a player...`);
                else {

                    function battle(MAXATK_PLAYERONE, MAXATK_PLAYERTWO, HEALTH_PLAYERONE, HEALTH_PLAYERTWO, DEFENSE_PLAYERONE, DEFENSE_PLAYERTWO){
                        var NB_ATTACK_PLAYERONE = 0
                        var NB_ATTACK_PLAYERTWO = 0
                        var ATK_SOMME_PLAYERONE = 0
                        var ATK_SOMME_PLAYERTWO = 0
        
                        while(HEALTH_PLAYERONE != 0 || HEALTH_PLAYERTWO != 0){
                            // ========= Player 1 Fight =========
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
                                var losecoin = Math.floor((balance.eco.coins*5)/100)
                                balance.eco.coins -= losecoin

                                if(balance.eco.coins <= 0) balance.eco.coins = 0
                                balance.save()

                                // == Embed LOSE : ==
                                var battleEmbed = new Discord.MessageEmbed()
                                    .setColor('#000000')
                                    .setTitle(`${user.username}'s Battle`)
                                    .setDescription(`:crossed_swords: : ${user.username} ${inlineCode("🆚")} ${playerTwo.pseudo}\n`)
                                    .addFields(
                                    { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerOne.player.attack}\n**Defense** : ${playerOne.player.defense}\n**Health** : ${playerOne.player.health}\n`, inline: true },
                                    { name: `**🎯 ${playerTwo.pseudo.toUpperCase()} :**\n`, value: `**Attack** : ${playerTwo.player.attack}\n**Defense** : ${playerTwo.player.defense}\n**Health** : ${playerTwo.player.health}\n `, inline: true },
                                    { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYERONE} times** and did **${ATK_SOMME_PLAYERONE}** damage to ${playerTwo.pseudo}\n${playerTwo.pseudo} attacked **${NB_ATTACK_PLAYERTWO} times** and did **${ATK_SOMME_PLAYERTWO}** damage to you\n\n**${inlineCode('▶ 🪦 YOU LOSE...')}**\n${inlineCode('🎁')} You lose ${inlineCode('-' + numStr(losecoin) + `${EMOJICONFIG.coin}`)} (5% of your coins)`, inline: false },
                                    )
                                    .setTimestamp();
                                return battleEmbed
                            };
                            if (HEALTH_PLAYERTWO <= 0){
                                // ======================================
                                // =========== PLAYER ONE WIN ===========

                                var earnCoins = Math.floor(Math.random((playerOne.player.level * 55)));
                                balance.eco.coins += earnCoins
                                balance.save()
        
                                // == Embed WIN : ==
                                var battleEmbed = new Discord.MessageEmbed()
                                    .setColor('#000000')
                                    .setTitle(`${user.username}'s Battle`)
                                    .setDescription(`:crossed_swords: : ${user.username} ${inlineCode("🆚")} ${playerTwo.pseudo}\n`)
                                    .addFields(
                                        { name: '**🎯 YOU :**\n', value: `**Attack** : ${playerOne.player.attack}\n**Defense** : ${playerOne.player.defense}\n**Health** : ${playerOne.player.health}\n`, inline: true },
                                        { name: `**🎯 ${playerTwo.pseudo.toUpperCase()} :**\n`, value: `**Attack** : ${playerTwo.player.attack}\n**Defense** : ${playerTwo.player.defense}\n**Health** : ${playerTwo.player.health}\n `, inline: true },
                                        { name: '**📊 STATS :**\n', value: `You attacked **${NB_ATTACK_PLAYERONE} times** and did **${ATK_SOMME_PLAYERONE}** damage to ${playerTwo.pseudo}\n${playerTwo.pseudo} attacked **${NB_ATTACK_PLAYERTWO} times** and did **${ATK_SOMME_PLAYERTWO}** damage to you\n\n**${inlineCode('▶ 🎉 YOU WIN !')}**\n${inlineCode('🎁')} You earn ${inlineCode('+' + numStr(earnCoins))} ${EMOJICONFIG.coin}`, inline: false },
                                    )
                                    .setTimestamp();
                                return battleEmbed
                            };
                        };
                    };
                    // [================ Function Battle End ================]

                    function winPercentage(){
                        var playerA = playerTwo.player.attack
                        var playerH = playerTwo.player.health
                        var playerD = playerTwo.player.defense
        
                        var totalStatsPlayer = playerOne.player.attack * (playerOne.player.health + playerOne.player.defense)
                        var totalStatsMonster = playerA * (playerH + playerD)
        
                        var totalStats = totalStatsPlayer + totalStatsMonster
        
                        var percentageWin = (100 * totalStatsPlayer) / totalStats
        
                        var percentageWin = new Discord.MessageEmbed()
                            .setColor('#2f3136')
                            .setTitle(`🧮 ${user.username}'s Win %`)
                            .setDescription(`📰 ${inlineCode(user.username)} vs ${inlineCode(playerTwo.pseudo)}\n`)
                            .addFields(
                                {name: `🪧 Your Stats:`, value:`${inlineCode("💥")}: ${playerOne.player.attack}\n${inlineCode("🛡️")}: ${playerOne.player.defense}\n${inlineCode("❤️")}: ${playerOne.player.health}`, inline: true},
                                {name: `🪧 ${playerTwo.pseudo.toUpperCase()} Stats:`, value:`${inlineCode("💥")}: ${playerA}\n${inlineCode("🛡️")}: ${playerD}\n${inlineCode("❤️")}: ${playerH}`, inline: true},
                                {name: `📭 Result :`, value:`🍀 Your percentage chance of winning is : **${Math.floor(percentageWin)}%**`, inline: false},
                            )
                            .setTimestamp();
                        return percentageWin
                    };

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

                            new MessageButton()
                                .setCustomId('percentage')
                                .setLabel('WIN %')
                                .setStyle('SECONDARY'),
                        );
        
                    const embedMessage = new MessageEmbed()
                        .setColor('#ff0000')
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

                        if (interaction.customId == 'percentage') {
                            collector.options.max = 2
        
                            await interaction.reply({ embeds: [winPercentage()], ephemeral: true });
                        };

                        if(interaction.customId === 'no') await interaction.reply('YOU AFRAID HAHHAHAHAHH !!');
                    });
                };
            };
        };
    } else return message.reply(`${inlineCode('❌')} player undefined : ${inlineCode("rduel <@user>")}`);
};

module.exports.info = {
  names: ['fight'],
};
