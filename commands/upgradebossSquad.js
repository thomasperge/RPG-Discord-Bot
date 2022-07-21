const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 2min =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;
    var itemUpgrade = args[0]
    var amoutUpgrade = parseInt(args[1])

    if(itemUpgrade === '' || amoutUpgrade === '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gupgradesquadboss/gusb <attack/health> <amout>")}`);
    else if(itemUpgrade === ' ' || amoutUpgrade === ' ') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gupgradesquadboss/gusb <attack/health> <amout>")}`);
    else if(itemUpgrade === undefined || amoutUpgrade === undefined) return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gupgradesquadboss/gusb <attack/health> <amout>")}`);
    else if(isNaN(amoutUpgrade)) return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gugradesquadboss/gusb <attack/health> <amout>")}`);
    else if((itemUpgrade == 'attack' || itemUpgrade == 'atk' || itemUpgrade == 'a' || itemUpgrade == 'health' || itemUpgrade == 'hlh' || itemUpgrade == 'h') && isNaN(amoutUpgrade) == false) {

        function playerInSquad(playerStats){
            if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {
                if(playerStats.player.other.squadName != 'undefined') return true
            }
            return false
        }

        // == Player DB ==
        let playerStats = await PLAYERDATA.findOne({ userId: user.id });
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            // == Squad DB ==
            let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
            if (!squad) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
            else {

                // === Player is in Squad ===
                if(playerInSquad(playerStats)){

                    // === Check amout balance eco Bank ===
                    if(squad.squadbank >= amoutUpgrade){

                        // === Initialize Player is the leader of the team ===
                        if(playerStats.userId === squad.leader[0]){

                            function upgradeBossMessage(done, emojiDone, price, amoutUpgrade){
                                // ===== Row Button =====
                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('yes')
                                            .setLabel('✅ Upgrade Boss')
                                            .setStyle('SUCCESS'),
                                        
                                        new MessageButton()
                                            .setCustomId('no')
                                            .setLabel('❌ Cancel')
                                            .setStyle('DANGER'),
                                );

                                const upgradeBoss = new MessageEmbed()
                                    .setColor('#4dca4d')
                                    .setAuthor(`🗿 Upgrade Squad Boss`)
                                    .setDescription(`🛖 Squad : ${inlineCode(squad.squadName)} by ${inlineCode(squad.leader[1])}\n🪧 Improve ${done}: ${inlineCode('+' + amoutUpgrade)} ${emojiDone}\n📝 Balance Squad Cost: ${inlineCode(price)} 🪙`)
                                    .setTimestamp();
                                message.reply({embeds: [upgradeBoss], components: [row]});


                                // ========== Filter & Collector ==========
                                const filter = (interaction)  => {
                                    if(interaction.user.id === message.author.id) return true
                                    return interaction.reply({ content: 'You cant use this button' })
                                };
                                const collector = message.channel.createMessageComponentCollector({
                                    filter, 
                                    max: 1
                                });
                            
                                collector.on('end', (ButtonInteraction) => {
                                    ButtonInteraction.first().deferUpdate()
                                    const id = ButtonInteraction.first().customId

                                    if(id === 'yes'){
                                        // ========== YES: UPGRADE the SQUAD BOSS ==========
                                        if(done == 'attack'){
                                            squad.squadboss.bossattack += amoutUpgrade
                                            squad.squadbank -= price
                                            squad.save() 
                                        };

                                        if(done == 'health'){
                                            squad.squadboss.bosshealth += amoutUpgrade
                                            squad.squadbank -= price
                                            squad.save() 
                                        };

                                        var upgradeDone = new Discord.MessageEmbed()
                                            .setColor('#4dca4d')
                                            .setTitle(`🗿 Boss Upgrade`)
                                            .setDescription(`✅ Squad Boss Upgrading !\n🪧 Improve ${done}: ${inlineCode('+' + amoutUpgrade)} ${emojiDone}\n📝 Cost: ${inlineCode(price)} 🪙`)
                                            .setTimestamp();
                                        return message.reply({embeds: [upgradeDone]});
                                    }
                                    if(id === 'no') return message.reply(`You canceled ❌`)
                                });
                            };
                            // === End Function ===

                            if(itemUpgrade == 'attack' || itemUpgrade == 'atk' || itemUpgrade == 'a'){
                                return upgradeBossMessage('attack', '💥', Math.floor(amoutUpgrade * 112.2), amoutUpgrade) 

                            } else if(itemUpgrade == 'health' || itemUpgrade == 'hlh' || itemUpgrade == 'h'){
                                return upgradeBossMessage('health', '❤️', Math.floor(amoutUpgrade * 7.4), amoutUpgrade) 
                            };

                        } else return message.reply(`${inlineCode("😵‍💫")} you are not the leader of the squad...`);
                    } else return message.reply(`${inlineCode("😵‍💫")} your balance squad don't have enought money...`);
                } else return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`);
            };
        };
    };
};

module.exports.info = {
    names: ['upgradesquadboss', 'usb', 'upgradesquadboss', 'squadbossimprove', 'upgsboss', 'upgradeteamboss', 'bosslevel', 'levelboss', 'improveboss', 'bossup', 'upboss'],
};
