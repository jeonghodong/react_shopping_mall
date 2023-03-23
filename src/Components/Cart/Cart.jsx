import styled from "styled-components";

const Wrap = styled.div`
  width: 60vw;
  border: 1px solid #dfdfdf;
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
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
const DeleteBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: #eeeeee;
  color: gray;
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 10px;
`;
function Cart({ cart, setCart }) {
  const downCount = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
        item.price - item.price;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const upCount = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
        item.price + item.price;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const deleteCart = (id) => {
    const handleCart = cart.filter((v) => v.id !== id);
    setCart(handleCart);
  };
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
            <CountBtn onClick={() => downCount(v.id)}>-</CountBtn>
            <CountNum>{v.quantity}</CountNum>
            <CountBtn onClick={() => upCount(v.id)}>+</CountBtn>
          </CountBox>
          <div>
            <DeleteBtn onClick={() => deleteCart(v.id)}>삭제</DeleteBtn>
          </div>
        </Wrap>
      ))}
    </>
  );
}

// 장바구니 개별 삭제 기능
// firebase이용하여 사용자가 장바구니 담았을때 firebase에 저장하게 하여서 로그아웃 후 새로고침 후에도 장바구니가 유지되도록하기
// footer 섹션 만들기
// 뚜식이 상품 하나 만들어놓기

export default Cart;
