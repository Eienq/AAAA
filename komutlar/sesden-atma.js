const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu komutu kullanmaya yetkin yok!`);
  if (!message.member.voice.channel) {
    return message.channel.send("Ses kanalında olman lazım!");
  }
  let kullanıcı = message.mentions.members.first();
  if (!kullanıcı) return message.channel.send("**Kullanıcıyı etiketlemelisin.**");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voice.channel) return message.channel.send("Etiketlenen kullanıcı bir ses kanalında değil").then(codework => codework.delete({timeout: 5000}));
  const voiceChannel = message.member.voice.channel.id;
  if (!voiceChannel) return;

  member.voice.setChannel(voiceChannel);

  const voiceChannel1 = message.member.voice.channel.name;
  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      message.author +
        " **Tarafından** " +
        kullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`,`${message.author.displayAvatarURL({dynamic:true})}`)
    .setTimestamp();
  client.channels.cache.get("814938089575022602").send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çek"],
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: "çek",
  usage: "çek"
};