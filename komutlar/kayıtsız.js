const Discord = require("discord.js");
const jkood = require('../jkood.json');

module.exports.run = async (client, message, args) => {
  
if(!message.member.hasPermission(jkood.KayitYetkilisi)) return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  
const kayıtsız = jkood.kayıtsızrol

let kişi = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kişi) return message.reply('Lütfen Bir Kullanıcı Belirtin.')
if(kişi.id === message.author.id) return message.reply('Kendini Kayıtsıza Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === client.user.id)return message.reply('Botu Kayıtsıza Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === message.guild.OwnerID) return message.reply('Sunucu Sahibini Kayıtsıza Edemessin. Lütfen Geçerli Bir Kullanıcı Gir.');

const embed = new Discord.MessageEmbed()  
.setDescription(`${kişi} Adlı kullanıcıya Unregister Rolü Verildi`)
.setColor('0x348f36')
.setFooter(message.author.tag, message.author.avatarURL({dynamic: true}))
.setTimestamp()
message.channel.send(embed)
  
kişi.roles.add(kayıtsız) 
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)})
message.react('✅')
        

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsız','unreg'],
    permLevel: 0,
}

exports.help = {
      name: "unregister"  
  
}