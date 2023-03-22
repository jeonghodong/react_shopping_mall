import React from "react";
import styled from "styled-components";

const Title = styled.span`
  font-size: 2vw;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

function CartHeader() {
  return <Title>장바구니</Title>;
}

export default CartHeader;
