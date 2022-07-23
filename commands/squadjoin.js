const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 12h =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
    }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================

    var user = message.author;
    var squadNameJoin = args[0]

    if(squadNameJoin === '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gjoinsquad <squad name>")}`)
    else if(squadNameJoin === ' ') message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gjoinsquad <squad name>")}`)
    else if(squadNameJoin === undefined) message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gjoinsquad <squad name>")}`)
    else if(squadNameJoin != undefined) {

        function playerInSquad(playerStats){
            if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {
                if(playerStats.player.other.squadName != 'undefined') return true
            }
            return false
        }

        // == Squad Db ==
        let squad = await SQUADDATA.findOne({ squadName: squadNameJoin });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
        else {

            // == Balance Db ==
            let balance = await BALANCEDATA.findOne({ userId: message.author.id });
            if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
            else {

                // == Player Db ==
                let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });
                if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
                else {

                    if(playerInSquad(playerStats) == false){
                        if(balance.eco.coins <= 150) return message.reply(`${inlineCode("😬")} you don't have ${inlineCode('150')} 🪙 to join a squad...`)
                        else {

                            if(squad.member.lenght >= 20) return message.reply(`${inlineCode("😵‍💫")} squad are full (max 20)...`)
                            else {

                                // ========== Button Squad Join ==========
                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('yes')
                                            .setLabel('JOIN ✅')
                                            .setStyle('SUCCESS'),
                                        
                                        new MessageButton()
                                            .setCustomId('no')
                                            .setLabel('CANCEL ❌')
                                            .setStyle('DANGER'),
                                    );
                        
                                const squadEmbedRow = new MessageEmbed()
                                    .setColor('#4dca4d')
                                    .setTitle(`🛖 Join ${squad.squadName}'s squad ?`)
                                    .setDescription(`Click JOIN ✅ to join ${inlineCode('or')} Click CANCEL ❌ to canceled`)
                                    .setTimestamp();
                                message.reply({embeds: [squadEmbedRow], components: [row] });

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
                                        // ========== YES: JOIN the SQUAD ==========
                                        squad.member.push({id: user.id, pseudo: user.username})
                                        squad.save()

                                        playerStats.player.other.squadName = squadNameJoin
                                        playerStats.save()

                                        var squadEmbed = new Discord.MessageEmbed()
                                            .setColor('#4dca4d')
                                            .setTitle(`🛖 You join ${squad.squadName + "'s"} squad`)
                                            .setDescription(`✅ New squad Member: ${inlineCode(user.username)}\n✨ Congrats you have sucessfully join your new squad !<\n👑 Leader : ${inlineCode(squad.leader[1])}\n👥 Member(s): ${inlineCode(squad.member.length), '+1'}\n📦 Earn Xp to improve your squad level !`)
                                            .setFooter('© RPG Bot 2022 | ghelp')
                                            .setTimestamp();
                                        return message.reply({embeds: [squadEmbed]});
                                        
                                    }
                                    if(id === 'no') return message.reply(`You canceled ❌`)
                                });

                            } 
                        }
                    } else return message.reply(`${inlineCode("😵‍💫")} you are already in a squad...`) 
                }
            }
        }
    }
}

module.exports.info = {
    names: ['joinsquad', 'squadjoin', 'jointeam', 'teamjoin'],
};
