import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;

  span:first-child {
    width: 55%;
    text-align: center;
  }

  span:not(:first-child) {
    width: 15%;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
`;
function Posts({ posts }) {
  const navigate = useNavigate();
  return (
    <>
      {posts.map((v) => (
        <div key={v.bid}>
          <Wrap>
            <span style={{ cursor: "pointer" }} onClick={() => navigate(`/CommunityDetail/${v.bid}`)}>
              {v.title}
            </span>
            <span>{v.name}</span>
            <span>{v.date}</span>
            <span>{v.count}</span>
          </Wrap>
          <Line>{""}</Line>
        </div>
      ))}
    </>
  );
}

export default Posts;
