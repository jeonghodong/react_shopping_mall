import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
  background-color: #000000;
  color: white;
  padding: 2rem 5rem 2rem 5rem;
  border-radius: 20px;
  font-size: 1rem;
  width: 30vw;
  text-align: center;
  cursor: pointer;
  transition: 0.5s;
  border: none;
  &:disabled {
    background-color: #bebebe;
    border: none;
  }
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
  bottom: 14.5rem;
`;
const AlertBlue = styled.span`
  position: absolute;
  color: blue;
  font-size: 0.9rem;
  bottom: 7rem;
`;
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const SignUpBtn = useRef();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordTooShort(true);
    } else {
      setPasswordTooShort(false);
    }
  };
  const handleConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (password && confirmPasswordValue && password === confirmPasswordValue) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
    if (name && email && password && confirmPasswordValue && password === confirmPasswordValue) {
      SignUpBtn.current.disabled = false;
    } else {
      SignUpBtn.current.disabled = true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).catch((err) => console.log(err));
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        alert("가입완료, 로그인해주세요.");
        navigate("/Login");
        console.log(res);
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          alert("해당 이메일은 이미 존재합니다.");
        }
        console.log(err.message);
      });
  };

  return (
    <Wrap>
      <InBox>
        <TopBox>
          <Text>회원가입</Text>
        </TopBox>
        <InputBox onSubmit={handleSubmit}>
          {/* 이벤트 전파방지 */}
          <Input type="name" placeholder="이름" style={{ marginTop: "5rem" }} value={name} onChange={handleName} />
          <Input type="email" placeholder="아이디(이메일)" value={email} onChange={handleEmail} />
          <Input type="password" placeholder="비밀번호" value={password} onChange={handlePassword} />
          {passwordTooShort && <AlertRed1>비밀번호가 너무 짧습니다. (6자 이상 입력해주세요.)</AlertRed1>}
          <Input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={handleConfirmPassword} />
          <Btn ref={SignUpBtn} disabled>
            회원가입 완료
          </Btn>
          {confirmPassword &&
            (confirm ? (
              <AlertBlue>비밀번호가 일치합니다.</AlertBlue>
            ) : (
              <AlertRed>비밀번호가 일치하지 않습니다.</AlertRed>
            ))}
        </InputBox>
      </InBox>
    </Wrap>
  );
}

export default SignUp;
