import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  & img {
    border-radius: 10px;
    width: 20vw;
    margin-bottom: 10px;
  }
`;
const Name = styled.span`
  font-size: 0.9vw;
  font-weight: initial;
  margin-bottom: 10px;
`;
const Price = styled.span`
  font-size: 1vw;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Delivery = styled.span`
  font-size: 0.8vw;
  display: inline;
  padding: 5px 5px 5px 5px;
  background-color: #eeeeee;
  border-radius: 5px;
  color: gray;
  width: 4vw;
  text-align: center;
`;
function Products({ v }) {
  const navigate = useNavigate();
  return (
    <Wrap onClick={() => navigate(`/product/${v.id}`)}>
      <img src={v.image} alt="img" />
      <Name>{v.name}</Name>
      <Price>{v.price.toLocaleString()}원</Price>
      <Delivery>{v.delivery}</Delivery>
    </Wrap>
  );
}

export default Products;
