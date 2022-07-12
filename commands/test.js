const Discord = require('discord.js');
const { bold, inlineCode, codeBlock, ButtonBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.reply('TEst').then(message.react('👍').then(() => message.react('👎')));

    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '👍') {
                message.reply('You reacted 👍');
            } 
            if (reaction.emoji.name === '👎') {
                message.reply('You reacted with 👎');
            }
        })
        .catch(collected => {
            message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
        });



};

module.exports.info = {
    names: ['test'],
};
