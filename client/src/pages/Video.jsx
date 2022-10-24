import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchFail, fetchSuccess, fetchStart, like, dislike } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { curUser } = useSelector(state => state.user);
  const { curVideo } = useSelector(state => state.video);

  const dispath = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      dispath(fetchStart());
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispath(fetchSuccess(videoRes.data));
      } catch (err) {
        dispath(fetchFail());
      }
    }
    fetchVideo();
  }, [path]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${curVideo._id}`);
    dispath(like(curUser._id));
  }

  const handledisLike = async () => {
    await axios.put(`/api/users/dislike/${curVideo._id}`);
    dispath(dislike(curUser._id));
  }

  const handleSub = async () => {
    curUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/users/sub/${channel._id}`)
      : await axios.put(`/api/users/unsub/${channel._id}`)
    dispath(subscription(channel._id));
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={curVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{curVideo.title}</Title>
        <Details>
          <Info>{curVideo.view} views • {format(curUser.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {curVideo.likes?.includes(curUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {curVideo.likes?.length}
            </Button>
            <Button onClick={handledisLike}>
              {curVideo.dislikes?.includes(curUser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} {curVideo.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribes} subscribers</ChannelCounter>
              <Description>
                {curVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{curUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={curVideo._id} />
      </Content>
      <Recommendation tags={curVideo.tags} />
    </Container>
  );
};

export default Video;
