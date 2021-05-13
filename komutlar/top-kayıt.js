const Discord = require('discord.js')
const db = require('quick.db')
const jkood = require('../jkood.json')

exports.run = async (client, message, member) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);

let kişi = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${kişi.id}.toplam`);
  
let top = message.guild.members.cache.filter(kişi => db.get(`toplamistatistik${kişi.id}`)).array().sort((kişi1, kişi2) => Number(db.get(`toplamistatistik${kişi2.id}`))-Number(db.get(`toplamistatistik${kişi1.id}`))).slice(0, 15).map((kişi, index) => (index+1)+" • <@"+ kişi +"> | \`" + db.get(`toplamistatistik${kişi.id}`) +"\` Kayıta Sahip.").join('\n');
const embed = new Discord.MessageEmbed()
.setAuthor(`Top Stats`, message.guild.iconURL({dynamic: true}))
.setTimestamp()
.setColor("#38ff3d")
.setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL)
.setDescription(top);
message.channel.send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["top-stats", "topkayıt", "top-kayıt"],
    permLevel: 0
};

exports.help = {
    name: "topstats"
}