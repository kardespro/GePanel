// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

const ejs = require('ejs');
const path = require('path');
//const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./Database/dashboard/db.json')
const db = low(adapter)

const config = require("./config.json")
const fetch = require('node-fetch');
const Discord = require("discord.js")
const url = require("url");
var bodyParser = require('body-parser');
const client = new Discord.Client();
//onst path = require("path");

const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;
const moment = require("moment");
require("moment-duration-format");
const helmet = require("helmet");
//const fs = require("fs");
const lis = ["MIT"];

const backup = () => {
    fs.copyFile('./db.json', `./backups/yedekleme • ${moment().format('D-M-YYYY • H.mm.ss')} • laura.sqlite`, err => {
        if (err) return console.log(err);
        console.log('Veritabanını yedekledim.');
    });
};

client.on('ready', () => {
  client.channels.cache.get('id').send('GePanel Başlatıldı!')
  client.user.setActivity("GePanel || Awesome ");
    setInterval(() => backup(), 1000 * 60 * 60 * 24); // Günde bir kere yedekler.
});

/*




 ____  __.  _____ __________________  ___________ _____________________________ ________   
|    |/ _| /  _  \\______   \______ \ \_   _____//   _____/\______   \______   \\_____  \  
|      <  /  /_\  \|       _/|    |  \ |    __)_ \_____  \  |     ___/|       _/ /   |   \ 
|    |  \/    |    \    |   \|    `   \|        \/        \ |    |    |    |   \/    |    \
|____|__ \____|__  /____|_  /_______  /_______  /_______  / |____|    |____|_  /\_______  /
        \/       \/       \/        \/        \/        \/                   \/         \/ 
* =======================================================
* Lisans : MIT
* AUTHOR: KARDESPRO
* LUTFEN README.MD YI OKUYUNUZ
* REMIXLEMEYI UNUTMAYIN
* ÇALAN OLURSA GEREKLI IŞLEMLER BAŞLATILICAKTIR
* =======================================================




*/

var fs = require("fs");
//DISCORD
/*
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./komutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`[GeServer] ${files.length} komut yükleniyor...`);
  files.forEach(f => {                      
    let komutlar = require(`./komutlar/${f}`);   
    console.log(`${komutlar.config.name} komutu yüklendi.`);    
    client.commands.set(komutlar.config.name, komutlar);
    komutlar.config.aliases.forEach(alias => {          
      client.aliases.set(alias, komutlar.config.name);  
    });
  });
})


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

*/






























const gepanel = {
    oauthSecret: "-jV5Nq6uQ9SIyEw3AVmbdv1zRZlZVWbY",
    callbackURL: `https://gepanel.glitch.me//callback`,
    domain: `https://gepanel.glitch.me/`
  };

console.log('Auth Bağlandi')
  
const dataDir = path.resolve(`${process.cwd()}${path.sep}site`);

  const templateDir = path.resolve(`${dataDir}${path.sep}html${path.sep}`);

  app.use("/css", express.static(path.resolve(`${dataDir}${path.sep}css`)));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: "825430536465809409",
    clientSecret: gepanel.oauthSecret,
    callbackURL: gepanel.callbackURL,
    scope: ["identify", "guilds" , "email"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({
    secret: 'gepanel<3',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());


///GePanel

app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); 
  
  function girisGerekli(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/giris");
  }
  
  const render = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  
  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "";
    }
    next();
    

  },
  passport.authenticate("discord"));

  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/en";
    }
    next();
  },
  passport.authenticate("discord"));
  
  app.get("/autherror", (req, res) => {
    render(res,req, "error/auth.ejs");
  });
client.ayarlar = {
  "sahip": ""
  };
app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
    if (client.ayarlar.sahip.includes(req.user.id)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);

    } else {
      res.redirect(`/anasayfa`);
    }
    
    
  });
  

  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
      
    });

    
  });

  app.get("/dashboard", girisGerekli , (req, res) => {
    render(res, req, "dashboard.ejs")
  });

  app.get("/anasayfa", girisGerekli , (req, res) => {
    const guildsize = client.guilds.cache.size;
    const w = client;
    render(res, req, "anasayfa.ejs",{
      w,
      guildsize
    })
  });

  app.get("/", (req, res) => {
    
    render(res, req, "home.ejs",{client})
  });
