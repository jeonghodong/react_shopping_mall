import { useState } from "react";
import styled from "styled-components";
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/slice/loginSlice";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InBox = styled.div`
  border-radius: 30px;
  width: 40vw;
  height: 80vh;
  background-color: white;
`;
const Input = styled.input`
  width: 30vw;
  margin-bottom: 2rem;
  height: 9vh;
  border-radius: 20px;
  border: gray solid 1px;
  outline: none;
  padding: 0rem 1rem 0rem 1rem;
  font-size: 15px;
`;
const InputBox = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  margin-top: 1.5rem;
  border: 1px solid black;
  background-color: #7779ff;
  padding: 2rem 5rem 2rem 5rem;
  border-radius: 20px;
  font-size: 1rem;
  width: 30vw;
  text-align: center;
  cursor: pointer;
`;
const TopBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  display: contents;
  font-size: 2vw;
  font-weight: bold;
`;
const AlertRed = styled.span`
  position: absolute;
  color: red;
  font-size: 0.9rem;
  bottom: 7.5rem;
`;
const AlertRed1 = styled.span`
  position: absolute;
  color: red;
  font-size: 0.9rem;
  bottom: 15rem;
`;
const AlertBlue = styled.span`
  position: absolute;
  color: blue;
  font-size: 0.9rem;
  bottom: 7rem;
`;
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password === "") {
      return;
    }

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence) // 세션스토리지에 저장
      .then(() => {
        signInWithEmailAndPassword(auth, email, password) // 정보 보내기
          .then((res) => {
            if (res.operationType === "signIn") {
              const user = { userId: res.user.uid, name: res.user.displayName, email: res.user.email, isLogin: true };
              dispatch(login(user));
              navigate("/Cats");
              setEmail("");
              setPassword("");
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err.code);
            if (err.code === "auth/user-not-found") {
              alert("존재하지 않는 이메일입니다.");
            }
            if (err.code === "auth/wrong-password") {
              alert("잘못된 비밀번호 입니다.");
            }
          });
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <Wrap>
      <InBox>
        <TopBox>
          <Text>로그인</Text>
        </TopBox>
        <InputBox onSubmit={handleSubmit}>
          {/* 이벤트 전파방지 */}
          <Input
            type="email"
            style={{ marginTop: "5rem" }}
            placeholder="아이디(이메일)"
            value={email}
            onChange={handleEmail}
          />
          <Input type="password" placeholder="비밀번호" value={password} onChange={handlePassword} />
          <Btn>로그인</Btn>
        </InputBox>
      </InBox>
    </Wrap>
  );
}

export default Login;
