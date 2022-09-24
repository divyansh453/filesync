const express=require("express");
const fs = require("fs");
const path=require("path");
const app=express();
const port=80;
//express specific stuff
app.use('/static', express.static('static'));//for serving static files
app.use(express.urlencoded());
//pug specific stuff
app.set('view engine', 'pug');//set the tempelate engine as pug
app.set('views', path.join(__dirname,"views"));//set the views directory
//end points
//start the server
app.get('/',(req,res)=>{
    const con="This is the best content on the internet so far so use it wisely";
    const params ={'title':'Pug is best gamr','content':con};
    res.status(200).render('index.pug',params);
});
app.post('/',(req,res)=>{
    let name_=req.body.name;
    let age=req.body.age;
    let gender=req.body.gender;
    let address=req.body.address;
    let more=req.body.more;
    let outputToWrite=`\nName:${name_},Age:${age},Gender:${gender},Address:${address},More about client:${more}.                                  `;
    console.log(outputToWrite);
    fs.appendFileSync('output.txt',outputToWrite);
    const params={'message':'Your Form has been submitted'};
    res.status(200).render('index.pug',params);
});
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});