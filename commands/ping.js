const Discord = require('discord.js');
const config = require('../config.json');
const MONSTERCONFIG = require('../config/monster.json')

module.exports.run = async (client, message, args) => {


    function linkRandomMonster(number){
        if (number == 0) return 'monsterlvl1'
        if (number == 1) return 'monsterlvl2'
        if (number == 2) return 'monsterlvl3'
    }

    var randomMonster = Math.floor(Math.random() * 3);

    const MONSTER = MONSTERCONFIG.level0.linkRandomMonster(randomMonster)
    console.log(MONSTER)

};

module.exports.info = {
    names: ['ping'],
};
