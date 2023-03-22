import styled from "styled-components";

const Wrap = styled.div`
  width: 60vw;
  border: 1px solid #dfdfdf;
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  align-items: center;
`;
const Img = styled.img`
  width: 10vw;
  border-radius: 20px;
`;
const CountBtn = styled.button`
  cursor: pointer;
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
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const CountBox = styled.div`
  border: 1px solid #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  border-radius: 5px;
`;
const Name = styled.span`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Price = styled.span`
  margin-bottom: 20px;
`;
const Delivery = styled.span`
  margin-top: 30px;
  margin-bottom: 10px;
  color: #c4c4c4;
`;
function Cart({ cart, setCart }) {
  const downCount = () => {};
  const upCount = () => {};

  return (
    <>
      {cart.map((v) => (
        <Wrap key={v.id}>
          <Img src={v.image} alt="cartImg" />
          <InfoBox>
            <Name>{v.name}</Name>
            <Price>{v.price.toLocaleString()}원</Price>
            <Delivery>택배배송 / 무료배송</Delivery>
          </InfoBox>
          <CountBox>
            <CountBtn onClick={downCount}>-</CountBtn>
            <CountNum>{v.quantity}</CountNum>
            <CountBtn onClick={upCount}>+</CountBtn>
          </CountBox>
          <div>
            <span>삭제</span>
          </div>
        </Wrap>
      ))}
    </>
  );
}
// 갯수추가시 카트 금액 변경하는 기능으로
// 장바구니 개별 삭제 기능
// 새로고침해도 장바구니에 담아놓은 이력 안사라지게 하는 방법
// footer 섹션 만들기

export default Cart;
