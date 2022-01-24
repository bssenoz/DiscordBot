module.exports = (client) => {
    client.on('guildMemberRemove', (member) => {
      const channelId = member.guild.systemChannelId;
      member.guild.channels.cache.get(channelId).send("Byeee");
    });
}