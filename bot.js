const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const jkood = require('./jkood.json');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`discord.gg/codework`, { type:'WATCHING' })
  
  console.log("CodeWork Akıyor!!")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\
//HG MESAJI

client.on("guildMemberAdd", async member => {
    
  let kayıtekibi = jkood.KayitYetkilisi
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  var kontrol;
if (kurulus < 1296000000) kontrol = ' **Şüpheli** '
if (kurulus > 1296000000) kontrol = ' **Güvenli** '
  moment.locale("tr");
  
  const hgmesajı = new Discord.MessageEmbed()
    .setAuthor("Aramıza Yeni Bir Üye Katıldı!")
    .addField(`Toplam Kişi Sayımız`, `${member.guild.memberCount} Oldu!`)
    .addField(`Güvenlik Durumu`, `${kontrol}`)
    .addField(`Hesap Kuruluş Tarihi`, `${moment(member.user.createdAt).format(" **DD/MMMM/YYYY**")}`)
    .addField(`Kayıt Hakkında`, `Kayıt Olabilmek için Kayıt Odalarına Girip, Kayıt Yetkililerini Beklemelisiniz.`)
    .setFooter("youtube.com/jkood")
    .setColor("BLUE")
    .setThumbnail(user.avatarURL({dynamic:true}))  
    .setTimestamp()  
 client.channels.cache.get(jkood.Kayıtkanal).send(`${user} <@&${kayıtekibi}>`, hgmesajı)
  
  });

//HG MESAJI SON

//OTO İSİM

client.on("guildMemberAdd", member => {
  var rol = jkood.otorol
   member.roles.add(rol)
   member.setNickname("youtube.com/jkood")   
   })

//OTO İSİM SON

//TAG ALANA ROL

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = "!"; //tagınız
    let sunucu = "712978502176997380"; //sunucu ID
    let kanal = "718761514542301237" //log kanal id
    let rol = "752891156102250517"; //tag alınca verilcek rol id
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.channels.cache.get(kanal).send(`${newUser} **\`${tag}\`** tagını aldığı için <@&${rol}> rolünü kazandı!`)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
      client.channels.cache.get(kanal).send(`${newUser} **\`${tag}\`** tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    }

  }
})

//TAG ALANA ROL