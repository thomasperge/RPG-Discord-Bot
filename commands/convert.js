const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const BALANCEDATA = require('../modules/economie.js');
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
        if (!balance) return message.reply(`${inlineCode('❌')} you are not player ! : ${inlineCode('gstart')}`);
        else {

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
                .setDescription(`📝 Would you convert :\n➡️ ${inlineCode(amout + '🪙')}  into ${inlineCode(amoutXP + '🏮')} \n✅ for ${inlineCode('yes')} & ❌ for ${inlineCode('canceled')}`);
            message.reply({ embeds: [embed], components: [row] });

            const filter = (interaction)  => {
                if(interaction.user.id === message.author.id) return true
                return interaction.reply({ content: 'You cant use this button bro' }),'📜🧾';
            }
            const collector = message.channel.createMessageComponentCollector({
                filter, 
                max: 1
            })

            collector.on('end', (ButtonInteraction) => {
                ButtonInteraction.first().deferUpdate()
                const id = ButtonInteraction.first().customId
                if(id === 'yes'){
                    balance.eco.coins -= amout
                    balance.eco.xp += amoutXP
                    balance.save()

                    return message.reply(`✅ Converting successful !\n📭 You get ${amoutXP} 🏮 in your balance`)
                }
                if(id === 'no') return message.reply('NO.')
            })
        };
    } else return message.reply(`${inlineCode("😶‍🌫️")} number of coins is invalid...`) ;
};

module.exports.info = {
    names: ['convert'],
};
