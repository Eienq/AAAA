const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  let kişi = message.mentions.members.first()
  if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')
  
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

  
    const embed = new Discord.MessageEmbed()
    .setAuthor(kişi.user.username, kişi.user.avatarURL({dynamic:true}))
    .setThumbnail(kişi.user.avatarURL(({dynamic:true})))
    .setTimestamp()
    .addField(`Adı Ve Hesap İD`, `${kişi.user.username}#${kişi.user.discriminator} (${kişi.user.id})\n**Sunucudaki Adı:** ${kişi.nickname}`)
    .addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'))
    .addField(`Hesap Kuruluş Tarihi`, `${moment(kişi.user.createdAt).format(" DD/MMMM/YYYY ")}`, true)
    .addField(`Sunucuya Giriş Tarihi\n`, `${moment(kişi.joinedTimestamp).format('D/MMMM/YYYY')}`, true)
    .addField('Rozetler', `${rozetler ? mentionFlags : 'Yok'}`)
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