import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import cash from "../../assets/sack-dollar-solid.svg";
import leaf from "../../assets/leaf-solid.svg";
import truck from "../../assets/truck-solid.svg";
const Wrap = styled.div`
  padding: 0rem 10rem 0rem 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const LeftBox = styled.div``;
const RightBox = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  width: 45vw;
  height: 75vh;
  border-radius: 10px;
`;

const Name = styled.span`
  font-size: 1.777vw;
  font-weight: 500;
  margin-bottom: 20px;
`;
const SmallName = styled.span`
  font-size: 1vw;
`;
const Price = styled.span`
  font-size: 2vw;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Delivery = styled.span`
  font-size: 0.8vw;
  background-color: rgb(198, 145, 240);
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 0.5rem;
  text-align: center;
  color: white;
`;

const OrderBox = styled.div`
  padding: 1rem 2rem 1rem 2rem;
  background-color: #efefef;
  border: none;
  margin-bottom: 2rem;
  border-radius: 10px;
`;
const OrderInBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const CountBtn = styled.button`
  border: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background-color: white;
  font-size: 1vw;
`;
const CountNum = styled.span`
  padding: 0.5rem 0.5rem;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const CartBtn = styled.button`
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 20px;
  padding: 1rem 2.5rem 1rem 2.5rem;
  background-color: rgb(166, 70, 244);
  font-size: 1vw;
`;

const DeliveryBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0px 20px 0px;
`;
const DeliveryText = styled.span`
  font-size: 0.7vw;
`;
function Product({ cart, setCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  // 물건의 아이디값과 동일한 값을 가진 데이터만 가져옴
  useEffect(() => {
    axios.get("/data/products.json").then((res) => {
      setProduct(res.data.products.find((v) => v.id === Number(id)));
    });
  }, []);

  // 날짜 및 시간
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];

  // 장바구니에 물건담기
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      quantity: count,
      price: product.price,
    };
    setCart([...cart, cartItem]);
    alert("장바구니에 담았다냥");
  };
  console.log(cart);

  // 총 가격
  const totalPrice = product.price?.toLocaleString() && count * product.price;

  // 갯수 업 다운
  const downCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const upCount = () => {
    setCount(count + 1);
  };

  return (
    <Wrap>
      <LeftBox>
        <Img src={product.image} alt="img" />
      </LeftBox>
      <RightBox>
        <Name>{product.name}</Name>
        <Price>{product.price?.toLocaleString()}원</Price>
        <div style={{ display: "flex", marginBottom: "20px", alignItems: "center" }}>
          <img
            style={{
              width: "1.5vw",
              marginLeft: ".5rem",
              marginRight: ".5rem",
              filter: "invert(47%) sepia(97%) saturate(675%) hue-rotate(356deg) brightness(97%) contrast(97%)",
            }}
            src={cash}
            alt="Cimg"
          />
          <span style={{ fontSize: ".8vw" }}>
            최대{" "}
            <span style={{ fontSize: "1vw", fontWeight: "bold" }}>{product.price * (0.02).toLocaleString()}원</span>{" "}
            캐시 적립
          </span>
        </div>
        {product.food && (
          <>
            <Line>{""}</Line>
            <div style={{ display: "flex" }}>
              <div>
                <img
                  style={{
                    width: "1.5vw",
                    marginLeft: ".5rem",
                    marginRight: ".5rem",
                    filter: "invert(61%) sepia(53%) saturate(3504%) hue-rotate(60deg) brightness(95%) contrast(101%)",
                  }}
                  src={leaf}
                  alt="Cimg"
                />
              </div>
              <div style={{ width: "15vw", lineHeight: "23px" }}>
                <span style={{ fontSize: ".9vw" }}>
                  본 상품은 <span style={{ fontWeight: "bold", fontSize: ".95vw" }}>유통기한 책임제</span> 상품이며,
                  <br /> 저희 측에서 100% 정품임을 보증합니다.
                  <br /> 안심하시고 급여하세요!
                </span>
              </div>
            </div>
            <Line style={{ marginTop: "20px" }}>{""}</Line>
          </>
        )}
        <Line>{""}</Line>
        <div style={{ display: "flex", marginBottom: "20px", alignItems: "center" }}>
          <img
            style={{
              width: "1.5vw",
              marginLeft: ".5rem",
              marginRight: ".5rem",
              filter: "invert(13%) sepia(83%) saturate(5258%) hue-rotate(270deg) brightness(105%) contrast(116%)",
            }}
            src={truck}
            alt="Cimg"
          />
          <span style={{ fontSize: ".9vw", fontWeight: "400" }}>{`오늘 주문 시 ${
            today.getMonth() + 1
          }월 ${today.getDate()}일 (${week[today.getDay()]}) 출발`}</span>
        </div>
        <DeliveryBox>
          <Delivery>{product.delivery}</Delivery>
          <DeliveryText>(30,000원 이상 구매 시)</DeliveryText>
        </DeliveryBox>
        <Line>{""}</Line>
        <OrderBox>
          <SmallName>{product.name}</SmallName>
          <OrderInBox>
            <div>
              <CountBtn onClick={downCount}>-</CountBtn>
              <CountNum>{count}</CountNum>
              <CountBtn onClick={upCount}>+</CountBtn>
            </div>
            <div>
              <span>{totalPrice?.toLocaleString()}원</span>
            </div>
          </OrderInBox>
        </OrderBox>
        <CartBtn onClick={() => handleCart()}>장바구니 담기</CartBtn>
      </RightBox>
    </Wrap>
  );
}

export default Product;
