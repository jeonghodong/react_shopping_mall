import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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

function PostChangeModal({ detail, setCModal, setDetail, setUpdateCount }) {
  const [cTitle, setCTitle] = useState(detail.title);
  const [cText, setCText] = useState(detail.text);

  const handleTitle = (e) => {
    setCTitle(e.target.value);
  };
  const handleText = (e) => {
    setCText(e.target.value);
  };

  // 수정할 데이터보내기
  const handleData = (e) => {
    e.preventDefault();
    if (cText === "" || cTitle === "") {
      return;
    }
    setDetail({
      ...detail,
      title: cTitle,
      text: cText,
    });
    updateUser();
    setCModal(false);
    setUpdateCount((v) => v + 1);
  };

  // 업데이트 - U
  const updateUser = async () => {
    const postsDoc = doc(db.db, "posts", detail.id);
    const newField = { ...detail, title: cTitle, text: cText };
    await updateDoc(postsDoc, newField);
  };

  //ESC 클릭시 document자체를 잡아준 다음 handleEscPress 실행
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
        setCModal(false);
      }
    };
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);
  return (
    <div>
      <Wrap>
        <div onClick={(e) => e.stopPropagation()}>
          <Form onSubmit={handleData}>
            <Input type="text" placeholder="제목을 입력해주세요." value={cTitle} onChange={handleTitle} />
            <Textarea placeholder="내용을 입력해주세요." value={cText} onChange={handleText}></Textarea>
            <Btn>글쓰기</Btn>
          </Form>
        </div>
      </Wrap>
    </div>
  );
}

export default PostChangeModal;
