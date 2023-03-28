import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { reset } from "../../Redux/slice/loginSlice";
import { getAuth, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { login } from "../../Redux/slice/loginSlice";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  & input {
    width: 10vw;
    outline: none;
    border-radius: 10px;
    border: 1px solid #c0c0c0;
    height: 40px;
    padding: 0.5rem;
  }
  & h2 {
    font-size: 1.8vw;
  }
  & span {
    font-size: 1.5vw;
    margin-bottom: 2rem;
  }
`;
const PwdInput = styled.input`
  width: 20vw !important;
  outline: none;
  border-radius: 10px;
  border: 1px solid #c0c0c0;
  height: 40px;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;
const InBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
  justify-content: space-between;
  & h2 {
    font-size: 1.5vw;
    font-weight: bold;
    margin-right: 2rem;
  }
`;
const Name = styled.input`
  font-size: 1vw;
  margin-bottom: 2rem;
  width: 13vw;
  text-align: center;
`;
const Line = styled.div`
  width: 30vw;
  height: 2px;
  border-radius: 15%;
  background-color: #9c9c9c;
  margin-bottom: 2rem;
`;
const Circle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #eeeeee;
  margin-bottom: 2rem;
`;
const Btn = styled.button`
  cursor: pointer;
  border: none;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 10px;
  border: none;
  background-color: white;
`;
const Btn1 = styled.button`
  cursor: pointer;
  border: none;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 10px;
  border: none;
  background-color: white;
  margin-right: 2rem;
  border: 1px solid gray;
`;

const Exit = styled.span`
  cursor: pointer;
  font-size: 1vw !important;
  color: #b6b6b6;
  border-bottom: 1px solid #b6b6b6;
  padding-bottom: 1px;
`;

const InWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Alert = styled.span`
  color: red;
  position: absolute;
  font-size: 0.8vw !important;
  top: 75px;
  left: 0;
`;

const PwdMdoal = styled.div`
  background-color: #0000006c;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const OutBox = styled.div`
  background-color: white;
  width: 40vw;
  height: 40vh;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 5rem;
  flex-direction: column;
  align-items: center;
`;

const CofirmPwd = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem 1rem 2rem;
  font-size: 1.2vw;
  background-color: blue;
  color: white;
  width: 20vw;
  &:disabled {
    background-color: #a8a8a8;
  }
`;
function ProfileMain() {
  const name = useSelector((store) => store.loginState.name);
  const email = useSelector((store) => store.loginState.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modModal, setModModal] = useState(false);
  const [modName, setModName] = useState(name);
  const [pwdModal, setPwdModal] = useState(false);
  const [modEmail, setModEmail] = useState(email);
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [pwdAlert, setPwdAlert] = useState(false);
  const [pwdAlert1, setPwdAlert1] = useState(false);

  const handleLogout = () => {
    dispatch(reset());
    navigate("/");
  };
  const handlePwdModal = () => {
    setPwdModal(true);
  };
  const handleTrueMod = () => {
    setModModal(true);
  };
  const user = getAuth().currentUser;

  // 파이어베이스 이메일 변경 및 리덕스 이메일 변경
  const handleFalseMod = () => {
    updateEmail(user, modEmail)
      .then((res) => {
        const updatedUser = { email: modEmail };
        dispatch(login(updatedUser));
        alert("메일 변경 완료");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/requires-recent-login") {
          alert("재로그인 후 다시 시도해주세요.");
          dispatch(reset());
          navigate("/");
        }
      });
  };

  // 파이어베이스 이름 변경 및 리덕스 이름 변경
  const handleChangeName = () => {
    updateProfile(user, {
      displayName: modName,
    })
      .then((res) => {
        const updatedUser = { name: modName };
        dispatch(login(updatedUser));
        alert("이름 변경 완료");
      })
      .catch((err) => {
        if (err.code === "auth/user-token-expired") {
          alert("재로그인 후 다시 시도해주세요.");
          dispatch(reset());
          navigate("/");
          console.log(err.code);
        }
      });
  };

  const handleChangePwd = () => {
    // 파이어베이스 비밀번호 변경
    updatePassword(user, confirmPwd)
      .then(() => {
        alert("비밀번호를 변경하였습니다. 다시 로그인 해주세요.");
        dispatch(reset());
        navigate("/login");
      })
      .then(() => {
        setPwdModal(false);
      })
      .catch((err) => {
        if (err.code === "auth/requires-recent-login") {
          alert("재로그인 후 다시 시도해주세요.");
          dispatch(reset());
          navigate("/");
          console.log(err.code);
        }
        console.error(err);
      });
  };

  const handleName = (e) => {
    setModName(e.target.value);
  };

  const handleEmail = (e) => {
    setModEmail(e.target.value);
  };
  const handlePwd = (e) => {
    setPwd(e.target.value);
    if (e.target.value.length > 5) {
      setPwdAlert(false);
    } else {
      setPwdAlert(true);
    }
  };
  const handleConfirmPwd = (e) => {
    setConfirmPwd(e.target.value);
    if (pwd !== e.target.value) {
      setPwdAlert1(true);
      setDisabled(true);
    } else {
      setPwdAlert1(false);
      setDisabled(false);
    }
    if (pwd === "") {
      setPwdAlert1(false);
    }
  };

  //ESC 클릭시 document자체를 잡아준 다음 handleEscPress 실행
  useEffect(() => {
    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
        setPwdModal(false);
      }
    };
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);
  return (
    <Wrap>
      <Line />
      <Circle />
      {modModal ? (
        <div style={{ flexDirection: "colum" }}>
          <Name type="text" value={modName} onChange={handleName} />
          <Btn onClick={handleChangeName} style={{ margin: "0", color: "white", backgroundColor: "red" }}>
            이름 수정
          </Btn>
        </div>
      ) : (
        <span>{name}</span>
      )}
      <InWrap>
        <InBox>
          {modModal ? (
            <>
              <Name type="email" value={modEmail} onChange={handleEmail} />
              <Btn onClick={handleFalseMod} style={{ margin: "0", color: "white", backgroundColor: "red" }}>
                메일 수정
              </Btn>
            </>
          ) : (
            <span>{email}</span>
          )}
        </InBox>
      </InWrap>
      <div>
        {modModal ? (
          <Btn onClick={() => setModModal(false)} style={{ margin: "0", color: "white", backgroundColor: "blue" }}>
            수정 완료
          </Btn>
        ) : (
          <>
            <Btn1 onClick={handleLogout}>로그아웃</Btn1>
            <Btn1 onClick={handleTrueMod} style={{ color: "white", backgroundColor: "red" }}>
              정보수정
            </Btn1>
            <Btn1 onClick={handlePwdModal} style={{ margin: "0", color: "white", backgroundColor: "blue" }}>
              암호변경
            </Btn1>
          </>
        )}
      </div>
      <div style={{ marginTop: "2rem" }}>{modModal || <Exit>회원탈퇴</Exit>}</div>
      {pwdModal && (
        <PwdMdoal onClick={() => setPwdModal(false)}>
          <OutBox onClick={(e) => e.stopPropagation()}>
            <InBox>
              <h2>새 비밀번호</h2>
              {pwdAlert && <Alert>비밀번호를 6글자 이상 입력해주세요.</Alert>}
              <PwdInput type="password" value={pwd} onChange={handlePwd} />
            </InBox>
            <InBox>
              <h2>새 비밀번호 확인</h2>
              {pwdAlert1 && <Alert>새 비밀번호가 일치하지 않습니다.</Alert>}
              <PwdInput type="password" value={confirmPwd} onChange={handleConfirmPwd} />
            </InBox>
            <CofirmPwd onClick={handleChangePwd} disabled={disabled}>
              비밀번호 변경
            </CofirmPwd>
          </OutBox>
        </PwdMdoal>
      )}
    </Wrap>
  );
}

export default ProfileMain;
