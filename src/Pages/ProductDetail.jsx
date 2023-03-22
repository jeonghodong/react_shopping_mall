import React from "react";
import Product from "../Components/Detail/Product";

function ProductDetail({ setCart, cart }) {
  return (
    <>
      <Product setCart={setCart} cart={cart} />
    </>
  );
}

export default ProductDetail;
