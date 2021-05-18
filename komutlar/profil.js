const Discord = require('discord.js');
const db = require('quick.db');
const jkood = require('../jkood.js');
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!kişi) return message.reply('Lütfen Bir Kullanıcı veya ID Girin.')
  if (isNaN(kişi)) return message.channel.send("Lütfen Bir Geçerli ID Girin.");
  const user = message.guild.member(kişi)
  
  let mention = message.author;
if(message.mentions.members.first()) mention = message.mentions.members.first().user;
let mentionMember = message.guild.members.cache.get(mention.id);
  
  let rozetler = false;
if(mention.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};
  
  let mentionFlags = mention.flags.toArray().join(' | ')
.replace('HOUSE_BRAVERY', 'Bravery')  
.replace('HOUSE_BRILLIANCE', 'Brilliance')
.replace('HOUSE_BALANCE', 'Balance')
.replace('VERIFIED_DEVELOPER', '1. Dönemde Doğrulanmış Bot Geliştiricisi')
.replace('DISCORD_EMPLOYEE', 'Discord Çalışanı')
.replace('PARTNERED_SERVER_OWNER', 'Discord Partner')
.replace('HYPESQUAD_EVENTS', 'HypeSquad Events')
.replace('BUGHUNTER_LEVEL_1', 'Bug Avcısı 1. Lvl')
.replace('EARLY_SUPPORTER', 'Erken Destekçi')
.replace('TEAM_USER', 'Takım Üyesi')
.replace('SYSTEM', 'Sistem')
.replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
.replace('VERIFIED_BOT', 'Onaylı Bot');

let sayı = 1
  let data = db.get("jkood."+message.guild.id+user.user.id)
  let isimler 
  if(data){
   isimler = db.get("jkood."+message.guild.id+user.user.id).map(jkoodcommunity => `**${sayı++}. \`${jkoodcommunity.name}\`**`).slice(0, jkood.Eskiİsimler).join("\n")
  } else {
       isimler = "`Eski İsim Kaydı Bulunamadı!`"
  }
  
   let sayı2 = 1
  let data2 = db.get("jkood."+message.guild.id+user.user.id)
  let katarih 
  if(data2){
   katarih = db.get("jkood."+message.guild.id+user.user.id).map(jkoodcommunity => `**${sayı2++}. \`${jkoodcommunity.tarih}\`**`).slice(0, jkood.KayitTarihi).join("\n")
  } else {
       katarih = "`Kayıt Tarihi Bulunamadı!`"
  }
  
  let sayı3 = 1
  let data3 = db.get("jkood."+message.guild.id+user.user.id)
  let kayetkili
  if(data3){
   kayetkili = db.get("jkood."+message.guild.id+user.user.id).map(jkoodcommunity => `**${sayı3++}. \`${jkoodcommunity.kaydeden}\`**`).slice(0, jkood.kayitedenler).join("\n")
  } else {
       kayetkili = "`Kayıt Edenler Bulunamadı!`"
  }
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(kişi.user.username, kişi.user.avatarURL({dynamic:true}))
    .setThumbnail(kişi.user.avatarURL(({dynamic:true})))
    .setTimestamp()
    .addField(`Adı Ve Hesap İD`, `${kişi.user.username}#${kişi.user.discriminator} (${kişi.user.id})\nSunucudaki Adı: ${kişi.nickname}`)
    .addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'))
    .addField(`Hesap Kuruluş Tarihi`, `${moment(kişi.user.createdAt).format(" DD/MMMM/YYYY ")}`, true)
    .addField(`Sunucuya Giriş Tarihi\n`, `${moment(kişi.joinedTimestamp).format('D/MMMM/YYYY')}`, true)
    .addField(`Eski İsimler\n`, `${isimler}`)
    .addField(`Sunucuya Kayıt Tarihleri\n`, `${katarih}`)
    .addField(`Kayıt Edenler\n`, `${kayetkili}`)
    //.addField('Rozetler', `${rozetler ? mentionFlags : 'Yok'}`)
    .addField('Roller', mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') : 'Yok')
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