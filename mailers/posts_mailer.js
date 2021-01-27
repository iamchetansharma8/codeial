const nodemailer=require('../config/nodemailer');
exports.newPost=(post)=>{
    let htmlString=nodemailer.renderTemplate({post:post},'/posts/new_post.ejs');
    console.log('Inside newPost mailer');
    nodemailer.transporter.sendMail({
        from:'dev88chetan@gmail.com',
        to:post.user.email,
        subject:'New Post',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log(info);
        return;
    });
}