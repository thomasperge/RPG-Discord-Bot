const Discord = require('discord.js');
const { bold, inlineCode, codeBlock, ButtonBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args, interaction) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('test')
                .setLabel('Test 😶‍🌫️')
                .setStyle('PRIMARY')
        )

};

module.exports.info = {
    names: ['test'],
};
