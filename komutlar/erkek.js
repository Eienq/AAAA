const Discord = require("discord.js");
const db = require('quick.db');
const jkood = require('../jkood.json');

exports.run = async (client, message, args) => {
  
  const kayıtkanalı = await jkood.Kayıtkanal
  if(kayıtkanalı == null) return message.channel.send('');
  if (message.channel.id !== kayıtkanalı) return message.channel.send(`Kayıt İşlemlerini Sadece Ayarlanmış Kayıt Kanalından Yapabilirsiniz. (<#${kayıtkanalı}>)`);
  
  if(!message.member.hasPermission(jkood.KayitYetkilisi)) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  } else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const user = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    setTimeout(function(){user.roles.add(jkood.ErkekRol)},3000)
    setTimeout(function(){user.roles.remove(jkood.AlinacakRol)},4000)
    user.setNickname(`[${nick}] [${yas}]`)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Erkek Üye Kaydı Yapıldı!")
    .addField(`Kaydı yapılan\n`, `${user.user.tag}`)
    .addField(`Kaydı yapan\n`, `${message.author.tag}`)
    .addField(`Yeni isim\n`, `[${nick}] [${yas}]`)
    .setFooter("Upper | Kayıt Sistemi")
    .setColor("BLUE")
    message.channel.send(`${message.author} Kayıt İşlemi Başarılı!`)
    db.add(`erkekistatistik${message.author.id}.${message.guild.id}`, 1)
    message.guild.channels.cache.get(jkood.KayıtLog).send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: "erkek @etiket"
};
   