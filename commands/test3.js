const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('btn1')
                .setLabel('YES ::')
                .setStyle('SUCCESS'),
            
            new MessageButton()
                .setCustomId('btn2')
                .setLabel('NO !!')
                .setStyle('DANGER'),
        );

    message.reply({ content: 'Pong!', components: [row], ephemeral: true });

    // const filter = (interaction)  => {
    //     if(interaction.user.id === message.author.id) return true
    //     return interaction.reply({ content: 'You cant use this button bro', ephemeral: true })
    // }
    // const collector = message.channel.createMessageComponentCollector({
    //     filter, 
    //     max: 1
    // })

    // collector.on('end', async (ButtonInteraction) => {
    //     // const id = ButtonInteraction.first().customId
    //     ButtonInteraction.first().deferUpdate()
    //     if(ButtonInteraction.id === 'yes'){
    //         ButtonInteraction.first().reply('ok YES')
    //     }
    //     if(ButtonInteraction.id === 'no'){
    //         ButtonInteraction.first().reply('ok NO')
    //     }
    // })

};

module.exports.info = {
    names: ['t3'],
};
