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

    message.reply({ content: 'Pong!', embeds: [embed], components: [row], ephemeral: true });

    const filter = (interaction)  => {
        if(interaction.user.id === message.author.id) return true
        return interaction.reply({ content: 'You cant use this button bro', ephemeral: true })
    }
    const collector = message.channel.createMessageComponentCollector({
        filter, 
        max: 1
    })

    collector.on('end', async (ButtonInteraction) => {
        // const id = ButtonInteraction.first().customId
        if(ButtonInteraction.id === 'yes'){
            await ButtonInteraction.reply('ok YES')
        }
        if(ButtonInteraction.id === 'no'){
            await ButtonInteraction.reply('ok NO')
        }
        ButtonInteraction.defer()
    })

};

module.exports.info = {
    names: ['t3'],
};