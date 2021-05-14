const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, member) => {
  
if(!message.member.roles.cache.some(r => [(ayarlar.yetkiliROL)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply(`Bu komutu sadece yetkililer kullanabilir!!!`)

  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`toplamistatistik${uye.id}`);
let yazı = "Top Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`toplamistatistik${uye.id}.${message.guild.id}`)).array().sort((uye1, uye2) => Number(db.get(`toplamistatistik${uye2.id}.${message.guild.id}`))-Number(db.get(`toplamistatistik${uye1.id}.${message.guild.id}`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`toplamistatistik${uye.id}.${message.guild.id}`) +"\` Kayıta Sahip.").join('\n');
const embed = new Discord.MessageEmbed()
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