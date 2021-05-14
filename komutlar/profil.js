const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
let kişi = message.mentions.users.first()
  if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')
    const embed = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL({dynamic:true}))
    .setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
    .setTimestamp()
    .addField(`Sunucuya Giriş Tarihi\n`, `${moment(kişi.joinedAt).format('D MMMM YYYY')}`)
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