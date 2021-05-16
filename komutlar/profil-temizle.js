const Discord = require('discord.js');
const db = require('quick.db') 
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')
   let kişi = message.mentions.users.first();
   if (message.mentions.users.size < 1) return message.reply('Lütfen İstatistiklerini Sıfırlayacak Kişiyi Belirt.');
     if (db.has(`toplamistatistik${kişi.id}`) === false) return message.reply("Belirtilen Kişinin İstatistikleri Zaten 0 Görünüyor.")


   message.reply('Belirtilen Kişinin İstatistikleri Sıfırlanmıştır.')
db.delete(`toplamistatistik${kişi.id}`)
db.delete(`erkekistatistik${kişi.id}`)
db.delete(`kızistatistik${kişi.id}`)  

}; 


exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ["profil-sil","profiltemizle","pt"], 
permLevel: 0
}//DÜZENLENİCEK

exports.help = {
 name: 'profil-temizle', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};