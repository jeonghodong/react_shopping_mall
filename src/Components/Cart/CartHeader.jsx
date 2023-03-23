import React from "react";
import styled from "styled-components";

const Title = styled.span`
  font-size: 2vw;
  font-weight: bold;
`;
const Wrap = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const AllDelBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: #eeeeee;
  color: gray;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 10px;
`;
function CartHeader({ cart, setCart }) {
  const AllDeleteClick = () => {
    setCart([]);
  };
  return (
    <Wrap>
      <div>
        <Title>장바구니</Title>
      </div>
      <div>
        <AllDelBtn onClick={AllDeleteClick}>전체삭제</AllDelBtn>
      </div>
    </Wrap>
  );
}

export default CartHeader;
