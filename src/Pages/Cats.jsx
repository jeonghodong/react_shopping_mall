import React, { useEffect } from "react";
import Slide from "../Components/Main/Slide";
import styled from "styled-components";
import axios from "axios";
import Products from "../Components/Main/Products";

const Wrap = styled.div`
  padding: 0rem 5rem 0rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 0rem 9rem 0rem 9rem;
  margin-bottom: 2rem;
  & h2 {
    font-size: 2vw;
    font-weight: bold;
  }
  & span {
    font-size: 0.8vw;
    cursor: pointer;
  }
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

  // 최신순, 낮은가격순, 높은가격순 스프레드문법을 이용하여 기존배열을 독립적으로 사용할 수 있게 복사하였음
  const filterClick = (part) => {
    const newProducts = [...products];
    if (part === "new") {
      newProducts.sort((a, b) => a.id - b.id);
      setProducts(newProducts);
    } else if (part === "row") {
      newProducts.sort((a, b) => a.price - b.price);
      setProducts(newProducts);
    } else if (part === "high") {
      newProducts.sort((a, b) => b.price - a.price);
      setProducts(newProducts);
    }
  };

  return (
    <div>
      <Slide />
      <Header>
        <div>
          <h2>핫딜</h2>
        </div>
        <div>
          <span onClick={() => filterClick("new")}>최신순 |</span>
          <span onClick={() => filterClick("row")}> 낮은 가격 |</span>
          <span onClick={() => filterClick("high")}> 높은 가격</span>
        </div>
      </Header>
      <Wrap>
        {products.map((v) => (
          <Products v={v} key={v.id} />
        ))}
      </Wrap>
    </div>
  );
}

export default Cats;
