// imports
const router = require("express").Router();


// imports functions written in thoughtController.js file
const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// route -> http://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// Route -> http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
//   .put(updateThought)
//   .delete(deleteThought);

// route -> http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/").put(updateThought);

// route -> http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/").get(getThought).delete(deleteThought);

  // route -> http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);




// route -> http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// exports
module.exports = router;