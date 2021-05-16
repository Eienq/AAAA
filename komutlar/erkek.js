const Discord = require("discord.js");
const db = require('quick.db');
const jkood = require('../jkood.json');
const zaman = require("useful-tools")

exports.run = async (client, message, args) => {
  
  const kayıtkanalı = await jkood.Kayıtkanal
  if(kayıtkanalı == null) return message.channel.send('');
  if (message.channel.id !== kayıtkanalı) return message.channel.send(`Kayıt İşlemlerini Sadece Ayarlanmış Kayıt Kanalından Yapabilirsiniz. (<#${kayıtkanalı}>)`);
  if(!message.member.hasPermission(jkood.KayitYetkilisi)) { return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  } else {
  const erkekrol = await jkood.ErkekRol
  const alınacakrol = await jkood.AlinacakRol
  if(!erkekrol) return message.reply(`Erkek Rolü Ayarlanmamış!`)
  //if(!alınacakrol) return message.reply(`Alınacak Rol Ayarlanmamış!`) BURADAKİ // BU İŞARETLERİ SİLERSENİZ ALINACAK ROL GİREREK KULLANMAYA BAŞLARSINIZ. EĞER SİLMESSENİZ ALINACAK ROL GİRMENİZE GEREK KALMAZ.
    
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.reply("Lütfen Bir Kullanıcı Girin.")
    if(member.id === message.author.id) return message.reply('Kendini Kayıt Edemessin. Lütfen Geçerli Bir Kullanıcı Gir.')
    if(member.id === client.user.id) return message.reply('Botu Kayıt Edemessin. Lütfen Geçerli Bir Kullanıcı Gir.')
    if(member.id === message.guild.OwnerID) return message.reply('Sunucu Sahibini Kayıt Edemessin. Lütfen Geçerli Bir Kullanıcı Gir.')
    const user = message.guild.member(member)
    if (user.roles.cache.has(jkood.ErkekRol)) return message.reply("Bu Kişi Zaten Kayıtlı!")
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Lütfen Bir İsim Girin.")
      if (isNaN(yas)) return message.channel.send("Lütfen Bir Yaş Girin.");
    setTimeout(function(){user.roles.add(jkood.ErkekRol)},3000)
    setTimeout(function(){user.roles.remove(jkood.AlinacakRol)},4000)//EĞER ALINACAK ROL GİRMEDİYSENİZ BU KOD SATIRININ *BAŞINA* // BU İKİ İŞARETİ KOYUN.
    setTimeout(function(){user.roles.remove(jkood.kayıtsızrol)},5000)
    user.setNickname(`${jkood.tag} ${nick} | ${yas}`)
  
    let sayı = 1
  let data = db.get("jkood."+message.guild.id+user.user.id)
  let isimler 
  if(data){
   isimler = db.get("jkood."+message.guild.id+user.user.id).map(jkoodcommunity => `**${sayı++}. \`${jkoodcommunity.name}\` - \`${jkoodcommunity.cinsiyet}\`**`).slice(0, jkood.maxEskiİsim).join("\n")
  } else {
       isimler = "`Eski İsim Kaydı Bulunamadı!`"
  }
  db.push("jkood."+message.guild.id+user.user.id,{
    id: user.user.id,
    name: `${jkood.tag} ${nick} | ${yas}`,
    tarih: Date.now(),
    cinsiyet: "Erkek",
    kaydeden: message.author.id
  })
    
      const embed = new Discord.MessageEmbed()
    .setAuthor("Erkek Üye Kaydı Yapıldı!")
    .addField(`Kayıt Edilen\n`, `${user}`)
    .addField(`Kayıt Tarihi\n`, `${zaman.tarih(Date.now())}`)
    .addField(`Yetkili\n`, `${message.author}`)
    .setFooter("youtube.com/jkood")
    .setColor("BLUE")
    .setThumbnail(member.avatarURL({dynamic:true}))  
    .setTimestamp()  
    message.guild.channels.cache.get(jkood.Kayıtkanal).send(embed)

   db.add(`erkekistatistik${message.author.id}.${message.guild.id}`, 1) 
   db.add(`toplamistatistik${message.author.id}.${message.guild.id}`, 1)
   
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
   