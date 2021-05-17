const Discord = require('discord.js');
const db = require('quick.db');
const jkood = require('../jkood.js');

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.reply('Lütfen Bir Kullanıcı veya ID Girin.')
  if (member.roles.cache.has(jkood.viprol)) return message.reply("Bu Kişi Zaten V.I.P!")
  let vip = jkood.viprol
  
 member.roles.add(vip)
  
  const embed = new Discord.MessageEmbed()
    .setAuthor("VIP Verme İşlemi Başarılı!")
    .addField(`Vip Yapılan\n`, `${member}`)
    .addField(`Yetkili\n`, `${message.author}`)
    .setFooter("youtube.com/jkood")
    .setColor("BLUE")
    .setThumbnail(member.user.avatarURL({dynamic:true}))  
    .setTimestamp()  
message.channel.send(embed)
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip-ver'],
  permLevel: 0
}
exports.help = {
  name: 'vip',
  description: "Vip verir",
  usage: 'vip @kişi'
}