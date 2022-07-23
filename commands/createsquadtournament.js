const Discord = require('discord.js');
const SQUADTOURNAMENT = require('../modules/squadtournament.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var squadTournamentName = args[0]
    var maxSquadMember = args[1]

    if(maxSquadMember == '' || maxSquadMember == ' ' || maxSquadMember == undefined) return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquadtournament <tournament name> <max member>")}`)
    if(isNaN(maxSquadMember) == false){
        if(maxSquadMember >= 3 && maxSquadMember <= 20){
            if(squadTournamentName === '' || squadTournamentName === ' ' || squadTournamentName === undefined || squadTournamentName === 'undefined') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquadtournament <tournament name> <max member>")}`)
            else {

                // ==== Check if squad name ever use ====
                function squadNameEverUsed(allSquadTournament, squadTournamentName){
                    for(const squadT of allSquadTournament){
                        if(squadT.squadTournamentName === squadTournamentName) return false 
                    }
                    return true
                };

                function ifPlayerAsAlreadyCreateTournament(allSquadTournament, user){
                    for(const squadT of allSquadTournament){
                        if(squadT.squadTournamantLeader[0] === user.id) return false 
                    }
                    return true
                };

                let allSquadTournament = await SQUADTOURNAMENT.find();

                if(squadNameEverUsed(allSquadTournament, squadTournamentName)){
                    if(ifPlayerAsAlreadyCreateTournament(allSquadTournament, user)){

                        var newSquadT = new SQUADTOURNAMENT({
                            squadTournamentName : squadTournamentName,
                            squadTournamantLeader: {id: user.id, pseudo: user.username},
                            maxSquad: maxSquadMember,
                            squadMember: [],
                        });
                        newSquadT.save()
                        
                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#4dca4d')
                            .setTitle(`🎪 New Squad TOURNAMENT by ${user.username}`)
                            .setDescription(`👊 You created ${inlineCode(squadTournamentName + "'s")} tournament\n👑 Leader : ${user.username}\n👥 Member: ${inlineCode("0")}\n(don't forget to register your squad for the tournament)`)
                            .setTimestamp();
                        return message.channel.send({embeds: [squadEmbed]});
                    } else return message.reply(`${inlineCode('❌')} you have already created a tournament, you can't create a second one...`)
                } else return message.reply(`${inlineCode('❌')} the name ${inlineCode(squadName)} is already taken ! ${inlineCode('gcreatesquad <squad name>')}`)
            }; 
        } else return message.reply(`${inlineCode("❌")} a tournament must be composed of a minimum of 3 squads and a maximum of 15!`);
    } return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("gcreatesquadtournament <tournament name> <max member>")}`);
};

module.exports.info = {
  names: ['createsquadtournament', 'createSquadTournament', 'createST', 'createTournament'],
};
