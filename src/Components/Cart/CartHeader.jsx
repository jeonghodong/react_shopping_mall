import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import db from "../../firebase";

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
function CartHeader({ cart, setCart, users, setUsers }) {
  const userId = useSelector((store) => store.loginState.userId);

  const deleteCart = async (id) => {
    // Find the collection to delete by creating a query to filter documents by userId
    const q = query(collection(db.db, "users"), where("userId", "==", userId));
    // Get all the documents that match the query
    const querySnapshot = await getDocs(q);
    // Delete all the documents using a batch operation
    const batch = writeBatch(db.db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    AllDeleteClick();
  };
  const AllDeleteClick = () => {
    setUsers([]);
  };

  return (
    <Wrap>
      <div>
        <Title>장바구니</Title>
      </div>
      <div>
        <AllDelBtn onClick={() => deleteCart(userId)}>전체삭제</AllDelBtn>
      </div>
    </Wrap>
  );
}

export default CartHeader;
