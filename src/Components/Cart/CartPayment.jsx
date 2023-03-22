import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  border: none;
  background-color: #e5e5e5;
  border-radius: 20px;
  padding: 2rem;
  width: 60vw;
  justify-content: space-around;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Icon = styled.span`
  font-size: 1.5vw;
  color: gray;
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 1.3vw;
  margin-bottom: 1rem;
`;

const TotalText = styled.span`
  font-size: 1.3vw;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const TotalPrice = styled.span`
  font-size: 1.5vw;
  color: red;
  font-weight: bold;
`;
const Payment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2vw;
  width: 60vw;
  height: 10vh;
  cursor: pointer;
  border: none;
  background-color: red;
  border-radius: 20px;
  margin-top: 20px;
`;
function CartPayment({ cart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  return (
    <>
      <Wrap>
        <Div>
          <Text>총 상품 금액</Text>
          <span>{totalPrice.toLocaleString()}원</span>
        </Div>
        <Div style={{ justifyContent: "center" }}>
          <Icon>-</Icon>
        </Div>
        <Div>
          <Text>상품 할인</Text>
          <span>0원</span>
        </Div>
        <Div style={{ justifyContent: "center" }}>
          <Icon>+</Icon>
        </Div>
        <Div>
          <Text>배송비</Text>
          <span>0원</span>
        </Div>
        <Div>
          <TotalText>결제 예정 금액</TotalText>
          <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
        </Div>
      </Wrap>
      <Payment>구매하기</Payment>
    </>
  );
}

export default CartPayment;
