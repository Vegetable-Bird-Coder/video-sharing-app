import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {

  const [comments, setComments] = useState([]);

  const { curUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {

      }
    }
    fetchComments();
  }, [videoId])

  return (
    <Container>
      <NewComment>
        <Avatar src={curUser.img} referrerPolicy="no-referrer" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map(comment =>
        <Comment key={comment._id} comment={comment} />
      )}
    </Container>
  );
};

export default Comments;
