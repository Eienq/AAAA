const Discord = require("discord.js");
const db = require('quick.db');
const jkood = require('../jkood.json');

exports.run = async (client, message, args) => {
  
  const kayıtkanalı = await jkood.Kayıtkanal
  if(kayıtkanalı == null) return message.channel.send('');
  if (message.channel.id !== kayıtkanalı) return message.channel.send(`Kayıt İşlemlerini Sadece Ayarlanmış Kayıt Kanalından Yapabilirsiniz. (<#${kayıtkanalı}>)`);
  const erkekrol = await jkood.Kayıtkanal
  const alınacakrol = await jkood.Kayıtkanal
  const kayıtlog = await jkood.Kayıtkanal
  
  if(!message.member.hasPermission(jkood.KayitYetkilisi)) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  } else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const user = message.guild.member(member)
    if (user.roles.cache.has(jkood.ErkekRol)) return message.reply("Bu Kişi Zaten Kayıtlı!")
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    setTimeout(function(){user.roles.add(jkood.ErkekRol)},3000)
    setTimeout(function(){user.roles.remove(jkood.AlinacakRol)},4000)
    user.setNickname(`${nick} | ${yas}`)
    
    message.channel.send('Kayıt işlemi Başarılı!')
    db.add(`erkekistatistik${message.author.id}.${message.guild.id}`, 1)
    
      const LogMesajı = new Discord.MessageEmbed()
    .setAuthor("Erkek Üye Kaydı Yapıldı!")
    .addField(`Kayıt Edilen\n`, `${user}`)
    .addField(`Yetkili\n`, `${message.author}`)
    .setFooter("youtube.com/jkood")
    .setColor("BLUE")
    .setThumbnail(member.avatarURL({dynamic:true}))  
    .setTimestamp()  
    message.guild.channels.cache.get(jkood.KayıtLog).send(LogMesajı)
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
   