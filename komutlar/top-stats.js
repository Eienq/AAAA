const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  
let liste = message.guild.members.cache.filter(uye => db.get(`toplamistatistik${uye.id}.${message.guild.id}`)).array().sort((uye1, uye2) => Number(db.get(`toplamistatistik${uye2.id}.${message.guild.id}`))-Number(db.get(`toplamistatistik${uye1.id}.${message.guild.id}`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`toplamistatistik${uye.id}.${message.guild.id}`) +"\` Kayıt").join('\n');
const embed = new Discord.MessageEmbed()
.setAuthor(`Top Kayıt Listesi`)
.setTimestamp()
.setColor("BLUE")
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL({dynamic:true}))
.setDescription(liste)
message.channel.send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["top-stats", "top", "top-kayıt", "topkayıt"],
    permLevel: 0
};

exports.help = {
    name: "topstats"
}