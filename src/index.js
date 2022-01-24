require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,  Intents.FLAGS.GUILD_MEMBERS] });
const prefix = "!";
const welcome = require("./welcome");
const bye = require("./bye");

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);

    bye(client);
    welcome(client);
});

client.on('messageCreate', (message) => {
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0]
    const args = messageArray.slice(1);
        if(cmd.toLowerCase() === `${prefix}kick`) {
            if (!args[0]) return message.reply("You need to put someone in this command!")
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            if(!member) return message.reply("User not found.");
            if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(":x: " + "| You don't have permission!.");
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("I don't have permission...");
            if (message.member.id === member.id) return message.reply("You can't kick yourself!");
            if (member.id ===process.env.BOT_ID) {
              return message.reply("I'm sorry, I can't!")
            }
            member.kick()
            message.channel.send(`${member} just got kicked.`)
        }  
        if (cmd.toLowerCase() === `${prefix}ban`) {
            if (!args[0]) return message.reply("You need to put someone in this command!")
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            if(!member) return message.reply("User not found.");
            if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(":x: " + "| You don't have permission!.");
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("I don't have permission to ban people!");
            if (message.member.id === member.id) return message.reply("You can't ban yourself!");
            if (member.id ===process.env.BOT_ID) {
              return message.reply("I'm sorry, I can't!")
            }
          
            let reason = args.slice(1).join(" ") || "No reason"
    
            member.ban({ reason:reason })
            message.channel.send(`${member} just got banned.\nReason: ${reason}`)
        }
        if (cmd.toLowerCase() === `${prefix}clear`) {
            if(message.member.permissions.has("ADMINISTRATOR")) {
                let count = parseInt(args[0]);
                if(isNaN(count)) return message.reply("Please specify the amount of message you want to delete");
                else if(count > 100 || count < 2) {
                  message.channel.send("You can only delete between 2 and 100 messages at one time !")
                } else {
                  message.channel.messages.fetch({ limit: count+1}).then(messages => message.channel.bulkDelete(messages, true));
                }
              } else {
                return message.reply(":x: " + "| You need to be \"ADMINISTRATOR\" to do that")
              }
        }
});

client.login(process.env.BOT_TOKEN);