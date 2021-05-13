const Discord = require("discord.js");
const jkood = require('../jkood.json')
const db = require('quick.db')

exports.run = async(client, message, args) => {

const kayıtyetkilisi = await jkood.KayitYetkilisi
let sıra = 1
let mesaj = message.guild.members.cache.filter(mem => mem.roles.cache.has(kayıtyetkilisi)).array().sort((a, b) => { 
return ((db.fetch(`toplamistatistik${b.user.id}`) || 0) -(db.fetch(`toplamistatistik${a.user.id}`) || 0));}).slice(0, 10).map(member => { 
return `\n **${sıra++}.**  <@${member.user.id}> : **${db.fetch(`toplamistatistik${member.user.id}`) || 0}** kayıt (**${db.fetch(`kızistatistik${member.user.id}`) || 0}** kız , **${db.fetch(`erkekistatistik${member.user.id}`) || 0}** erkek)`})

let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(mesaj)
message.channel.send(embed)

}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};
  
exports.help = {
name: 'kayıt-bilgi',
}