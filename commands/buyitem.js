const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const BALANCEDATA = require('../modules/economie.js');
const STATS = require('../modules/statsBot.js');
const EMOJICONFIG = require('../config/emoji.json');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    //  ======= CoolDowns: 3s =======
    if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
        return;
        }
    cooldownPlayers.set(message.author.id, new Date().getTime());
    // ===============================
        
    var item = args[0]
    var user = message.author

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("rbuyitem <item name>")}`);

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            if(balance.eco.coins < 0) return message.reply(`${inlineCode("😵‍💫")} balance error...`)

            function itemExist(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].cost, CONFIGITEM[pas].name]
                    }
                }
                return [false, -1, 0, 'undefined']
            };

            function returnStatsItem(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [CONFIGITEM[pas].name, CONFIGITEM[pas].categorie, CONFIGITEM[pas].rarety, CONFIGITEM[pas].levelAttack.level1, CONFIGITEM[pas].levelDefense.level1, CONFIGITEM[pas].levelDodge.level1, CONFIGITEM[pas].levelCrit.level1, CONFIGITEM[pas].levelPenetration.level1, CONFIGITEM[pas].levelLifeSteal.level1, CONFIGITEM[pas].levelHealth.level1]
                    }
                }
            };
            
            if(balance.eco.coins < itemExist(item)[2]) return message.reply(`${inlineCode("😵‍💫")} you don't have enought money, missing ${inlineCode(numStr(itemExist(item)[2] - balance.eco.coins))} ${EMOJICONFIG.coin}`)

            else {
                if(itemExist(item)[0]){

                    function alreadyBuy(){
                        for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                            if(itemPlayerAll.id === itemExist(item)[1]) return true
                        }
                        return false
                    };

                    if(alreadyBuy()) return message.reply(`${inlineCode("😵‍💫")} you have already this item !`);
                    else {

                        // [========== Button Buy Item ==========]
                        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('yes')
                                .setLabel('BUY ✅')
                                .setStyle('SUCCESS'),
                            
                            new MessageButton()
                                .setCustomId('no')
                                .setLabel('CANCEL ❌')
                                .setStyle('DANGER'),
                        );
                        
                        const buyItemEmbed = new MessageEmbed()
                            .setColor('#4dca4d')
                            .setTitle(`🪖 Item Store`)
                            .setDescription(`📦 **ITEM : ${inlineCode(returnStatsItem(item)[0])}\n💰 Price : ${inlineCode(numStr(itemExist(item)[2]))} ${EMOJICONFIG.coin}\n🪧 Categorie : ${inlineCode(returnStatsItem(item)[1])}\n💎 Rarety : ${inlineCode(returnStatsItem(item)[2])}**\n\n**📊 Stats :**\n${inlineCode("🔥")} : ${returnStatsItem(item)[3]}\n${inlineCode("🛡️")} : ${returnStatsItem(item)[4]}\n${inlineCode("💨")} : ${returnStatsItem(item)[5]}\n${inlineCode("💥")} : ${returnStatsItem(item)[6]}\n${inlineCode("🏑")} : ${returnStatsItem(item)[7]}\n${inlineCode("❤️‍🔥")} : ${returnStatsItem(item)[8]}\n${inlineCode("❤️")} : ${returnStatsItem(item)[9]}`)
                            .setTimestamp();
                        const msg = await message.reply({ embeds: [buyItemEmbed], components: [row] });

                        // ========== Filter & Collector ==========
                        const collector = msg.createMessageComponentCollector({
                            componentType: "BUTTON",
                            max: 1,
                            time: 70_000
                        });
                    
                        collector.on('collect', async interaction => {
                            if (interaction.customId == 'yes') {
            
                                // ========== YES: Buy Item ==========
                                balance.eco.coins -= itemExist(item)[2]
                                if(balance.eco.coins <= 0) balance.eco.coins = 0
                                balance.save()
        
                                playerStats.player.stuff.stuffUnlock.push({id: itemExist(item)[1], name: itemExist(item)[3], level: 1})
                                playerStats.save()
        
                                let stats = await STATS.findOne({ botID: 899 });
                                stats.amoutItem += 1;
                                stats.save();

                                // == Log : ==
                                const logChannel = client.channels.cache.get('1005480495003488297');
                                var now = new Date();
                                var date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                                var messageEmbed = new Discord.MessageEmbed()
                                    .setColor('#6d4534')
                                    .setTitle(`Log ${date}`)
                                    .setDescription(`🪖 ${inlineCode(user.username)} bought the item : ${itemExist(item)[3]} for ${inlineCode(numStr(itemExist(item)[2]))} ${EMOJICONFIG.coin}`);
                                logChannel.send({embeds: [messageEmbed], ephemeral: true });

                                var itemEmbed = new MessageEmbed()
                                    .setColor('#6d4534')
                                    .setTitle(`📦 ${user.username}'s New Item(s)`)
                                    .setDescription(`✅ **Purchase made!**\n📦 **NEW ITEM** : **${inlineCode(itemExist(item)[3])}**\n🪧 Don't forget to equip yourself with : ${inlineCode(`requip ${item} <1/2/3/4/5>`)}\n🏹 To see your items equip : ${inlineCode("rslot")}`)
                                    .setTimestamp()
                                await interaction.reply({embeds: [itemEmbed], ephemeral: true});
            
                            };
                            if(interaction.customId === 'no') await interaction.reply({content: `You canceled ❌`, ephemeral: true});
                        });
                        // [=========== BUTTON END ===========]
                    };
                } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
            };
        };
    };
};

module.exports.info = {
    names: ['b', 'itembuy', 'buyitem'],
};
