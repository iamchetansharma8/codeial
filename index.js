const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

// importing passport things
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

// importing MongoStore to preserve cookies even after server restart
const MongoStore=require('connect-mongo')(session);

// import sass-middleware
const sassMiddleware=require('node-sass-middleware');

// import connect-flash npm install connect-flash
const flash=require('connect-flash');

// flash middleware custom
const customMware=require('./config/middleware');
// using sass middleware
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'extented',
    prefix:'/css'
}));

// decode url
app.use(express.urlencoded());

// use cookie parser
app.use(cookieParser());

// tell where to look for static files
app.use(express.static('./assets'));

// access uploads
app.use('/uploads',express.static(__dirname+'/uploads'));

// use express-ejs-layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use session
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connected to mongo to preserve session cookies');
    }
    )
}));

// use passport
app.use(passport.initialize());
app.use(passport.session());

// call setAuthenticated function
app.use(passport.setAuthenticatedUser);

// using flash after session cookies are set
app.use(flash());

// using customMware
app.use(customMware.setFlash);

// Use express router
app.use('/',require('./routes/index'));
app.listen(port,function(err){
    if(err){
        console.log('Error:',err);
    }
    console.log(`Server running on port:${port}`);
});

// start mongodb
// sudo systemctl start mongod