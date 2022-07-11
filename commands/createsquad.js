const Discord = require('discord.js');
const SQUADDATA = require('../modules/squad.js')


module.exports.run = async (client, message, args) => {
    var user = message.author;
    var squadName = args[0]
    console.log(squadName)

    if(squadName === '') return message.reply('Error...')
    else if(squadName === ' ') return message.reply('Error...')
    else if(squadName === undefined) return message.reply('Error...')
    else if(squadName != undefined) {
        var newSquad = new SQUADDATA({
            squadName : squadName,
            leader: message.author.id,
            member: [],
            squadbank: 0,
        })

        newSquad.save()
        message.reply('New SQUAD !!')
    }   

}

module.exports.info = {
  names: ['createsquad', 'squadcreate'],
};
