import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CatLogo from "../../assets/Logo.svg";
import User from "../../assets/user-solid.svg";
import Cart from "../../assets/cart-shopping-solid.svg";
import db from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const Logo = styled.img`
  cursor: pointer;
  width: 9vw;
`;
const TopWrap = styled.div`
  border-bottom: 0.5px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem 0.5rem 2rem;
`;
const TopWrap1 = styled.div`
  border-bottom: 0.5px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem 0.5rem 2rem;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  & span {
    font-size: 0.7vw;
  }
`;
const Right = styled.div`
  display: flex;
  & span {
    font-size: 0.7vw;
    margin-right: 1rem;
    cursor: pointer;
  }
`;
const RightBar = styled.div`
  position: relative;
  & img {
    cursor: pointer;
  }
  & span {
    position: absolute;
    top: 0;
    left: 25px;
    border: none;
    padding: 0.3vw 0.5vw;
    border-radius: 50%;
    background-color: #7a7aff;
    color: white;
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 45vw;
  height: 40px;
  background-color: #eeeeee;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  padding: 0rem 1rem 0rem 1rem;
  margin-left: 2rem;
  font-weight: light;
`;
const UserImg = styled.img`
  width: 2vw;
  margin-right: 2rem;
  cursor: pointer;
`;
const Wrap = styled.div`
  top: 0;
  background-color: white;
  z-index: 9999;
  position: sticky;
  width: 100%;
`;

const Post = styled.span`
  cursor: pointer;
  font-weight: 500;
  margin-left: 1rem;
  font-size: 1vw !important;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  background-color: #8888ff;
  color: white;
`;

const Line = styled.div`
  background-color: #f0f0f0;
  height: 40px;
  width: 2px;
  border-radius: 0.3px;
  margin-left: 1rem;
`;

function Header() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db.db, "users");
  const userId = useSelector((store) => store.loginState.userId);
  const isLogin = useSelector((store) => store.loginState.isLogin);

  // 해당 uid를 가진 사람의 장바구니 데이터만 들고옵니다.
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.filter((doc) => doc.data().userId === userId);
      const newData = filteredData.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(newData);
    };

    getUsers();

    // Create a listener to update users in real-time when the database changes
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const updatedData = snapshot.docs.filter((doc) => doc.data().userId === userId);
      const newData = updatedData.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(newData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const goProfile = () => {
    if (isLogin === false) {
      alert("로그인을 해주세요.");
      navigate("/Login");
    } else {
      navigate("/Profile");
    }
  };
  return (
    <>
      <TopWrap1>
        <Left>
          <span>즐겨찾기</span>
        </Left>
        <Right>
          <span onClick={() => navigate("/Login")}>로그인</span>
          <span onClick={() => navigate("/SignUp")}>회원가입</span>
        </Right>
      </TopWrap1>
      <Wrap>
        <TopWrap>
          <Left>
            <Logo src={CatLogo} alt="logo" onClick={() => navigate("/")} />
            <Input type="text" placeholder="어떤 상품을 찾냐옹?" />
            <Line />
            <Post onClick={() => navigate("/Community")}>냥냥 게시판</Post>
          </Left>
          <Right>
            <RightBar>
              <UserImg src={User} alt="userPage" onClick={goProfile} />
            </RightBar>
            <RightBar>
              <img
                src={Cart}
                alt="cartPage"
                style={{ width: "2.5vw", marginRight: ".5rem" }}
                onClick={() => navigate("ShoppingBasket")}
              />
              {users.length >= 1 && <span>{users.length}</span>}
            </RightBar>
          </Right>
        </TopWrap>
      </Wrap>
    </>
  );
}

export default Header;
