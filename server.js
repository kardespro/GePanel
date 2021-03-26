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
 
const adapter = new FileSync('db.json')
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
const lis = ["MIT"];


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



const gepanel = {
    oauthSecret: "vBZnwpizI1EagY3Rxowd9s84IXFFQvoH",
    callbackURL: `https://gepanel.glitch.me/callback`,
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
    clientID: "77",
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
      res.redirect(`/dashboard`);
    }
    
    
  });
  

  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
      
    });

    
  });
  
  app.get("/", (req, res) => {
    render(res, req, "home.ejs")
  });
app.get("/dashboard/:sunucuID/yonet", girisGerekli, (req, res) => {
    const sunucu = client.guilds.cache.get(req.params.sunucuID);
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!sunucu) return res.json({"hata":"Bot "+req.params.sunucuID+" ID adresine sahip bir sunucuda bulunmuyor."});
    const isManaged = sunucu && !!sunucu.member(req.user.id) ? sunucu.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) return res.json({"hata":"Bu sunucuda Sunucuyu Yönet iznin bulunmuyor. Bu yüzden bu sayfaya erişim sağlayamazsın."});
    render(res, req, "ayarlar/sayfa.ejs", {sunucu, guild});
  });

app.get("/dashboard/:sunucuID/kufur", girisGerekli, (req, res) => {
  let küfür = db.fetch(`küfür.${}.durum`)

});




// our default array of dreams
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
