const Post =require("../models/post");

exports.getPosts=async(req,res)=>{
    try{
    const posts= await Post.find().select("_id title body");
    res.json({posts});
    }
    catch(error){
        console.log(error);
    }

}

exports.createPost =async(req,res)=>{
    const post =new Post(req.body);
    try{
    await post.save();
    res.status(200).send({
        post:post
    })
    }
    catch(err){
        console.log(err)
    }
}