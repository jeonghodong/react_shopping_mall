import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #eeeeee;
  position: relative;
  padding: 1rem;

  span:first-child {
    width: 55%;
    text-align: center;
  }

  span:not(:first-child) {
    width: 15%;
  }
`;
const Writing = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: -100px;
  z-index: 100;
  background-color: red;
  display: inline;
`;
function PostHeader({ modal, setModal, setPosts, posts, setWord, word }) {
  return (
    <>
      <Wrap>
        <span>제목</span>
        <span>작성자</span>
        <span>작성날짜</span>
        <span>조회수</span>
        <Writing onClick={() => setModal(true)}>글쓰기</Writing>
      </Wrap>
      {modal && <PostModal word={word} setWord={setWord} setModal={setModal} setPosts={setPosts} posts={posts} />}
    </>
  );
}

export default PostHeader;
