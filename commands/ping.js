const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  var user = message.author;

  message.channel.send(`Poooooong ! <:7101shrekwtf:853676911640444968>`);

  const logChannel = client.channels.cache.get('584036562241585167');
  var now = new Date();
  var date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  var messageEmbed = new Discord.MessageEmbed()
    .setColor('#6BBC21')
    .setAuthor(`Log ${date}`)
    .setDescription(`[PING] command by: ${client.users.cache.get(user.id).username}`);
  logChannel.send(messageEmbed);
};

module.exports.info = {
  names: ['ping'],
};
