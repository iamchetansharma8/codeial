const Comment=require('../models/comments');
const Post=require('../models/post');

module.exports.create=function(req,res){
    // find by id the post as id is being named as post in ejs 
    Post.findById(req.body.post,function(err,post){
        // check if post exists in callback function
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                // handle error
                if(err){
                    console.log('Error in sending comment to db or saving it in post comments[]');
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });
        }
        else{
            res.redirect('back');
        }
    });
}