const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var squadNameAttack = args[0]

    if(squadNameAttack == undefined || squadNameAttack == ' ' || squadNameAttack == '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gattacksquad <squadname>")}`);

    function playerInSquad(playerStats){
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {
            if(playerStats.player.other.squadName != 'undefined') return true
        }
        return false
    };

    // == Player DB ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // == Squad DB ==
        let squadPLayer = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
        if (!squadPLayer) return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`)
        else {
            
            // == Squad DB ==
            let squadEnemy = await SQUADDATA.findOne({ squadName: squadNameAttack });
            if (!squadEnemy) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
            else {

                if(squadPLayer.squadName == squadEnemy.squadName || squadPLayer.leader[0] == squadEnemy.leader[0]) return message.reply(`${inlineCode("😵‍💫")} You can't attack your squad...`)
                // === Player is in Squad ===
                if(playerInSquad(playerStats)){
                    // === Initialize Player is the leader of the team ===
                    if(playerStats.userId === squadPLayer.leader[0]){

                        var memberLenght
                        if(squadEnemy.member.length == undefined) memberLenght = 0
                        else memberLenght = squadEnemy.member.length

                        function addSquadXp(squad){
                            if(squad){
                                squad.squadXp += Math.floor(Math.random() * 10000) + 1;
                                squad.save()
                            };
                        };

                        function squadBattle(squadPlayerAttack, squadPlayerHealth, squadEnemyAttack, squadEnemyHealth){
                            var healthSquadPlayer = squadPlayerHealth
                            var totalDamageSquadPLayer = 0

                            var healthSquadEnemy = squadEnemyHealth
                            var totalDamageSquadEnemy = 0

                            var round = 0

                            while(healthSquadPlayer != 0 || healthSquadEnemy != 0){
                                round += 1

                                // == Squad Player Attack ==
                                var playerDamage = Math.floor(Math.random() * squadPlayerAttack) + 1;
                                healthSquadEnemy -= playerDamage;

                                totalDamageSquadPLayer += playerDamage
                                
                                // == Squad Ennemi Attack ==
                                var ennemiDamage = Math.floor(Math.random() * squadEnemyAttack) + 1
                                healthSquadPlayer -= ennemiDamage;

                                totalDamageSquadEnemy += ennemiDamage
                                

                                if(healthSquadPlayer <= 0){
                                    var loseCoin = Math.floor((squadPLayer.squadbank * 5)/100)
                                    var squadBank = squadPLayer.squadbank
                                    addSquadXp(squadPLayer)

                                    if((squadBank -= loseCoin) <= 0) squadPLayer.squadbank = 0
                                    else squadPLayer.squadbank -= loseCoin
                                    squadPLayer.save()

                                    var squadPlayerLose = new Discord.MessageEmbed()
                                        .setColor('#ec2323')
                                        .setTitle(`🗿 Squad Attack ${inlineCode(squadEnemy.squadName)}`)
                                        .setDescription(`${inlineCode(squadPLayer.squadName)} vs ${inlineCode(squadEnemy.squadName)}`)
                                        .addFields(
                                            { name: `🗿 ${inlineCode(squadEnemy.squadName + " Boss")}`, value: `${inlineCode("💥")}: ${squadEnemy.squadboss.bossattack}\n${inlineCode("🛡️")}: ${"soon"}\n${inlineCode("❤️")}: ${squadEnemy.squadboss.bosshealth}`, inline: true},
                                            { name: `🗿 ${inlineCode("Your Boss")}`, value: `${inlineCode("💥")}: ${squadPLayer.squadboss.bossattack}\n${inlineCode("🛡️")}: ${"soon"}\n${inlineCode("❤️")}: ${squadPLayer.squadboss.bosshealth}`, inline: true},
                                            { name: `📊 STATS :`, value: `You attack ${inlineCode(round)} times and do ${inlineCode(totalDamageSquadPLayer)} damage to the enemy boss.\nThe enemy boss attacks ${inlineCode(round)} times and does ${inlineCode(totalDamageSquadEnemy)} damage to your boss.\n\n**${inlineCode("☠️ YOUR SQUAD LOSE!")}**\n${inlineCode("📜")} You lose ${loseCoin} 🪙 from your squad bank`, inline: false},
                                        )
                                        .setTimestamp();
                                    return squadPlayerLose
                                };

                                if(healthSquadEnemy <= 0){
                                    var earnCoin = Math.floor((squadPLayer.squadbank * 5)/100)
                                    addSquadXp(squadEnemy)

                                    squadPLayer.squadbank += earnCoin
                                    squadPLayer.save()

                                    var squadPlayerWin = new Discord.MessageEmbed()
                                        .setColor('#23ec37')
                                        .setTitle(`🗿 Squad Attack ${inlineCode(squadEnemy.squadName)}`)
                                        .setDescription(`${inlineCode(squadPLayer.squadName)} vs ${inlineCode(squadEnemy.squadName)}`)
                                        .addFields(
                                            { name: `🗿 ${inlineCode(squadEnemy.squadName + " Boss")}`, value: `${inlineCode("💥")}: ${squadEnemy.squadboss.bossattack}\n${inlineCode("🛡️")}: ${"soon"}\n${inlineCode("❤️")}: ${squadEnemy.squadboss.bosshealth}`, inline: true},
                                            { name: `🗿 ${inlineCode("Your Boss")}`, value: `${inlineCode("💥")}: ${squadPLayer.squadboss.bossattack}\n${inlineCode("🛡️")}: ${"soon"}\n${inlineCode("❤️")}: ${squadPLayer.squadboss.bosshealth}`, inline: true},
                                            { name: `📊 STATS :`, value: `You attack ${inlineCode(round)} times and do ${inlineCode(totalDamageSquadPLayer)} damage to the enemy boss.\nThe enemy boss attacks ${inlineCode(round)} times and does ${inlineCode(totalDamageSquadEnemy)} damage to your boss.\n\n**${inlineCode("🥱 YOUR SQUAD WINS!")}**\n${inlineCode("📜")} You earn ${earnCoin} 🪙 from your squad bank`, inline: false},
                                        )
                                        .setTimestamp();
                                    return squadPlayerWin
                                };
                            };
                        };

                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('yes')
                                    .setLabel('ATTACK')
                                    .setStyle('SUCCESS'),

                                new MessageButton()
                                    .setCustomId('no')
                                    .setLabel("I AM AFFRAID")
                                    .setStyle('DANGER'),
                            );

                        var squadAttackMessage = new Discord.MessageEmbed()
                            .setColor('#2f3136')
                            .setTitle(`🗿 Squad Attack ${inlineCode(squadEnemy.squadName)}`)
                            .setDescription(`🪧 Name of the squad to attack : ${inlineCode(squadEnemy.squadName)}\n🀄 Leader : ${inlineCode(squadEnemy.leader[1])}\n🎎 Level : ${inlineCode(Math.floor(squadEnemy.squadXp / 1000))}\n👥 Member(s) : ${inlineCode(memberLenght)}\n\n🗿 Squad Bosses: 💥: ${inlineCode(squadEnemy.squadboss.bossattack)} **/** ❤️: ${inlineCode(squadEnemy.squadboss.bosshealth)}`)
                            .setTimestamp();
                        const msg = await message.reply({embeds: [squadAttackMessage], components: [row]});
                        
                        const collector = msg.createMessageComponentCollector({
                            componentType: "BUTTON",
                            max: 1,
                            time: 30_000
                        });

                        collector.on('collect', async interaction => {
                            if (interaction.customId == 'yes') {

                                //  ======= CoolDowns: 15s =======
                                if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                                    await interaction.reply('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
                                    return;
                                }
                                cooldownPlayers.set(message.author.id, new Date().getTime());
                                // ===============================

                                await interaction.reply({ embeds: [squadBattle(squadPLayer.squadboss.bossattack, squadPLayer.squadboss.bosshealth, squadEnemy.squadboss.bossattack, squadEnemy.squadboss.bosshealth)], ephemeral: true });
                            };
                            if (interaction.customId == 'no') {
                                await interaction.reply({ content: 'You were afraid, the fight is cancelled', ephemeral: true });
                            }
                        });
                    } else return message.reply(`${inlineCode("😵‍💫")} you are not the leader of the squad: ${inlineCode(squadPLayer.squadName)}`);
                } else return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`);
            };
        };
    };
};

module.exports.info = {
    names: ['squadattack', 'attacksquad', 'squadA'],
};
