const Discord = require("discord.js");
const db = require('quick.db');
const jkood = require('../jkood.json');

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission(jkood.KayitYetkilisi)) { return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  } else {
    
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.reply("Lütfen Bir Kullanıcı Girin.")
    if(member.id === client.user.id) return message.reply('Botun İsmini Değiştiremessin. Lütfen Geçerli Bir Kullanıcı Gir.')
    if(member.id === message.guild.OwnerID) return message.reply('Sunucu Sahibinin İsmini Değiştiremessin. Lütfen Geçerli Bir Kullanıcı Gir.')
    const user = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Lütfen Bir İsim Girin.")
      if (isNaN(yas)) return message.channel.send("Lütfen Bir Yaş Girin.");
    user.setNickname(`${jkood.tag} ${nick} | ${yas}`)
    
    let sayı = 1
  let data = db.get("jkood."+message.guild.id+user.user.id)
  let isimler 
  if(data){
   isimler = db.get("jkood."+message.guild.id+user.user.id).map(jkoodcommunity => `**${sayı++}. \`${jkoodcommunity.name}\`**`).slice(0, jkood.maxEskiİsim).join("\n")
  } else {
       isimler = "`Eski İsim Kaydı Bulunamadı!`"
  }
    
    db.push("jkood."+message.guild.id+user.user.id,{
    id: user.user.id,
    name: `${jkood.tag} ${nick} | ${yas}`,
    tarih: Date.now(),
  })
    
      const embed = new Discord.MessageEmbed()
    .setAuthor("İsim Değiştirme Başarılı!")
    .addField(`İsmi Değiştirilen\n`, `${user}`)
    .addField(`Yetkili\n`, `${message.author}`)
    .addField(`Yeni İsim\n`, `${jkood.tag} ${nick} | ${yas}`)
    .setFooter("youtube.com/jkood")
    .setColor("BLUE")
    .setThumbnail(member.avatarURL({dynamic:true}))  
    .setTimestamp()  
    message.channel.send(embed)

   
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i"],
  permLevel: 0
};
exports.help = {
  name: "isim",
  description: "",
  usage: "isim @etiket"
};
   