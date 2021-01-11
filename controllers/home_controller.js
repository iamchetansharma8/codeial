const Post=require('../models/post');

// importing User to show eveyuser (later freinds) on home page
const User=require('../models/users');
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',2);
    
    // populating the user of each post, note that Post schema has user in it
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:'Codeial | Home',
                posts: posts,
                all_users:users
            });
        });
    });
}