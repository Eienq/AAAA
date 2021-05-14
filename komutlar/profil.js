const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  let kişi = message.mentions.members.first()
  if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')
  
  const isim = await db.push(`Eskiİsimler.${message.guild.id}.${member.id}`, `${name} | ${age}`);
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(kişi.user.username, kişi.user.avatarURL({dynamic:true}))
    .setThumbnail(kişi.user.avatarURL(({dynamic:true})))
    .setTimestamp()
    .addField(`Adı Ve Hesap İD`, `${kişi.user.username}#${kişi.user.discriminator} (${kişi.user.id})`)
    .addField(`Sunucu İçi Bilgileri`, `${kişi.user}`)
    .addField(`Hesap Kuruluş Tarihi`, `${moment(kişi.user.createdAt).format(" DD/MMMM/YYYY ")}`)
    .addField(`Sunucuya Giriş Tarihi\n`, `${moment(kişi.joinedTimestamp).format('D/MMMM/YYYY')}`)
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    message.channel.send(embed)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["p"],
 permLevel: 0,
};
exports.help = {
 name: 'profil'
};