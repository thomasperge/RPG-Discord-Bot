const Discord = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const PLAYERDATA = require('../modules/player.js');
const STATS = require('../modules/statsBot.js');
const SQUADDATA = require('../modules/squad.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 8.64e7;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author;
    var squadName = args[0]

    // == Balance Db ==
    let balance = await BALANCEDATA.findOne({ userId: message.author.id });
    if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        if (balance.eco.coins <= 100000) return message.reply(`${inlineCode("😬")} you don't have ${inlineCode('500000')} 🪙 to create a squad...`)
        else {

            if(squadName === '') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("rcreatesquad <squad name>")}`)
            else if(squadName === ' ') return message.reply(`${inlineCode("❌")} error command, type: ${inlineCode("rcreatesquad <squad name>")}`)
            else if(squadName === undefined || squadName === 'undefined') return message.reply(`${inlineCode("❌")} name not available, type: ${inlineCode("rcreatesquad <squad name>")}`)
            else {

                // ==== Check if squad name ever use ====
                function squadNameEverUsed(allSquad, squadNameNew){
                    for(const squad of allSquad){
                        if(squad.squadName === squadNameNew) return false 
                    }
                    return true
                }

                let allSquad = await SQUADDATA.find();
                if(squadNameEverUsed(allSquad, squadName)){

                    let playerStats = await PLAYERDATA.findOne({ userId: message.author.id });

                    function playerInSquad(playerStats){
                        if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
                        else {
                            if(playerStats.player.other.squadName != 'undefined') return true
                        }
                        return false
                    }

                    if(playerInSquad(playerStats) == false){
                        playerStats.player.other.squadName = squadName;
                        playerStats.save();

                        var newSquad = new SQUADDATA({
                            squadName : squadName,
                            squadXp: 0,
                            leader: [message.author.id, user.username],
                            member: [{id: user.id, pseudo: user.username}],
                            squadbank: 0,
                            squadboss: {
                                bossattack: 500,
                                bosshealth: 8000,
                                bossdefense: 0,
                            }
                        });
                        newSquad.save()

                        // == Log : ==
                        const logChannel = client.channels.cache.get('1005480495003488297');
                        var now = new Date();
                        var date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                        var messageEmbed = new Discord.MessageEmbed()
                            .setColor('#c18128')
                            .setTitle(`Log ${date}`)
                            .setDescription(`🛖 New Squad by **${inlineCode(user.username)}**\n🪧 Squad name : **${inlineCode(squadName)}**`);
                        logChannel.send({embeds: [messageEmbed], ephemeral: true });


                        let stats = await STATS.findOne({ botID: 899 });
                        stats.numberSquad += 1
                        stats.save()

                        var squadEmbed = new Discord.MessageEmbed()
                            .setColor('#4dca4d')
                            .setTitle(`🛖 New Squad by ${user.username}`)
                            .setDescription(`👊 You created ${inlineCode(squadName + "'s")} squad\n📰 Squad Bank : ${inlineCode("0")} 🪙\n👑 Leader : ${user.username}\n👥 Member: ${inlineCode("1")}`)
                            .setTimestamp();
                        message.channel.send({embeds: [squadEmbed]});

                        //  ======= CoolDowns: 3s =======
                        if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
                            var measuredTime = new Date(null);
                            measuredTime.setSeconds(Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000)); // specify value of SECONDS
                            var MHSTime = measuredTime.toISOString().substr(11, 8);
                            message.channel.send('⌚ Please wait `' + MHSTime + ' hours` and try again.');
                            return;
                        }
                        
                        cooldownPlayers.set(message.author.id, new Date().getTime());
                        // ===============================
                    } else return message.reply(`${inlineCode("😵‍💫")} you are already in a squad...`) 
                } else return message.reply(`${inlineCode('❌')} the name ${inlineCode(squadName)} is already taken ! ${inlineCode('rcreatesquad <squad name>')}`)
            }; 
        };
    };  
};

module.exports.info = {
  names: ['createsquad', 'squadcreate', 'newsquad', 'createteam', 'newteam'],
};
