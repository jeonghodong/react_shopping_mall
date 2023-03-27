import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../firebase";
import PostChangeModal from "./PostChangeModal";

const Wrap = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 7rem 2rem 7rem;
`;
const InWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;
const Inwrap1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  font-size: 1.3vw;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Date = styled.span`
  font-size: 0.7vw;
`;

const View = styled.span`
  font-size: 0.8vw;
`;
const Right = styled.div``;
const Left = styled.div``;
const Text = styled.pre``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 1rem;
  & span {
    cursor: pointer;
  }
`;
function PostDetail({ posts, setPosts, setUpdateCount }) {
  const [cModal, setCModal] = useState(false);
  const [detail, setDetail] = useState({});
  const userId = useSelector((store) => store.loginState.userId);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setDetail(posts.find((v) => v.bid === Number(id)));
  }, []);

  console.log(detail);

  const deletePost = () => {
    const postsDoc = doc(db.db, "posts", String(detail.id));
    deleteDoc(postsDoc);
    handleDelete();
  };
  const handleDelete = () => {
    const newData = posts.filter((v) => v.bid !== detail.bid);
    setPosts(newData);
    navigate(-1);
  };

  return (
    <>
      {cModal && (
        <PostChangeModal setUpdateCount={setUpdateCount} setDetail={setDetail} detail={detail} setCModal={setCModal} />
      )}
      {detail && (
        <>
          <Wrap>
            <Inwrap1>
              <Title>{detail.title}</Title>
              <Date>{detail.date}</Date>
            </Inwrap1>
            <InWrap>
              <Left>
                <span style={{ fontSize: "0.7vw" }}>집사명 : {detail.name}</span>
              </Left>
              <Right>
                <View>조회수 {detail.view}</View>
              </Right>
            </InWrap>
            <Text>{detail.text}</Text>
            <Footer>
              {userId === detail.userId ? (
                <>
                  <span style={{ marginRight: "2rem" }} onClick={() => setCModal(true)}>
                    수정
                  </span>
                  <span onClick={() => deletePost()}>삭제</span>
                </>
              ) : null}
            </Footer>
          </Wrap>
        </>
      )}
    </>
  );
}

export default PostDetail;
