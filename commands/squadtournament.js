const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const SQUADTOURNAMENT = require('../modules/squadtournament.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var nameTournament = args[0]

    if(nameTournament === '' || nameTournament === '' || nameTournament == undefined) return message.reply(`${inlineCode("β")} error command, type: ${inlineCode("gsquadtournament <name tournament>")}`);

    // == Tournament DB ==
    let squadTournament = await SQUADTOURNAMENT.findOne({ squadTournamentName: nameTournament });
    if (!squadTournament) return message.reply(`${inlineCode("πΆβπ«οΈ")} this tournament name does not exist...`);
    else {

        var allMember = ``
        for(const allMemberInT of squadTournament.squadMember){
            allMember += `${inlineCode(allMemberInT.nameSquad)}, `            
        }

        var squadTournamentEmbed = new Discord.MessageEmbed()
            .setColor('#6d4534')
            .setTitle(`πͺ Squad Tournament`)
            .setDescription(`πͺ§ **${squadTournament.squadTournamentName}** Squad Tournament\nπ Organizer: ${inlineCode(squadTournament.squadTournamantLeader[0].pseudo)}\nπ Number of squads: ${inlineCode(squadTournament.squadMember.length)} (max: ${squadTournament.maxSquad})\nπ₯ Participating Squad(s) : ${allMember}`)
            .setTimestamp();
        return message.reply({embeds: [squadTournamentEmbed]});

    };
};

module.exports.info = {
    names: ['squadTournament', 'squadtournament', 'tournament', 'Tournament', 'st', 'St', 'St', 'squadT', 'squadt'],
};
