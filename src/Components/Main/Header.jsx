import React from "react";
import styled from "styled-components";
import CatLogo from "../../assets/Logo.svg";
import User from "../../assets/user-solid.svg";
import Cart from "../../assets/cart-shopping-solid.svg";
import { useNavigate } from "react-router-dom";

const Logo = styled.img`
  cursor: pointer;
`;
const TopWrap = styled.div`
  border-bottom: 0.5px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 2rem;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  & span {
    font-size: 0.9vw;
  }
`;
const Right = styled.div`
  display: flex;

  & span {
    font-size: 0.9vw;
    margin-right: 1rem;
    cursor: pointer;
  }
`;
const RightBar = styled.div`
  & img {
    width: 2vw;
    margin-right: 2rem;
    cursor: pointer;
  }
`;
const Input = styled.input`
  width: 45vw;
  height: 60px;
  background-color: #eeeeee;
  outline: none;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  padding: 0rem 1rem 0rem 1rem;
  margin-left: 2rem;
  font-weight: light;
`;
const BtmWrap = styled.div``;
const Wrap = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  margin-bottom: 3rem;
  z-index: 9999;
`;
function Header() {
  const navigate = useNavigate();
  console.log("로그인 전 헤더 렌더링");
  return (
    <Wrap>
      <TopWrap>
        <Left>
          <span>즐겨찾기</span>
        </Left>
        <Right>
          <span onClick={() => navigate("/Login")}>로그인</span>
          <span onClick={() => navigate("/SignUp")}>회원가입</span>
        </Right>
      </TopWrap>
      <TopWrap>
        <Left>
          <Logo src={CatLogo} alt="logo" onClick={() => navigate("/Cats")} />
          <Input type="text" placeholder="어떤 상품을 찾냐옹?" />
        </Left>
        <Right>
          <RightBar>
            <img src={User} alt="userPage" onClick={() => navigate("/Profile")} />
          </RightBar>
          <RightBar>
            <img src={Cart} alt="cartPage" style={{ width: "2.5vw" }} onClick={() => navigate("ShoppingBasket")} />
          </RightBar>
        </Right>
      </TopWrap>
    </Wrap>
  );
}

export default Header;
