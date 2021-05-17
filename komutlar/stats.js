const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
let kişi = message.mentions.users.first()
if(!args[0]) {
    const erkekbilgi = await db.fetch(`erkekistatistik${message.author.id}.${message.guild.id}`)
    const kızbilgi = await db.fetch(`kızistatistik${message.author.id}.${message.guild.id}`)
    const toplambilgi = await db.fetch(`toplamistatistik${message.author.id}.${message.guild.id}`)
    const codework = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setTimestamp()
    .setColor("BLUE")
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**Yetkilinin İstatistikleri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam Kaydı \`${toplambilgi ? toplambilgi : '0'}\`**
    **Toplam Erkek Kaydı \`${erkekbilgi ? erkekbilgi : '0'}\`**
    **Toplam Kadın Kaydı \`${kızbilgi ? kızbilgi : '0'}\`**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework)}
  if(kişi) {
    const erkekbilgi = await db.fetch(`erkekistatistik${kişi.id}.${message.guild.id}`)
    const kızbilgi = await db.fetch(`kızistatistik${kişi.id}.${message.guild.id}`)
    const toplambilgi = await db.fetch(`toplamistatistik${kişi.id}.${message.guild.id}`)
    const codework = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL({dynamic:true}))
    .setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
    .setTimestamp()
    .setColor("BLUE")
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**Yetkilinin Bilgileri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam Kaydı \`${toplambilgi ? toplambilgi : '0'}\`**
    **Toplam Erkek Kaydı \`${erkekbilgi ? erkekbilgi : '0'}\`**
    **Toplam Kadın Kaydı \`${kızbilgi ? kızbilgi : '0'}\`**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework)}
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["kayıtlar"],
 permLevel: 0,
};
exports.help = {
 name: 'stats'
};