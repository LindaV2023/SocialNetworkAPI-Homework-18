// imports
const router = require("express").Router();



// imports functions written in userController.js file
const {
//   getUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// route -> http://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// route -> http://localhost:3001/api/users/:userId
router
  .route("/:userId")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// route -> http://localhost:3001/api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// exports
module.exports = router;