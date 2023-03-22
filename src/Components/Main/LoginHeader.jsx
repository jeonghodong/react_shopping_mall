import React, { useState } from "react";
import styled from "styled-components";
import CatLogo from "../../assets/Logo.svg";
import User from "../../assets/user-solid.svg";
import Cart from "../../assets/cart-shopping-solid.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../Redux/slice/loginSlice";

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
  }
`;
const RightBar = styled.div`
  position: relative;
`;

const UserImg = styled.img`
  width: 2vw;
  margin-right: 2rem;
  cursor: pointer;
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
const BtmWrap = styled.div``;
const Wrap = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 9999;
`;

const LogoutBtn = styled.span`
  margin-left: 1rem;
  cursor: pointer;
`;
function LoginHeader({ cart }) {
  console.log("로그인 후 헤더 렌더링");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((store) => store.loginState.name);

  return (
    <Wrap>
      <TopWrap>
        <Left>
          <span>즐겨찾기</span>
          <LogoutBtn
            onClick={() => {
              dispatch(reset());
              navigate("/Cats");
            }}
          >
            로그아웃
          </LogoutBtn>
        </Left>
        <Right>
          <span>{`${name} 집사 환영한다냥.`}</span>
        </Right>
      </TopWrap>
      <TopWrap>
        <Left>
          <Logo src={CatLogo} alt="logo" onClick={() => navigate("/Cats")} />
          <Input type="text" placeholder="어떤 상품을 찾냐옹?" />
        </Left>
        <Right>
          <RightBar>
            <UserImg src={User} alt="userPage" onClick={() => navigate("/Profile")} />
          </RightBar>
          <RightBar>
            <img src={Cart} alt="cartPage" style={{ width: "2.5vw" }} onClick={() => navigate("ShoppingBasket")} />
            {cart.length >= 1 && <span>{cart.length}</span>}
          </RightBar>
        </Right>
      </TopWrap>
    </Wrap>
  );
}

export default LoginHeader;
