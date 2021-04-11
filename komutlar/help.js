const Discord = require('discord.js')
exports.run = async (client, message) => {
  const hello = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("GePanel | Yardım Menüsü")
  .setDescription(`
      **GePanel**
   Tüm Komutlar Aşağıda Listelenmiştir!
   
   \`!moderasyon\` / Moderasyon Komutları!
  
   \`!webpanel\` / Web Panel Ayarlarını Görüntüler!
  `)
  message.channel.send(hello)
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
  }
exports.help = {
  name: "yardım",
  description: "",
  usage: ""
  }