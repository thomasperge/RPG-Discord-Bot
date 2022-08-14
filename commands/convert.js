const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
const { numStr } = require('../functionNumber/functionNbr.js')
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 5000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
  //  ======= CoolDowns: 5s =======
  if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
    message.channel.send('⌚ Please wait `' + Math.ceil((shuffleTime - (new Date().getTime() - cooldownPlayers.get(message.author.id))) / 1000) + ' seconds` and try again.');
    return;
  }
  cooldownPlayers.set(message.author.id, new Date().getTime());
  // ===============================

  var user = message.author;
  var amout = args[0]

  if(amout != undefined && isNaN(amout) == false && amout >= 1){

        // == Balance Data ==
        let balance = await BALANCEDATA.findOne({ userId: user.id });
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('rstart')}`);
        else {

            if(balance.eco.coins < amout) return message.reply(`${inlineCode("😵‍💫")} you don't have enought money, missing ${inlineCode(numStr(amout - balance.eco.coins))} 🪙`)


            var amoutXP = Math.floor(amout * 2.95)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('yes')
                        .setLabel('CONVERT ✅')
                        .setStyle('SUCCESS'),
                    
                    new MessageButton()
                        .setCustomId('no')
                        .setLabel('CANCEL ❌')
                        .setStyle('DANGER'),
                );

            const embed = new MessageEmbed()
                .setColor('#a25cff')
                .setTitle('🪧 Coins Converting')
                .setDescription(`📝 Would you convert :\n➡️ ${inlineCode(numStr(amout) + '🪙')}  into ${inlineCode(numStr(amoutXP) + '🏮')}`);
            const msg = await message.reply({ embeds: [embed], components: [row] });

            // ========== Filter & Collector ==========
            const collector = msg.createMessageComponentCollector({
                componentType: "BUTTON",
                max: 1,
                time: 30_000
            });

            collector.on('collect', async interaction => {
                if (interaction.customId == 'yes') {
                    balance.eco.coins -= amout
                    balance.eco.xp += amoutXP
                    balance.save()
                    await interaction.reply({ content: `✅ Converting successful !\n📭 You get **${inlineCode(numStr(amoutXP))}** ${inlineCode("🏮")} in your balance`, ephemeral: true })
                }
                if(interaction.customId === 'no') await interaction.reply({ content : 'You canceled ❌', ephemeral: true })
            })
        };
    } else return message.reply(`${inlineCode("😶‍🌫️")} number of coins is invalid...`) ;
};

module.exports.info = {
    names: ['convert'],
};
