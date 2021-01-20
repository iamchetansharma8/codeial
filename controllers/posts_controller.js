const Post=require('../models/post');
const User=require('../models/users');
// importing Comment to delete comments corresponding to every post
const Comment=require('../models/comments');

module.exports.create= async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        if(req.xhr){
            post = await post.populate('user','name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created"
            });
        }
        req.flash('success','New post published successfully');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}
module.exports.destroy= async function(req,res){
    // finding the post which is to be deleted in db ( it's details have come from user through params.id)
    // callback argument post will contain post to be deleted after it's found without any error
    try{
        let post=await Post.findById(req.params.id);
        // req.user._id is replace by .id as this gives us a string value to compare here
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({Post:req.params.id});
            // only err as single argument as comments have been deleted

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post deleted'
                });
            }
            req.flash('success','Post deleted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error','You can not delete this post');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}