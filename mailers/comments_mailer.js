const nodemailer=require('../config/nodemailer');
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    console.log('Inside newComment mailer');
    nodemailer.transporter.sendMail({
        from:'dev88chetan@gmail.com',
        to:comment.user.email,
        subject:'New Comment',
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