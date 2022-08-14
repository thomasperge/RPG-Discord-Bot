const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    var user = message.author;

    function playerInSquad(userBan, player){
        if(userBan.player.other.squadName != 'undefined' && userBan.player.other.squadName == player.player.other.squadName) return true
        else return false
    };

    // == Player DB ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        // == Squad DB ==
        let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`)
        else {

                
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('LEAVE')
                        .setStyle('SUCCESS'),

                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('DO NOT LEAVE')
                        .setStyle('DANGER'),
                );

                var banMessage = new Discord.MessageEmbed()
                    .setColor('#2a941a')
                    .setTitle(`🎓 Leaving the squad`)
                    .setDescription(`🪧 Do you want to leave ${inlineCode(squad.squadName + " 's")} squad?`)
                    .setTimestamp();
                const msg = await message.reply({embeds: [banMessage], components: [row]});
                
                const collector = msg.createMessageComponentCollector({
                    componentType: "BUTTON",
                    max: 1,
                    time: 30_000
                });

                collector.on('collect', async interaction => {
                    if (interaction.customId == 'yes') {

                        playerStats.player.other.squadName = 'undefined'
                        playerStats.player.other.squadCoinGiven = 0
                        playerStats.save()

                        for(const allMember of squad.member){
                            var index = squad.member.id.indexOf(user.id)
                            squad.member.splice(index, 1)
                        }
                        squad.save()

                        await interaction.reply({ content: `✅ You left your squad well!`, ephemeral: true });
                    };
                    if (interaction.customId == 'no') {
                        await interaction.reply({ content: `🥵 You'd rather stay in your squad!`, ephemeral: true });
                    }
                });
        };
    };
};

module.exports.info = {
    names: ['leave', 'leavesquad', 'squadleave', 'squadL', 'squadl', 'leaveS', 'leaves'],
};
