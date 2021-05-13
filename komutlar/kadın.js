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
  const erkekrol = await jkood.KadınRol
  const alınacakrol = await jkood.AlinacakRol
  const kayıtlog = await jkood.KayıtLog
  if(!erkekrol) return message.reply(`Erkek Rolü Ayarlanmamış!`)
  //if(!alınacakrol) return message.reply(`Alınacak Rol Ayarlanmamış!`) BURADAKİ // BU İŞARETLERİ SİLERSENİZ ALINACAK ROL GİREREK KULLANMAYA BAŞLARSINIZ. EĞER SİLMESSENİZ ALINACAK ROL GİRMENİZE GEREK KALMAZ.
  if(!kayıtlog) return message.reply(`Kayıt Log Ayarlanmamış!`)
    
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Lütfen Bir Kullanıcı Girin.")
    const user = message.guild.member(member)
    if (user.roles.cache.has(jkood.KadınRol)) return message.reply("Bu Kişi Zaten Kayıtlı!")
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Lütfen Bir İsim Girin.")
      if (isNaN(yas)) return message.channel.send("Lütfen Bir Yaş Girin.");
    setTimeout(function(){user.roles.add(jkood.KadınRol)},3000)
    setTimeout(function(){user.roles.remove(jkood.AlinacakRol)},4000) //EĞER ALINACAK ROL GİRMEDİYSENİZ BU KOD SATIRININ *BAŞINA* // BU İKİ İŞARETİ KOYUN.
    user.setNickname(`${nick} | ${yas}`)
    
    message.channel.send('Kayıt işlemi Başarılı!')
    db.add(`kızistatistik${message.author.id}.${message.guild.id}`, 1)
    
      const LogMesajı = new Discord.MessageEmbed()
    .setAuthor("Kadın Üye Kaydı Yapıldı!")
    .addField(`Kayıt Edilen\n`, `${user}`)
    .addField(`Yetkili\n`, `${message.author}`)
    .addField(`Verilen Rol`,`${jkood.KadınRol}`)
    .addField(`Alınan Rol`,`${jkood.AlinacakRol}`)
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
  aliases: ["k"],
  permLevel: 0
};
exports.help = {
  name: "kadın",
  description: "",
  usage: "kadın @etiket"
};
   