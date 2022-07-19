const Discord = require('discord.js');
const { bold, inlineCode, codeBlock, ButtonBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '👍') {

                message.channel.send('my emote')
                .then((msg)=> {

                    function task(i) {
                        setTimeout(function(){
                            console.log(i)
                            msg.edit(`my other emoji with : ${i}`);
                        }, 5000 * i)
                    };

                    for (let i=0; i<10; i++) {
                        task(i);
                    }
                });
                                
            } else {
                message.reply('You reacted with a thumbs down.');
            }
        })
        .catch(collected => {
            message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
        });



};

module.exports.info = {
    names: ['t'],
};
