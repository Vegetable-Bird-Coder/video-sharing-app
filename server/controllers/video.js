import { createError } from "../error.js";
import Video from "../Models/Video.js";
import User from "../Models/User.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not find!"));
        }
        if (req.user.id === video.params.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedVideo);
        } else {
            res.status(403).json("You can update only your video!")
        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) {
            return next(createError(404, "Video not find!"));
        }
        if (req.user.id === video.params.id) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("The video has been deleted!");
        } else {
            res.status(403).json("You can delete only your video!")
        }
    } catch (err) {
        next(err);
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not find!"))
        }
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

export const viewVideo = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased!");
    } catch (err) {
        next(err);
    }
}

export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const subscribeVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}


