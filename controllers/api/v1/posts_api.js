const Post=require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.index=async function(req,res){
    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user','-password -_id')
        .populate({
           path:'comments',
           populate:{
           path:'user'
        }
    });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    });
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

            return res.json(200,{
                message:"Post deleted!!"
            });
        }
        else{
            return res.json(401,{
                message:"you are not authorised to delete this post"
            });
        }
    }
    catch(err){
        return res.json(500,{
            message:'Error in deleting post'
        });
    }
}