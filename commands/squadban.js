const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var userBan = message.mentions.users.first()

    if(userBan == undefined || userBan == ' ' || userBan == '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gban <@user>")}`);

    function playerInSquad(userBan, player){
        if(userBan.player.other.squadName != 'undefined' && userBan.player.other.squadName == player.player.other.squadName) return true
        else return false
    };

    // == Player DB ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // == Squad DB ==
        let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`)
        else {

            if(user.id != squad.leader[0]) return message.reply(`${inlineCode("😵‍💫")} you are not the leader of the squad: ${inlineCode(squad.squadName)}`); 
            
            let playerBan = await PLAYERDATA.findOne({ userId: userBan.id });
            if(playerInSquad(playerBan, playerStats)){
                
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('yes')
                            .setLabel('BAN')
                            .setStyle('SUCCESS'),

                        new MessageButton()
                            .setCustomId('no')
                            .setLabel('DO NOT BAN')
                            .setStyle('DANGER'),
                    );

                var banMessage = new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setTitle(`🎓 Ban ${playerBan.pseudo} from ${inlineCode(squad.squadName)}`)
                    .setDescription(`Do you want to ban "${playerBan.pseudo}" from your squad: ${inlineCode(squad.squadName)}`)
                    .setTimestamp();
                const msg = await message.reply({embeds: [banMessage], components: [row]});
                
                const collector = msg.createMessageComponentCollector({
                    componentType: "BUTTON",
                    max: 1,
                    time: 30_000
                });

                collector.on('collect', async interaction => {
                    if (interaction.customId == 'yes') {

                        playerBan.player.other.squadName = 'undefined'
                        playerBan.player.other.squadCoinGiven = 0
                        playerBan.save()

                        for(const allMember of squad.member){
                            var index = squad.member.id.indexOf(userBan.id)
                            squad.member.splice(index, 1)
                        }
                        squad.save()

                        await interaction.reply({ content: `✅ ${playerBan.pseudo} has been successfully banned from your squad`, ephemeral: true });
                    };
                    if (interaction.customId == 'no') {
                        await interaction.reply({ content: `🥵 You have cancelled the ban of ${playerBan.pseudo}`, ephemeral: true });
                    }
                });
            } else return message.reply(`${inlineCode("😵‍💫")} The user mentioned is not in the same squad as you...`) 
        };
    };
};

module.exports.info = {
    names: ['ban', 'bansquad', 'squadban'],
};
