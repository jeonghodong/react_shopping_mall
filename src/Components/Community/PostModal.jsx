import { addDoc, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import db from "../../firebase";

const Wrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #00000076;
  top: 0;
  left: 0;
  z-index: 100000;
`;

const Input = styled.input`
  width: 80vw;
  height: 50px;
  border-radius: 10px;
  border: none;
  outline: none;
  margin-bottom: 2rem;
  padding: 1rem;
  font-size: 1vw;
`;

const Textarea = styled.textarea`
  width: 80vw;
  height: 70vh;
  border-radius: 10px;
  border: none;
  outline: none;
  resize: none;
  white-space: pre;
  padding: 1rem;
  font-size: 1vw;
  &::placeholder {
    font-size: 1vw;
  }
`;

const Form = styled.form`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Btn = styled.button``;

function PostModal({ setModal, setPosts, posts }) {
  const userId = useSelector((store) => store.loginState.userId);
  const name = useSelector((store) => store.loginState.name);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  const data = {
    userId: userId,
    bid: posts.length,
    title: title,
    name: name,
    text: text,
    date: year + "." + month + "." + date + " " + hours + ":" + minutes,
    view: "0",
  };

  // firestore에 포스트 저장
  const usersCollectionRef = collection(db.db, "posts");
  const createCart = async () => {
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    await addDoc(usersCollectionRef, data);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };

  // 데이터보내기
  const handleData = (e) => {
    e.preventDefault();
    if (text === "" || title === "") {
      return;
    }
    setPosts([data, ...posts]);
    setModal(false);
    createCart();
  };

  //ESC 클릭시 document자체를 잡아준 다음 handleEscPress 실행
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
        setModal(false);
      }
    };
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  return (
    <Wrap onClick={() => setModal(false)} onSubmit={handleData}>
      <div onClick={(e) => e.stopPropagation()}>
        <Form>
          <Input type="text" placeholder="제목을 입력해주세요." value={title} onChange={handleTitle} />
          <Textarea placeholder="내용을 입력해주세요." value={text} onChange={handleText}></Textarea>
          <Btn>글쓰기</Btn>
        </Form>
      </div>
    </Wrap>
  );
}

export default PostModal;
