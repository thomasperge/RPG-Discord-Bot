const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('YES')
                .setStyle('SUCCESS'),
            
            new MessageButton()
                .setCustomId('no')
                .setLabel('NO')
                .setStyle('DANGER'),
        );

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org')
        .setDescription('Some description here');

    message.reply({ content: 'Pong!', embeds: [embed], components: [row] });

    const filter = (interaction)  => {
        if(interaction.user.id === message.author.id) return true
        return interaction.reply({ content: 'You cant use this button bro' })
    }
    const collector = message.channel.createMessageComponentCollector({
        filter, 
        max: 1
    })

    collector.on('end', (ButtonInteraction) => {
        // ButtonInteraction.first().deferUpdate()
        const id = ButtonInteraction.first().customId
        if(id === 'yes') return ButtonInteraction.first().reply('YES.')
        if(id === 'no') return ButtonInteraction.first().reply('NO.')
    })

};

module.exports.info = {
    names: ['t3'],
};
