const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.on('guildMemberAdd', (member) => {
        const channelId = member.guild.systemChannelId;
        const embed = new MessageEmbed();
        embed.setTitle("New Member!")
              .setColor("BLUE")
              .setAuthor(member.user.tag)
              .setFooter(member.joinedAt.toUTCString())
              .setTimestamp(member.joinedAt.toUTCString());
        member.guild.channels.cache.get(channelId).send({embeds: [embed]});
      });
}