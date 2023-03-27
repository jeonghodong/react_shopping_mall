import Cart from "../Components/Cart/Cart";
import CartHeader from "../Components/Cart/CartHeader";
import CartPayment from "../Components/Cart/CartPayment";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;
const NoneBox = styled.div`
  font-size: 5vw;
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ShoppingBasket({ cart, setCart }) {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db.db, "users");
  const userId = useSelector((store) => store.loginState.userId);

  // 해당 uid를 가진 사람의 장바구니 데이터만 들고옵니다.
  useEffect(() => {
    // prepare to receive data asynchronously
    const getUsers = async () => {
      // Get the data into the collection with getDocs
      const data = await getDocs(usersCollectionRef);
      // Filter the data to get only the data with the same userId
      const filteredData = data.docs.filter((doc) => doc.data().userId === userId);
      // Add the filtered data to users. Overwriting an id on an object
      const newData = filteredData.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(newData);
    };

    getUsers();
  }, []);
  console.log(users);

  return (
    <Wrap>
      <CartHeader cart={cart} setCart={setCart} users={users} setUsers={setUsers} />
      {users.length ? (
        <Cart cart={cart} setCart={setCart} users={users} setUsers={setUsers} />
      ) : (
        <NoneBox>
          <span>왜 아무것도 없냥?</span>
        </NoneBox>
      )}
      <CartPayment users={users} cart={cart} />
    </Wrap>
  );
}

export default ShoppingBasket;
