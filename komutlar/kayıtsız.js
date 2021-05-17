const Discord = require("discord.js");
const jkood = require('../jkood.js');

exports.run = async(client, message, args) => {
if(!message.member.hasPermission(jkood.KayitYetkilisi)) return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  
const kayıtsız = jkood.kayıtsızrol

let kişi = message.mentions.members.first()
if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')

if(kişi.id === message.author.id) return message.reply('Kendini Kayıtsıza Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === client.user.id)return message.reply('Botu Kayıtsıza Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === message.guild.OwnerID) return message.reply('Sunucu Sahibini Kayıtsıza Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.');
  const user = message.guild.member(kişi)
  if (user.roles.cache.has(kayıtsız)) return message.reply("Bu Kişi Zaten Kayıtsız!")
  
  user.setNickname("")

const embed = new Discord.MessageEmbed()
.setAuthor("Kayıtsıza Atma İşlemi Başarılı!")
.addField(`Kayıtsıza Atılan`, `${kişi}`)
.addField(`İşlemi Uygulayan`,`${message.author}`)
.setColor('BLUE')
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
.setTimestamp()
message.channel.send(embed)
  
kişi.roles.add(kayıtsız) 
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)})
      
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unregister'],
    permLevel: 0,
}
exports.help = {
      name: "kayıtsız"
}