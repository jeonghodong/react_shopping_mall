import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Main/Footer";
import Header from "../Components/Main/Header";
import LoginHeader from "../Components/Main/LoginHeader";

function Home({ cart }) {
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => store.loginState.userId);
  const name = useSelector((store) => store.loginState.name);
  const email = useSelector((store) => store.loginState.email);
  const isLogin = useSelector((store) => store.loginState.isLogin);
  console.log(userId, name, email, isLogin);
  return (
    <>
      {isLogin ? <LoginHeader cart={cart} /> : <Header cart={cart} />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