app.get("/dashboard/:sunucuID/yonet", girisGerekli, (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!sunucu) return res.json({"hata":"Bot "+req.params.sunucuID+" ID adresine sahip bir sunucuda bulunmuyor."});
    const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
//  const kanalid = req.body.kanalid;
  
    render(res, req, "ayarlar/sayfa.ejs", {sunucu, guild});
  });

  app.get("/dashboard/:sunucuID/fakesistem", girisGerekli , (req, res) => {
    const sunucu = req.params.sunucuID;
    const query = req.query.basarili;
      if (!sunucu) return res.json({"hata":"Bot "+req.params.sunucuID+" ID adresine sahip bir sunucuda bulunmuyor."});
    const isManaged = sunucu && !!sunucu.members.get(req.user.id) ? sunucu.member.get(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});

    if(query){
      const basmsg = "Başarılı!";
       render(res, req, "/ayarlar/fakesistem.ejs",{basmsg})
   
      };
    const connectt = client.guilds.cache.get(sunucu);
    render(res, req, "/ayarlar/fakesistem.ejs",{query})
    
  });

  app.post("/dashboard/:sunucuID/fakesistem", girisGerekli , (req, res) => {
    const reqislem = req.body.fakesistem;
    if(reqislem == "on"){
    db.set(`fake-time.${req.params.sunucuID}`, req.body.zaman);
      db.set(`fake-channel.${req.paramssunucuID}`, req.body.chid);
db.set(`fake-role.${req.params.sunucuID}`, req.body.roleid);
 
      res.redirect(`/dashboard/${req.params.sunucuID}/fakesistem`);
      };
    if(reqislem == "off"){
      db.delete(`fake-role.${req.body.roleid}`); 
      db.delete(`fake-time.${req.params.sunucuID}`);
    db.delete(`fake-role.${req.params.sunucuID}`);
      db.delete(`fake-channel.${req.body.kanal}`);
       res.redirect(`/dashboard/${req.params.sunucuID}/fakesistem`);
     
    };
    render(res, req, "/ayarlar/fakesistem.ejs")
    
  });

app.get("/dashboard/:sunucuID/nottut", (req,res) => {
 // db.get("not").push({author: message.author.id, not: a, name: argB, zaman: `${moment(Date.now()).add("h", "3").locale("tr").format("DD:MM:YYYY | HH:MM:SS")}`}).write();
           
  });

app.post("/dashboard/:sunucuID/nottut", (req,res) => {
  const notbody = req.body.not;
  const notismi = req.body.notismi;
  var dbytpe = "lowdb";
  db.get("not").push({author: req.user.id, not: notbody, name: notismi, zaman: `${moment(Date.now()).add("h", "3").locale("tr").format("DD:MM:YYYY | HH:MM:SS")}`}).write();
           res.redirect(`/dashboard/${req.params.sunucuID}/notbak?re=true?save=true?db=lowdb`);
  });


/*
Test
app.get("/dashboard/:sunucuID/kufur", girisGerekli, (req, res) => {
 const sunucu = client.guilds.cache.get(req.params.sunucuID);
 
   const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
   
  if (!isManaged && !req.session.isAdmin) return render(res,req, "error/yonet.ejs");
   render(res, req, "ayarlar/kufur.ejs", {});
  
  });
app.post("/dashboard/:sunucuID/kufur", girisGerekli, (req, res) => {
 
  const islem = req.query.islem;
  if(islem == "basarili"){
    const bmesaj = "Işlem Başarılı!";
     render(res, req, "ayarlar/kufur.ejs", {bmesaj});
  
  }
  
  let küfür = db.fetch(`küfür.${req.params.sunucuID}.durum`)
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
  const inputbody = req.body.inputbody;
  if(inputbody == "true"){
    db.set(`küfür.${req.params.sunucuID}.durum`, true)
       res.redirect(`/dashboard/${req.params.sunucuID}/kufur?islem=basarili`);
  }
  if(inputbody == "false"){
    db.delete(`küfür.${req.params.sunucuID}`)
    res.redirect(`/dashboard/${req.params.sunucuID}/kufur?islem=basarili`);
     
  }
  const kanalid = req.body.kanalid;
  db.set(`küfür.${req.params.sunucuID}.kanal`, kanalid) 
  
   const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
   
  if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
   render(res, req, "ayarlar/kufur.ejs", {});
  
});
*/

//BOT
client.on('guildMemberAdd', async member => {// can#0002

  const database = require('quick.db');
  if(member.user.bot) return;
  
  const kanal = member.guild.channels.cache.get(await database.fetch(`fake-channel.${member.guild.id}`) || 0);
  const zaman = await database.fetch(`fake-time.${member.guild.id}`);
  const rol = member.guild.roles.cache.get(await database.fetch(`fake-role.${member.guild.id}`) || 0);
  if(!kanal || !zaman || !rol) return;

  if(member.user.createdAt.getTime() < require('ms')(zaman)) {

    member.roles.add(rol.id);
    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Fake Tetikleyici')
    .setDescription(`**${member.user.tag}** Fake sistemine takıldı!`);
    return kanal.send(embed);

  } else return;

});// codare  ❤ Nihad But Sad 
//Iletisim : https://kardespro.cf





client.login("ODI1NDMwNTM2NDY1ODA5NDA5.YF90Fw.ATZ59zFJnsMxVx6Ww2kTBLHZKcg");
// our default array of dreams
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("GePanel Şu Rakamli Porta Bağlandı " + listener.address().port);
});
