module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"Users's profile"
    });
}
module.exports.posts=function(req,res){
    return res.end('<h1> User s posts');
}