const Discord = require('discord.js');
const PLAYERDATA = require('../modules/player.js');

module.exports.run = async (client, message, args) => {

    const list = client.guilds.cache.get("908343802647957575"); 
    list.members.cache.forEach(member => console.log(member.user.username)); 
    



};
module.exports.info = {
    names: ['t2'],
};
