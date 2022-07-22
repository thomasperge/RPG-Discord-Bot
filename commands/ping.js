const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports.run = async (client, message, args) => {

    message.channel.send('Pong !')
}
module.exports.info = {
  names: ['ping'],
};
