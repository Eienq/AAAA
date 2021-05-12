const Discord = require(`discord.js`);
const db = require(`quick.db`)

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
let kişi = message.mentions.users.first()
if (!kişi) return message.reply("Lütfen Bir kullanıcı Belirtin.")
    const erkekbilgi = await db.fetch(`erkekistatistik${kişi.id}.${message.guild.id}`)
    const kızbilgi = await db.fetch(`kızistatistik${kişi.id}.${message.guild.id}`)
    const codework = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL())
    .setThumbnail(kişi.avatarURL({dynamic:true}))
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**Yetkilinin Bilgileri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${erkekbilgi ? erkekbilgi : '0'}\` Erkek Kayıtı Bulunuyor.**
    **Toplam \`${kızbilgi ? kızbilgi : '0'}\` Kız Kayıtı Bulunuyor.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
};
exports.help = {
 name: 'stats'
};