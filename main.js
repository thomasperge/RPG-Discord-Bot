// ALL REQUIRE
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES] });

const mongoose = require('mongoose');
mongoose
   .connect(config.mongodb, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   })
   .then(() => console.log('MongoDB : Ready !'));


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
['commands', 'cooldowns'].forEach((x) => (client[x] = new Discord.Collection()));

// EXECUTE LES COMMANDES (MODULE FS)
fs.readdir('./commands/', (err, files) => {
   if (err) console.log(err);
   //removes period to get command name
   let jsfile = files.filter((f) => f.split('.').pop() === 'js');
   if (jsfile.length <= 0) {
      console.log('No commands in dir');
      return;
   }
   //registers commands
   jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} has loaded.`);
      if (props.info.name) client.commands.set(props.info.name, props);
      else if (props.info.names) for (var i in props.info.names) client.commands.set(props.info.names[i], props);
   });
});


client.on('messageCreate', async (message) => {
   //MISES EN PLACE DU PREFIX
   let prefix = config.prefix;
   let messageArray = message.content.split(' ');
   let cmd = messageArray[0];
   let Args = messageArray.slice(1);
   var args = message.content.substring(prefix.length).split(' ');

   if (message.content.startsWith(prefix)) {
      let commandeFile = client.commands.get(cmd.slice(prefix.length));
      if (commandeFile) commandeFile.run(client, message, Args, args);
   };
});

// BOT READY
client.on('ready', () => {
   console.log('RPG Bot: Ready !');
   client.user.setActivity(`rpg helping | ghelp`);
});

client.login(config.token);