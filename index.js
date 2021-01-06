const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

// decode url
app.use(express.urlencoded());

// use cookie parser
app.use(cookieParser());

// tell where to look for static files
app.use(express.static('./assets'));
// use express-ejs-layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Use express router
app.use('/',require('./routes/index'));
// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log('Error:',err);
    }
    console.log(`Server running on port:${port}`);
});