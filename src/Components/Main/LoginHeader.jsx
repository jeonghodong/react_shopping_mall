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
  width: 700px;
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
`;

const LogoutBtn = styled.span`
  margin-left: 1rem;
  cursor: pointer;
`;
function LoginHeader() {
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
          <span>{`${name}님 환영합니다.`}</span>
        </Right>
      </TopWrap>
      <TopWrap>
        <Left>
          <Logo src={CatLogo} alt="logo" onClick={() => navigate("/Cats")} />
          <Input type="text" placeholder="어떤 상품을 찾으세요?" />
        </Left>
        <Right>
          <RightBar>
            <UserImg src={User} alt="userPage" onClick={() => navigate("/Profile")} />
          </RightBar>
          <RightBar>
            <img src={Cart} alt="cartPage" style={{ width: "2.5vw" }} onClick={() => navigate("ShoppingBasket")} />
          </RightBar>
        </Right>
      </TopWrap>
    </Wrap>
  );
}

export default LoginHeader;
