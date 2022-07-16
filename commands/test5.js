const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {


    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('YES ::')
                .setStyle('SUCCESS'),
            
            new MessageButton()
                .setCustomId('no')
                .setLabel('NO !!')
                .setStyle('DANGER'),
        );

        
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
    const msg = await message.reply({ embeds: [embed], components: [row] });


    const collector = msg.createMessageComponentCollector({
        componentType: "BUTTON",
        // max: 1, // Seulement pour 1 joueur !
        time: 15_000 // how long you want it to collect for, in ms (this is 15 seconds)
    })


    collector.on('collect', async interaction => {
        if(interaction.message.author.id = message.author.id) console.log('ok bon user')
        if (interaction.customId == 'yes') {
            await interaction.reply({ content: 'You click on YES !', ephemeral: true });
        };
    });
};

module.exports.info = {
    names: ['t5'],
};
