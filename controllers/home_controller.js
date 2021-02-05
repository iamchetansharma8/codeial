const Post=require('../models/post');
const Friendship=require('../models/friendship');
// importing User to show eveyuser (later freinds) on home page
const User=require('../models/users');
module.exports.home=async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',2);
    
    // populating the user of each post, note that Post schema has user in it
    try{
        if(!req.user){
            return res.redirect('/users/sign-in');
        }
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
           path:'comments',
           populate:{
           path:'user'
        },
        populate:{
            path:'likes'
        }
    }).populate('likes');

        let users=await User.find({}).populate('friendships');
        let cur_user = await User.findById(req.user._id).populate('friendslist', 'name email _id');
        // let cur_user=await User.findById(req.user._id).populate({
            // path:'friendships',
            // populate:{
                // path:'from_user'
            // }
        // });
        let friendship=await Friendship.find({}).populate('from_user').populate('to_user');
        return res.render('home',{
            title:'Codeial | Home',
            posts: posts,
            all_users:users,
            friendship:friendship,
            cur_user:cur_user
        });
    }
    catch(err){
        console.log('Error',err);
        return res.redirect('/users/sign-in');
    }
}
    
    /*
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
*/