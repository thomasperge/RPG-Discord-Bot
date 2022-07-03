const Discord = require('discord.js')
const ItemsData = require('../modules/items.js')
const ToolsData = require('../modules/tools.js')
const EconomyData = require('../modules/economy.js')
const StatsData = require('../modules/stats.js')
const config = require('../config.json')

module.exports.run = async (client, message, args) => {
    var user = message.author
    /**Account Items */
    ItemsData.findOne(
        {
            userId: message.author.id,
        },
        (err, items) => {
            if (err) console.log(err)
            if (!items) {
                var accountItems = new ItemsData({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    farm: {
                        bush: 0,
                        wheat: 0,
                        corn: 0,
                        potato: 0,
                        carrot: 0,
                        clover: 0,
                    },
                    mine: {
                        stone: 0,
                        coal: 0,
                        iron: 0,
                        gold: 0,
                        diamond: 0,
                        gems: 0,
                        rainbow: 0,
                    },
                })
                accountItems.save()
                message.reply('✅ Account create ! - Items')
            } else {
                message.reply('❌ Account Already Create ! - Items')
            }
        }
    )

    /**Account Tools */
    ToolsData.findOne(
        {
            userId: message.author.id,
        },
        (err, tools) => {
            if (err) console.log(err)
            if (!tools) {
                var accoutTool = new ToolsData({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    tool: {
                        pickaxe: 1,
                        shovel: 1,
                        generator: 0,
                    },
                })
                accoutTool.save()
                message.reply('✅ Account create ! - Tools')
            } else {
                message.reply('❌ Account Already Create ! - Tools')
            }
        }
    )

    /**Account Economy */
    EconomyData.findOne(
        {
            userId: message.author.id,
        },
        (err, economy) => {
            if (err) console.log(err)
            if (!economy) {
                var accountEco = new EconomyData({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    eco: {
                        money: 50,
                        gem: 0,
                        chest: 2,
                        businessvalue: 1,
                        profit: 1,
                    },
                })
                accountEco.save()
                message.reply('✅ Account create ! - Economy')
            } else {
                message.reply('❌ Account Already Create ! - Economy')
            }
        }
    )

    /**Account Stats */
    StatsData.findOne(
        {
            userId: message.author.id,
        },
        (err, stats) => {
            if (err) console.log(err)
            if (!stats) {
                var accountStats = new StatsData({
                    userId: message.author.id,
                    pseudo: message.author.username,
                    stats: {
                        nbfarm: 0,
                        nbmine: 0,
                        nbchest: 0,
                        nbhourly: 0,
                        nbdaily: 0,
                        nbrestart: 0,
                    },
                })
                accountStats.save()
                message.reply('✅ Account create ! - Stats')
            } else {
                message.reply('❌ Account Already Create ! - Stats')
            }
        }
    )
}

module.exports.info = {
    names: ['create', 'start', 'account', 'newaccount'],
}
