const Discord = require("discord.js");
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MOVE_MEMBERS")) return message.reply("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!")
    let kanal = args[1];
    let kişi = message.mentions.members.first()
    const user = message.guild.member(kişi)
    if (!kanal) return message.reply("Kanal belirtmedin")
    if (!kişi) return message.reply("Kullanıcıyı belirtmedin")
    kişi.set.voice.channel(`${kanal}`)
        .then(() =>
            message.channel.send(`${kişi} <#${kanal}> adlı kanala taşındı`))
        .catch(console.error);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitaşı'],
    permLevel: 0
};
exports.help = {
    name: 'taşı',
    description: 'İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.',
    usage: 'taşı [kullanıcı] [kanal id]'
};