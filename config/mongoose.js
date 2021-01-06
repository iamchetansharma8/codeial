const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial_environment');

const db=mongoose.connection;
db.on('err',console.error.bind(console,"Error connecting to mongodb"));
db.once('open',function(){
    console.log('Connected to database::Mongodb');
});
module.exports=db;