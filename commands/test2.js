const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {

    // await interaction.guild.members.fetch()
    console.log(await message.guild.members.fetch());



};
module.exports.info = {
    names: ['t2'],
};
