const Discord = require('discord.js')
const PLAYERDATA = require('../modules/player.js')
const ECONOMIEDATA = require('../modules/economie.js')
const BOSSCONFIG = require('../config/boss.json')
const BOSS = require('../modules/boss.js')

module.exports.run = async (client, message, args) => {
    var user = message.author
    // ======= ACCOUNT PLAYER =======
    PLAYERDATA.findOne(
        {
            userId: message.author.id,
        },
        (err, player) => {
            if (err) console.log(err)
            if (!player) {
                var accountPLayer = new PLAYERDATA({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    player: {
                        level: 0,
                        attack: 100,
                        defense: 20,
                        health: 2500,
                        dodge: 0.00,
                        crit: 0.00,
                        critMultplicator : 1.0,
                        attackSpeed: 1.0,
                        lifeSteal: 0,
                        execute: 100,
                        aegis: 125,
                        vengeance: 20,
                        ultimate:{
                            reflect: 0,
                            heal: 0,
                            luckyStrike: 0,
                        },
                        other:{
                            dm: false,
                        },
                    },
                })
                accountPLayer.save()
                message.reply('`✅` Account create ! - New player joins the adventure!')
            } else {
                message.reply('`❌` You are already a player... !')
            }
        }
    );

    // ======= ECONOMIE PLAYER =======
    ECONOMIEDATA.findOne(
        {
            userId: message.author.id,
        },
        (err, economie) => {
            if (err) console.log(err)
            if (!economie) {
                var economiePLayer = new ECONOMIEDATA({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    eco: {
                        coins: 25,
                        xp: 0,
                    },
                })
                economiePLayer.save()
                message.reply('`✅` Balance create ! - To you the conquest towards wealth!')
            } else {
                message.reply('`❌` You already have a bank account... !')
            }
        }
    );

    BOSS.findOne(
        {
            bossname: 'Hello',
        },
        (err, boss) => {
            if (err) console.log(err)
            if (!boss) {
                var bossPLayer = new BOSS({
                    idboss: 0,
                    bossname: BOSSCONFIG.boss1.name,
                    bossattack: [],
                    stats: {
                        attack: BOSSCONFIG.boss1.attack,
                        health: BOSSCONFIG.boss1.health,
                    },
                })
                bossPLayer.save()
                message.reply('`✅` Boss create !')
            } else {
                message.reply('`❌` Boss existing already !')
            }
        }
    );


}

module.exports.info = {
    names: ['create', 'start', 'account', 'newaccount', 'begin'],
}
