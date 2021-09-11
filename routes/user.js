const express = require("express");

const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const router = express.Router();



router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.get("/user/photo/:userId", userPhoto);   
router.delete("/user/:userId", requireSignin, deleteUser);

router.param("userId", userById);

module.exports = router;
