import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get("/data/products.json").then((res) => {
      setProduct(res.data.products.find((v) => v.id === Number(id)));
    });
  }, []);
  return (
    <>
      <img src={product.image} alt="img" />
    </>
  );
}

export default Product;
