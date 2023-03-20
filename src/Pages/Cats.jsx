import React, { useEffect } from "react";
import Slide from "../Components/Main/Slide";
import styled from "styled-components";
import axios from "axios";
import Products from "../Components/Main/Products";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
`;

function Cats({ products, setProducts }) {
  // 상품정보 axios get
  useEffect(() => {
    axios
      .get("/data/products.json")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Slide />
      <h2>핫딜</h2>
      <Wrap>
        {products.map((v) => (
          <Products v={v} key={v.id} />
        ))}
      </Wrap>
    </div>
  );
}

export default Cats;
