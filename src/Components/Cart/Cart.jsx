import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import db from "../../firebase";
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
function Cart({ cart, setCart, users, setUsers }) {
  const downCount = async (id) => {
    const userRef = doc(db.db, "users", id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().quantity > 1) {
      const newQuantity = userDoc.data().quantity - 1;
      const updatedData = { quantity: newQuantity };
      await updateDoc(userRef, updatedData);
      const updatedCart = users.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setCart(updatedCart);
      setUsers(updatedCart);
    }
  };

  const upCount = async (id) => {
    const userRef = doc(db.db, "users", id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const newQuantity = userDoc.data().quantity + 1;
      const updatedData = { quantity: newQuantity };
      await updateDoc(userRef, updatedData);
      const updatedCart = users.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
      setCart(updatedCart);
      setUsers(updatedCart);
    }
  };

  const deleteCart = async (id) => {
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(db.db, "users", id);
    // deleteDoc을 이용해서 삭제
    await deleteDoc(userDoc);

    deleteCart2(id);
  };

  const deleteCart2 = (id) => {
    const handleCart = users.filter((v) => v.id !== id);
    setUsers(handleCart);
  };

  return (
    <>
      {users.map((v) => (
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
            <DeleteBtn
              onClick={() => {
                deleteCart(v.id);
              }}
            >
              삭제
            </DeleteBtn>
          </div>
        </Wrap>
      ))}
    </>
  );
}

// firebase이용하여 사용자가 장바구니 담았을때 firebase에 저장하게 하여서 로그아웃 후 새로고침 후에도 장바구니가 유지되도록하기
// footer 섹션 만들기

// 뚜식이 상품 하나 만들어놓기

export default Cart;
