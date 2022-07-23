const PLAYER = require('../modules/player.js')
const ECONOMIE = require('../modules/economie.js')
const STATS = require('../modules/statsBot.js')
const BOSS = require('../modules/boss.js')
const BOSSCONFIG = require('../config/boss.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { inlineCode } = require('@discordjs/builders')

module.exports.run = async (client, message, args) => {
    var user = message.author

    var playerCreateEmbed = new MessageEmbed()
        .setColor('#9696ab')
        .setTitle(`✅ ${user.username}'s Account`)
        .setDescription("📭 : The bot is in Beta version, if there is a problem/bug, please let us know.")
        .setTimestamp();
    

    let stats = await STATS.findOne({ botID: 899 });

    // ======= ACCOUNT PLAYER =======
    PLAYER.findOne({userId: user.id},
        (err, player) => {
            if (err) console.log(err)
            if (!player) {
                var accountPLayer = new PLAYER({
                    userId: user.id,
                    pseudo: user.username,
                    player: {
                        level: 0,
                        elo: 1500,
                        level: 0,
                        attack: 100,
                        defense: 20,
                        health: 2500,
                        dodge: 0,
                        crit: 0,
                        penetration: 0,
                        lifeSteal: 0,
                        slotItem: {
                            slot1: -1,
                            slot2: -1,
                            slot3: -1,
                            slot4: -1,
                            slot5: -1,
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
                            monsterKill: 0,
                        },
                    },
                });
            accountPLayer.save();

            stats.numberPlayer += 1;
            stats.save();

            playerCreateEmbed.addField(`${inlineCode("✅")} Account create !`,`📜 New player joins the adventure!`);

            }
        }
    );

    // ======= ECONOMIE PLAYER =======
    ECONOMIE.findOne({ userId: user.id },
        (err, economie) => {
            if (err) console.log(err)
            if (!economie) {
                var economiePLayer = new ECONOMIE({
                    userId: user.id,
                    pseudo: user.username,
                    eco: {
                        coins: 25_000_000,
                        xp: 99_750_000,
                    },
                })
            economiePLayer.save()

            playerCreateEmbed.addField(`${inlineCode("✅")} Balance create !`,`📜 To you the conquest towards wealth!`);
            message.reply({ embeds: [playerCreateEmbed] })

            } else {
                message.reply(`${inlineCode("❌")} You are already a player... !`);
            };
        }
    );

    // ======= STATS BOT =======
    // var statsBot = new STATS({
    //     botID: 899,
    //     numberPlayer: 0,
    //     numberSquad: 0,
    //     amoutCoin: 0,
    //     amoutItem: 0,
    //     amoutMonsterKilled: 0,
    // })
    // statsBot.save()


    // ======= BOSS =======
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
