const Post=require('../models/post');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',2);
    
    // populating the user of each post, note that Post schema has user in it
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:'Codeial | Home',
            posts:posts
        });
    });
}