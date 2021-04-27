//COOMING SOON 
//GEPANEL V 1.0

const ex = require("express");
const app = ex();
const configg = require("././config.json");
app.get("/", (req,res) => {
const array = {
`${configg.siteURL}/api/$apiPath`
};
res.json(array);
});
app.get("/goldver?:query", (req,res) => {
const query = req.query.query;
db.set(`goldd_${query}`);
res.redirect("./api");
});
app.get("/yonlendir", (req,res) => {
const site = req.query.hedefsite;
/*

@ Var hedefsite

@ /api/yonlendir?hedefsite=sitelinki

*/
});
app.listen(660)
