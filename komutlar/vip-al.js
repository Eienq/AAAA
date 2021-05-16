const Discord = require('discord.js');
const db = require('quick.db');
const jkood = require('../jkood.json');

exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.reply('Lütfen Bir Kullanıcı veya ID Girin.')
  if (!member.roles.cache.has(jkood.viprol)) return message.reply("Bu Kişi Zaten V.I.P Değil!")
  let vip = jkood.viprol
  
 member.roles.remove(vip)
  
  const embed = new Discord.MessageEmbed()
  .setColor('RED')
  .setDescription(`**İşlem Başarılı** ${member} Kişisi Artık <@&${vip}> Değil!`)
  .setTimestamp()
  .setFooter(`${message.author.tag} Tarafından İstendi.`)
message.channel.send(embed)
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip-al'],
  permLevel: 0
}
exports.help = {
  name: 'vipal',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'vip @kişi'
}