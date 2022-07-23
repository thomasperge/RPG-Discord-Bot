const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const SQUADTOURNAMENT = require('../modules/squadtournament.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var nameTournament = args[0]
    var priceJoin = 250000

    if(nameTournament === '' || nameTournament === '' || nameTournament == undefined) return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gjoinTournament <name tournament>")}`);

    function playerInSquad(playerStats){
        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {
            if(playerStats.player.other.squadName != 'undefined') return true
        }
        return false
    };

    function countSquadMemberTournament(squadTournament){
        var numberSquad = squadTournament.squadMember.length
        if(numberSquad == squadTournament.maxSquad || numberSquad >= squadTournament.maxSquad) return false
        else return true
    };

    function playerIsAlreadyInTournament(squadTournament, playerStats){
        for(const allSquad of squadTournament.squadMember){
            if(allSquad.nameSquad == playerStats.player.other.squadName) return false
        }
        return true
    }

    // == Player DB ==
    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        // == Squad DB ==
        let squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName });
        if (!squad) return message.reply(`${inlineCode("😵‍💫")} squad are not available...`)
        else {

            // == Tournament DB ==
            let squadTournament = await SQUADTOURNAMENT.findOne({ squadTournamentName: nameTournament });
            if (!squadTournament) return message.reply(`${inlineCode("😵‍💫")} This tournament does not exist...`)
            else {

                // === Player is in Squad ===
                if(playerInSquad(playerStats)){

                    // == Player are already in a tournament ==
                    if(playerIsAlreadyInTournament(squadTournament, playerStats)){

                        // === Check amout balance eco Bank ===
                        if(squad.squadbank >= priceJoin){

                            // === Initialize Player is the leader of the team ===
                            if(playerStats.userId === squad.leader[0]){

                                if(countSquadMemberTournament(squadTournament)){

                                    squad.squadbank -= priceJoin;
                                    squad.save();

                                    squadTournament.squadMember.push({ nameSquad: squad.squadName, squadLeader: squad.leader[1], totalMember: squad.member.length});
                                    squadTournament.save();

                                    return message.reply(`${inlineCode("✅")} 🎪 You join the ${inlineCode(squadTournament.squadTournamentName + " 's")} tournament!`)

                                } else return message.reply(`${inlineCode("😵‍💫")} There are too many squads in this tournament, the creator decided that the maximum number of squads would be : ${inlineCode(squadTournament.maxSquad)}`);
                            } else return message.reply(`${inlineCode("😵‍💫")} you are not the leader of the squad...`);
                        } else return message.reply(`${inlineCode("😵‍💫")} your balance squad don't have enought money...\nIt takes ${priceJoin} 🪙 to join a squad tournament`);
                    } else return message.reply(`${inlineCode("😵‍💫")} you are already in a tournament...`);
                } else return message.reply(`${inlineCode("😵‍💫")} you are not in a squad...`);
            };
        };
    };
};

module.exports.info = {
    names: ['joinSquadTournament', 'joinsquadtournament', 'jointournament', 'joinTournament', 'joinST', 'joinT', 'jointour', 'joinsquadtour'],
};
