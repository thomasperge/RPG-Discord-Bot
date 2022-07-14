const PLAYER = require('../modules/player.js')
const ECONOMIE = require('../modules/economie.js')
const BOSS = require('../modules/boss.js')
const BOSSCONFIG = require('../config/boss.json')

module.exports.run = async (client, message, args) => {
    var user = message.author
    // ======= ACCOUNT PLAYER =======
    PLAYER.findOne(
        {
            userId: message.author.id,
        },
        (err, player) => {
            if (err) console.log(err)
            if (!player) {
                var accountPLayer = new PLAYER({
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
                        lifeSteal: 0,
                        execute: 100,
                        aegis: 125,
                        ultimate:{
                            reflect: 0,
                            heal: 0,
                            luckyStrike: 0,
                        },
                        stuff: {
                            stuffUnlock: [],
                            weaponID: -1,
                            bootsID: -1,
                            armorID: -1,
                            magicItemID: -1,
                        },
                        other:{
                            dm: false,
                            bossattack: 0,
                            squadName: 'undefined',
                            squadCoinGiven: 0,
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
    ECONOMIE.findOne(
        {
            userId: message.author.id,
        },
        (err, economie) => {
            if (err) console.log(err)
            if (!economie) {
                var economiePLayer = new ECONOMIE({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    eco: {
                        coins: 25_000_000,
                        xp: 99_750_000,
                    },
                })
                economiePLayer.save()
                message.reply('`✅` Balance create ! - To you the conquest towards wealth!')
            } else {
                message.reply('`❌` You already have a bank account... !')
            }
        }
    );

    // BOSS.findOne(
    //     {
    //         bossname: 'Lithowanderer',
    //     },
    //     (err, boss) => {
    //         if (err) console.log(err)
    //         if (!boss) {
    //             var bossPLayer = new BOSS({
    //                 idboss: 0,
    //                 bossname: BOSSCONFIG.boss1.name,
    //                 stats: {
    //                     attack: BOSSCONFIG.boss1.attack,
    //                     health: BOSSCONFIG.boss1.health,
    //                 },
    //             })
    //             bossPLayer.save()
    //             message.reply('`✅` Boss create !')
    //         } else {
    //             message.reply('`❌` Boss existing already !')
    //         }
    //     }
    // );


}

module.exports.info = {
    names: ['create', 'start', 'account', 'newaccount', 'begin'],
}
