const express = require('express');
const router = express.Router();
const gadgetDetails = require('../models/gadgetDetails');
const userLikesSchema = require('../models/GadgetUserDescriptionLike');

router.get('/', async (req, res) =>{
    try {
        const gadgetPageDetails = await gadgetDetails.find().sort({date : -1});
        return res.json(gadgetPageDetails); 
    }
    catch (err){
        return res.json({message : err});
    }
});
router.get('/activeUserLikes/:id',async (req,res) =>{
    const details = await userLikesSchema.findOne({email : req.params.id});
    // console.log(details);
    if(details){
        return res.json({
            activeUserLike : details.descriptionLikes,
            message : 'sucessfuly get post'
        })
    }
    else{
        return  res.json({
            activeUserLike : [],
            message : 'sucessfuly get post'
        })
    }
})
router.get('/getDescriptionDetails/:id',async (req,res) =>{
    // console.log('hello');
    const details = await gadgetDetails.findOne({_id : req.params.id});
    // console.log(details);
    return res.json({
        descDetails : details,
    });
})
router.patch('/gadgetDescriptionComments/:id',async(req,res) =>{
    //console.log(req.body);
    
    var comment ={
        name : req.body.name,
        email :req.body.email,
        message : req.body.message
    }
    const updatedComment = await gadgetDetails.updateOne(
        {_id : req.params.id},
        { $push : {comments : comment}}
    );
    const getDescription = await gadgetDetails.findOne({_id:req.params.id});
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
router.post('/', async (req,res) => {
        console.log('hello') ; 
        const contentOfGadget = new gadgetDetails ({
            heading : req.body.heading,
            image : req.body.image,
            description : req.body.description 
        });
        const savedPost = await gadgetDetails.create(contentOfGadget);
            if(savedPost){
                return res.json({
                    message: 'You Sign Up SuceessFully!!',
                    user : contentOfGadget
                });
            }
            else{
                return res.json({
                    message : 'Something Went Wrong Please Try Again After sometime',
                })
            }
    });
    //like is handeleded.
    router.patch('/gadgetDescription/likeHandle/:id', async (req,res) =>{
        //  const user = {
        //     name : req.body.name,
        //     email  : req.body.email,
        //     isLiked : true
        // }
        // const userFind  = await gadgetDetails.findOne({_id : req.params.id,"like.email" : req.body.email});
        // // console.log(userFind.like[0]._id);
        // //want to like the post(description)
        // if(userFind===null){
        //     const updatedUserlike = await gadgetDetails.updateOne(
        //         {_id : req.params.id},
        //         { $push : {like : user}}
        //     );
        //     //increment likes count for given post 
        //     const incrementLikes = await gadgetDetails.update (
        //         {_id : req.params.id},
        //         {$inc :{likesCount : +1}}
        //     ) 
        //     const allDetails = await gadgetDetails.find();//for giving all the details with updated user like on that post.
        //     return res.json({
        //         allDetails : allDetails,
        //         message : 'successfully liked post'
        //     });
        // }
        // //want to dislike the post
        // else{
        //        //remove the user like from that post.
        //         const dislikePostResponse = await gadgetDetails.updateOne(
        //             {_id : req.params.id},
        //             {$pull : {like : {_id : userFind.like[0]._id}} }
                    
        //         );
        //         // console.log(dislikePostResponse);
        //         // decrement post likes by one
        //         const decrementLikes = await gadgetDetails.updateOne (
        //             {_id : req.params.id},
        //             {$inc :{likesCount : -1}}
        //         ) 
        //         const allDetails = await gadgetDetails.find();//for giving all the details with updated user like on that post.
        //          return res.json({
        //             allDetails  : allDetails,
        //             massage : 'succesfully disliked post'
        //         })
        // }
        // const user = {
        //     name : req.body.name,
        //     email  : req.body.email,
        //     id : req.params.id
        // }
        const userFind  = await userLikesSchema.findOne({email : req.body.email});
        console.log(userFind);
        //existing user want to dislike or like that post..
        if(userFind)
        {
            const likeOrDisLikePost =  await userLikesSchema.findOne({email : req.body.email,"descriptionLikes.id" : req.params.id}); 
            if(likeOrDisLikePost)//dislike post.
            {
                const dislikePostResponse = await userLikesSchema.updateOne(
                    {email : req.body.email},
                    {$pull : {descriptionLikes : {id : req.params.id}} }
                );
                const decrementLikes = await gadgetDetails.updateOne (
                    {_id : req.params.id},
                    {$inc :{likesCount : -1}}
                )
                const allDetails = await gadgetDetails.find();//updated description due to decrese in like count.
                const activeUserLike = await userLikesSchema.findOne({email : req.body.email});//due to add use like in other database. 
                console.log(activeUserLike.descriptionLikes);
                return res.json({
                    allDetails :allDetails,
                    activeUserLike : activeUserLike.descriptionLikes,
                    message : 'succesfully dislike post'
                })
            }
            else//existing user wants to like
             {
                    const likedResponse = await userLikesSchema.updateOne(
                        {email : req.body.email},
                        {$push : {descriptionLikes : {id : req.params.id}} }
                    );
                    const incrementLikes = await gadgetDetails.updateOne ( 
                        {_id : req.params.id},
                        {$inc :{likesCount : +1}}
                    )
                    const allDetails = await gadgetDetails.find();//updated description due to decrese in like count.
                    const activeUserLike = await userLikesSchema.findOne({email : req.body.email});//due to add use like in other database. 
                    return res.json({
                        allDetails :allDetails,
                        activeUserLike : activeUserLike.descriptionLikes,
                        message : 'succesfully like post'
                    }) 
             }
        }
        //for new user like
        else
        {
            const createUser = new userLikesSchema ({
                name : req.body.name,
                email : req.body.email,
               descriptionLikes : [{"id":req.params.id}] 
            });
            const savedPost = await userLikesSchema.create(createUser);
            // console.log(createUser);
            const incrementLikes = await gadgetDetails.updateOne (
                {_id : req.params.id},
                {$inc :{likesCount : +1}}
            )
            const allDetails = await gadgetDetails.find();//updated description due to decrese in like count.
            const activeUserLike = await userLikesSchema.findOne( {email : req.body.email} );//due to add use like in other database. 
            return res.json({
                allDetails :allDetails,
                activeUserLike : activeUserLike.descriptionLikes,
                message : 'succesfully like post'
            })
             
        }
    });
router.post('/postSubComments',async(req,res) =>{
    // 
    const subComment ={
            
           name : req.body.name,
           subMessage : req.body.subComment,
    }
    const updatedSubComment = await gadgetDetails.updateOne(
        {_id : req.body.descriptionId , "comments._id" : req.body.subCommentId},
        { $push : {"comments.$.subComment" : subComment }}
    );
    const descriptiondetails = await gadgetDetails.findOne({_id : req.body.descriptionId});
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

module.exports = router;
