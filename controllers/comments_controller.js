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
                    req.flash('error',err);
                    return res.redirect('/');
                }
                post.comments.push(comment);
                post.save();
                if(req.xhr){
                    console.log('hj');
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"Comment Created!"
                    });
                }
                req.flash('success','Comment added!');
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
                req.flash('success','Comment deleted!');
                return res.redirect('back');
            });
        }
        else{
            res.redirect('back');
        }
    });
}