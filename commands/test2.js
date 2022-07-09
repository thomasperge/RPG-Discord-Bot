const Discord = require('discord.js');
const config = require('../config.json');
const BOSSDATA = require('../modules/boss.js')
const PLAYERDATA = require('../modules/player.js');

/**Config Cooldown */
// const shuffleTime = 8.64e7;
const shuffleTime = 0;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {

    let destinataire = message.mentions.users.first();
    if (!destinataire){
        return message.channel.send("L'utilisateur n'existe pas");
    }
    destinataire.author.send(args.join(" "));
    

};

module.exports.info = {
    names: ['t'],
};
