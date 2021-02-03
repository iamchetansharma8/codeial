const mongoose=require('mongoose');

// creating schema for user's posts
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true //SO that this field gets saved in db
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

// saving Schema to db
const Post=mongoose.model('Post',postSchema);

module.exports=Post;