import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostModal from "./PostModal";

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgb(166, 70, 244);
  color: white;
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
  display: inline;
`;
function PostHeader({ modal, setModal, setPosts, posts }) {
  const navigate = useNavigate();
  const isLogin = useSelector((store) => store.loginState.isLogin);
  return (
    <>
      <Wrap>
        <span>제목</span>
        <span>집사명</span>
        <span>작성일</span>
        <span>조회수</span>
        <Writing
          onClick={() => {
            if (isLogin === false) {
              alert("로그인을 해주세요.");
              navigate("/Login");
              return;
            }
            setModal(true);
          }}
        >
          글쓰기
        </Writing>
      </Wrap>
      {modal && <PostModal setModal={setModal} setPosts={setPosts} posts={posts} />}
    </>
  );
}

export default PostHeader;
