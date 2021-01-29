const queue=require('../config/kue');
const postsMailer=require('../mailers/posts_mailer');
queue.process('postEmail',function(job,done){
    // console.log(job.data);
    postsMailer.newPost(job.data);
    done();
});