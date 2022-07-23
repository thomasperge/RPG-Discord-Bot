const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')
const PLAYERDATA = require('../modules/player.js');
const SQUADTOURNAMENT = require('../modules/squadtournament.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var nameTournament = args[0]
    var leaderboard = []
    var messageEmbedResult = ``

    async function squadTournamentBattle(squadTournament){
        for(const allSquad of squadTournament.squadMember){
            let squad = await SQUADDATA.findOne({ squadName: allSquad.nameSquad });

            var randomXp = Math.floor((Math.random() * squad.squadXp) / 2500) + Math.floor(squad.squadXp / 3500);
            var randomCoin = Math.floor((Math.random() * squad.squadbank) / 10000) + Math.floor(squad.squadbank / 11500);
            var randomStats = Math.floor((Math.random() * (squad.squadboss.bossattack + squad.squadboss.bosshealth + squad.squadboss.bossdefense)) / 1250) + Math.floor((squad.squadboss.bossattack + squad.squadboss.bosshealth + squad.squadboss.bossdefense) / 2500);

            var aura = Math.floor((randomXp + randomCoin + randomStats) / 4);
            leaderboard.push({ squadName: squad.squadName, aura: aura });
        };

        leaderboard.sort((a, b) => a.aura - b.aura);
        leaderboard.reverse();

        var resultplace = 0
        var emoji

        for(const result of leaderboard){
            resultplace += 1

            if(resultplace == 1) emoji = "🥇"
            else if(resultplace == 2) emoji = "🥈"
            else if(resultplace == 3) emoji = "🥉"
            else emoji = "🎖️"

            messageEmbedResult += `${emoji} **#${resultplace}** ${inlineCode(result.squadName)} : ${result.aura} pts\n`
        };

        var squadTournamentEmbed = new Discord.MessageEmbed()
                .setColor('#6d4534')
                .setTitle(`🎪 Squad Tournament`)
                .setDescription(`🪧 **${squadTournament.squadTournamentName}** Squad Tournament\n👑 Organizer: ${inlineCode(squadTournament.squadTournamantLeader[0].pseudo)}\n🛖 Number of squads: ${inlineCode(squadTournament.squadMember.length)} (max: ${squadTournament.maxSquad})\n\n🏹 Result of the tournament:\n${messageEmbedResult}\n`)
                .setTimestamp();
        return message.reply({embeds: [squadTournamentEmbed]});
    };

    // == Tournament DB ==
    let squadTournament = await SQUADTOURNAMENT.findOne({ squadTournamentName: nameTournament });
    if (!squadTournament) return message.reply(`${inlineCode("😵‍💫")} This tournament does not exist...`)
    else {

        if(squadTournament.squadMember.length <= 2) return message.reply(`${inlineCode("😵‍💫")} the minimum to start a tournament is 3 squads...`) 

        // == Check if user are the creator ==
        if(squadTournament.squadTournamantLeader[0].id == user.id){

            squadTournamentBattle(squadTournament)

        } else return message.reply(`${inlineCode("🥱")} You are not the creator of the tournament...`)
    };
};

module.exports.info = {
    names: ['starttournament', 'tournamentstart', 'begintournament', 'startTour', 'startT'],
};
