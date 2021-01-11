const Post=require('../models/post');

// importing Comment to delete comments corresponding to every post
const Comment=require('../models/comments');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating a post');
            return;
        }
        return res.redirect('back');
    });
}
module.exports.destroy=function(req,res){
    // finding the post which is to be deleted in db ( it's details have come from user through params.id)
    // callback argument post will contain post to be deleted after it's found without any error
    Post.findById(req.params.id,function(err,post){
        // req.user._id is replace by .id as this gives us a string value to compare here
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({Post:req.params.id},
                // only err as single argument as comments have been deleted
                function(err){
                    return res.redirect('back');
                });
        }
        else{
            return res.redirect('back');
        }
    });
}