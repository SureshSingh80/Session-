const express=require("express");
const session = require("express-session");
const app=express();
const path=require("path");
const flash=require("connect-flash");

app.listen(80,()=>{
    console.log(`app is listening at port 80`);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let sessionOption={
                    secret:"mysupersecretsting",
                    resave:false,
                    saveUninitialized:true
                   }
app.use(session(sessionOption));
app.use(flash());

app.get("/test",(req,res)=>{
    res.send("test successfull");
   
});

// exm of practicle implementation of session
app.get("/reqCount",(req,res)=>{
    if(req.session.count)
         req.session.count++;
    else 
        req.session.count=1;
    res.send(`you sent this request ${req.session.count} times`);
});

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous")
        req.flash("error","user registration failed");
    else
        req.flash("success","user registration successfully! ");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    // res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
    res.locals.successMsg=req.flash("success"); // we can write this code in middleware also
    res.locals.errorMsg=req.flash("error"); // we can write this code in middleware also
    
    res.render("page.ejs",{name:req.session.name});

});