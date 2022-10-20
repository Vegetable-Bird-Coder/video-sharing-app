import express from "express";
import { addVideo, deleteVideo, getVideo, randomVideo, subscribeVideo, trendVideo, updateVideo, viewVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// create a video
router.post("/", verifyToken, addVideo);

// update a video
router.put("/:id", verifyToken, updateVideo);

// delete a video
router.delete("/:id", verifyToken, deleteVideo);

// find a video
router.get("/find/:id", getVideo);

// add views
router.put("/view/:id", viewVideo);

// get trend videos
router.get("/trend", trendVideo);

// get random videos
router.get("/random", randomVideo);

// get subsribed videos
router.get("/sub", verifyToken, subscribeVideo);


export default router;