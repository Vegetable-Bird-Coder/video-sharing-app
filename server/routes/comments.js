import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// post a comment
router.post("/", verifyToken, addComment);

// delete a comment
router.delete("/:id", verifyToken, deleteComment);

// get all comments
router.get("/:videoId", getComments);

export default router;