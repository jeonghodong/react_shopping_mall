import Cart from "../Components/Cart/Cart";
import CartHeader from "../Components/Cart/CartHeader";
import CartPayment from "../Components/Cart/CartPayment";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useEffect } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  console.log(db);
  const cartRef = collection(db.db, "Cart");
  useEffect(() => {
    getDocs(cartRef)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Wrap>
      <CartHeader cart={cart} setCart={setCart} />
      {cart.length ? (
        <Cart cart={cart} setCart={setCart} />
      ) : (
        <NoneBox>
          <span>왜 아무것도 없냥?</span>
        </NoneBox>
      )}
      <CartPayment cart={cart} />
    </Wrap>
  );
}

export default ShoppingBasket;
