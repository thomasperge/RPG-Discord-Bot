const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');
const SQUADDATA = require('../modules/squad.js')
const BALANCEDATA = require('../modules/economie.js');
const CONFIGITEM = require('../config/stuff.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 3000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var item = args[0]
    var user = message.author

    if(item == undefined || item == '' || item == ' ') return message.reply(`${inlineCode("😵‍💫")} item error : ${inlineCode("gsellitem <item name>")}`);

    let playerStats = await PLAYERDATA.findOne({ userId: user.id });
    if (!playerStats) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
    else {

        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

            if(balance.eco.coins <= 0) return message.reply(`${inlineCode("😵‍💫")} balance error..., contact Owner elthomas#2441`)

            function itemExist(item){
                for(let pas = 0; pas < CONFIGITEM.length; pas++){
                    for(const alias of CONFIGITEM[pas].alias){
                        if(item == alias) return [true, CONFIGITEM[pas].id, CONFIGITEM[pas].cost, CONFIGITEM[pas].name, CONFIGITEM[pas].categorie, CONFIGITEM[pas].rarety]
                    }
                };
                return [false, -1, 0, 'undefined', 'undefined', 'undefined']
            };

            if(itemExist(item)[0]){

                function ifItemInInventory(item){
                    for(const itemPlayerAll of playerStats.player.stuff.stuffUnlock){
                        var itemPlayer = itemPlayerAll.id
                        var itemPlayerExist = itemExist(item)[1]

                        if(itemPlayer == itemPlayerExist) return [true, itemPlayer]
                    }
                    return [false, -1]
                };

                if(ifItemInInventory(item)[0] == false) return message.reply(`${inlineCode("😵‍💫")} you don't have this item !`)
                else {

                    function addSquadXp(squad, xpUserEarn){
                        if (!squad) return
                        else {
                            squad.squadXp += Math.floor(xpUserEarn * 0.15)
                            squad.save()
                        }
                    };

                    var itemName = itemExist(item)[3];
                    var priceSelling = Math.floor((itemExist(item)[2] * 5)/100);
                    var tax = Math.floor((priceSelling * 5)/100);

                    var finalprice = priceSelling - tax;

                    // == Seling 5% of the prices ==
                    balance.eco.coins += finalprice
                    balance.save()

                    // == Delete Array ==
                    var index = playerStats.player.stuff.stuffUnlock.indexOf(ifItemInInventory()[1])
                    playerStats.player.stuff.stuffUnlock.splice(index, 1)

                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('yes')
                            .setLabel('SELL')
                            .setStyle('SUCCESS'),
                        
                        new MessageButton()
                            .setCustomId('no')
                            .setLabel('STOP THE SALE')
                            .setStyle('DANGER'),
                    );
            
                    const embedMessage = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`🛒 SELLING ${itemName}`)
                        .setDescription(`🪧 Sale of ${itemName} for : ${inlineCode(finalprice)} 🪙\n🏷️ Tax (5%) : ${inlineCode(tax)} 🪙`)
                        .addFields(
                            { name: `**📊 ${itemName} STATS :**\n`, value: `📦 Cost to NPC: ${inlineCode(itemExist(item)[2])} 🪙\n📜 Item category : ${itemExist(item)[4]}\n💎 Rarity of the item: : ${itemExist(item)[5]}`, inline: true},
                        )
                        .setTimestamp()

                    const msg = await message.reply({ embeds: [embedMessage], components: [row] });
                    
                    const collector = msg.createMessageComponentCollector({
                        componentType: "BUTTON",
                        max: 1,
                        time: 15_000
                    });
                    
                    collector.on('collect', async interaction => {
                        if (interaction.customId == 'yes') {

                            // ================ AD SQUAD XP ================
                            squad = await SQUADDATA.findOne({ squadName: playerStats.player.other.squadName })

                            var randomxp = Math.floor(Math.random() * (playerStats.player.health / 80)) + 1;
                            addSquadXp(squad, randomxp)

                            // ================ SLOT ITEM VERIF ================
                            if(ifItemInInventory(item)[0]){
                                for(const i of playerStats.player.slotItem){
                                    
                                }

                                playerStats.save()
                            } else playerStats.save()

                            // ================= LEVEL CONFIG =================
                            await interaction.reply({ content: `${inlineCode('✅')} Sale successfully completed for **${finalprice}** 🪙`, ephemeral: true });

                        };
                        if(interaction.customId === 'no') await interaction.reply({content: `${inlineCode("❌")} Sale cancelled...`, ephemeral: true});
                    });
                    // [=========== BUTTON END ===========]
                };
            } else return message.reply(`${inlineCode("😵‍💫")} this item does not exist...`);
        };
    };
};

module.exports.info = {
    names: ['s', 'sellitem', 'itemsell', 'sellingitem'],
};
