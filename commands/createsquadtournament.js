const Discord = require('discord.js');
const SQUADTOURNAMENT = require('../modules/squadtournament.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 8.64e7;
var cooldownPlayers = new Discord.Collection();

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
                        if(squadT.squadTournamantLeader[0].id === user.id) return false 
                    }
                    return true
                };

                let allSquadTournament = await SQUADTOURNAMENT.find();

                if(squadNameEverUsed(allSquadTournament, squadTournamentName)){
                    if(ifPlayerAsAlreadyCreateTournament(allSquadTournament, user)){

                        //  ======= CoolDowns: 24h =======
                        if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                            var measuredTime = new Date(null);
                            measuredTime.setSeconds(Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000)); // specify value of SECONDS
                            var MHSTime = measuredTime.toISOString().substr(11, 8);
                            message.channel.send('⌚ Please wait `' + MHSTime + ' hours` and try again.');
                            return;
                        }
                        cooldownPlayers.set(message.author.id, new Date().getTime());
                        // ===============================

                        var newSquadT = new SQUADTOURNAMENT({
                            squadTournamentName : squadTournamentName,
                            squadTournamantLeader: {id: user.id, pseudo: user.username},
                            maxSquad: maxSquadMember,
                            squadMember: [],
                        });
                        newSquadT.save()
                        
                        // == Log : ==
                        const logChannel = client.channels.cache.get('1005480495003488297');
                        var now = new Date();
                        var date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                        var messageEmbed = new Discord.MessageEmbed()
                            .setColor('#e1e920')
                            .setTitle(`Log ${date}`)
                            .setDescription(`🎪 **NEW ESCOUADE TOURNAMENTS** by **${inlineCode(user.username)}**\n🪧 Name : **${inlineCode(squadTournamentName)}**\n👥 Maximum Squad : **${inlineCode(maxSquadMember)}**`);
                        logChannel.send({embeds: [messageEmbed], ephemeral: true });

                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#4dca4d')
                            .setTitle(`🎪 New Squad TOURNAMENT by ${user.username}`)
                            .setDescription(`👊 You created ${inlineCode(squadTournamentName + "'s")} tournament\n👑 Leader : ${user.username}\n👥 Member: ${inlineCode("0")}\n(don't forget to register your squad for the tournament)`)
                            .setTimestamp();
                        return message.channel.send({embeds: [squadEmbed]});

                    } else return message.reply(`${inlineCode('❌')} you have already created a tournament, you can't create a second one...`)
                } else return message.reply(`${inlineCode('❌')} the name ${inlineCode(squadTournamentName)} is already taken ! ${inlineCode('rcreatesquad <squad name> <max member>')}`)
            }; 
        } else return message.reply(`${inlineCode("❌")} a tournament must be composed of a minimum of 3 squads and a maximum of 15!`);
    } return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("rcreatesquadtournament <tournament name> <max member>")}`);
};

module.exports.info = {
    names: ['createsquadtournament', 'createSquadTournament', 'createST', 'createTournament', 'createtournament', 'createsquadT', 'createSquadT'],
};
