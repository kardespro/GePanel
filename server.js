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










// our default array of dreams
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
