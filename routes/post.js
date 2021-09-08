const express=require('express');

const postController=require('../controllers/post');

const {createPostValidator}=require('../validator/index');
const router=express.Router();

router.get('/',postController.getPosts);

router.post('/post',createPostValidator,postController.createPost);

module.exports=router;