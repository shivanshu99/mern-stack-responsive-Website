const express = require("express");
const path = require("path");
require("./db/conn");

const User=require("./models/contactus")
const hbs=require("hbs")
const app = express();
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, "../template/partials");


app.use(
	"/css",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
	"/js",
	express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);

app.use(
	"/jq",
	express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views",templatepath)
hbs.registerPartials(partialspath);


app.get("/", (req, res) => {
	res.render("index");
});
app.get("/gallery", (req, res) => {
	res.render("image");
});


app.post("/contact",async(req,res)=>{
try {
	const userData=new User(req.body);
	await userData.save();
	res.status(201).render("index")
} catch (error) {
	res.status(500).send(error);
}
})
app.listen(port, () => {
	console.log("App is running");
});



