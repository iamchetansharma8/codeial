const Friendship=require('../models/friendship');
const { find } = require('../models/users');
const User=require('../models/users');
module.exports.beFriend=async function(req,res){
    try{
        let first_person=await User.findById(req.user._id).populate('friendship');
    let sec_person=await User.findById(req.query.f_id).populate('friendship');
    console.log(req.query.f_id);
    if(sec_person){
        let findInFList=await Friendship.findOne({
            to_user:req.query.f_id
        });
        if(!findInFList){
            let new_friendship=await Friendship.create({
                from_user:req.user._id,
                to_user:req.query.f_id
            });
            first_person.friendships.push(new_friendship);
            first_person.save();
            sec_person.friendships.push(new_friendship);
            sec_person.save();
            first_person.friendslist.push(sec_person);
            first_person.save();
            sec_person.friendslist.push(first_person);
            sec_person.save();
            console.log('suuccess made friends');
        }
        console.log('Already friends');
        return res.redirect('back');
    }
    console.log('asds');
    return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.unFriend=async function(req,res){
    try{
        console.log(req.query.frsid);
        let first_person=await User.findByIdAndUpdate(req.user._id,{$pull:{friendships:req.query.frsid,friendslist:req.query.f_id}});
        let sec_person=await User.findByIdAndUpdate(req.query.f_id,{$pull:{friendships:req.query.frsid,friendslist:req.user._id}});
        let friendship=await Friendship.findById(req.query.frsid);
        friendship.remove();

        return res.redirect('back');
    }
    catch(err){
        console.log('Error in deleteing friend',err);
        return res.redirect('back');
    }
}