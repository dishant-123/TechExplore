const express = require('express');
const router = express.Router();
const videoSchema = require('../../models/Videos/VideoSchema');

router.get('/', async (req, res) =>{
    try {
        const videodetails = await videoSchema.find();
        return res.json(videodetails); 
    }
    catch (err){
        return res.json({message : err});
    }
});

router.post('/',async (req,res)=>{
    const videodetails ={
        heading:req.body.heading,
        description : req.body.description,
        image : req.body.image,
        videoSource : req.body.videoSource
    }
    let response = await videoSchema.create(videodetails);
    if(response!=null){
        return res.json({
            message : 'SuccessFully upload videoDetails',
             user: videodetails
        })
    }
    else{
        return res.json({message : 'Something went Wrong.'})
    }
})
//to post a comment

router.patch('/videosDescriptionComment/:id',async(req,res) =>{
    //console.log(req.body);
    
    var comment ={
        name : req.body.name,
        email :req.body.email,
        message : req.body.message
    }
    const updatedComment = await videoSchema.updateOne(
        {_id : req.params.id},
        { $push : {comments : comment}}
    );
    const getDescription = await videoSchema.findOne({_id:req.params.id});
    //console.log(updatedComment);
    if(updatedComment){
        return res.json({
            descDetails : getDescription,
            message:'comment upload successfully!'
        });
    }
    else{
        return res.json({
            message : 'SomeThing went wrong.'
        })
    }
});
router.post('/videosPostSubComments',async(req,res) =>{
    // 
    const subComment ={
            email:req.body.email,
           name : req.body.name,
           subMessage : req.body.subComment,
    }
    const updatedSubComment = await videoSchema.updateOne(
        {_id : req.body.descriptionId , "comments._id" : req.body.subCommentId},
        { $push : {"comments.$.subComment" : subComment }}
    );
    const descriptiondetails = await videoSchema.findOne({_id : req.body.descriptionId});
    if(descriptiondetails){
        return res . json({
            descDetails : descriptiondetails,
            message:'succesful updated'
        })
    }
    else {
        return res.json({
            message : 'something went wrong.'
        })
           
    }

})
module.exports = router