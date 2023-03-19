import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Cats from "./Cats";
import Header from "../Components/Main/Header";
import LoginHeader from "../Components/Main/LoginHeader";

function Home() {
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => store.loginState.userId);
  const name = useSelector((store) => store.loginState.name);
  const email = useSelector((store) => store.loginState.email);
  const isLogin = useSelector((store) => store.loginState.isLogin);
  console.log(userId, name, email, isLogin);
  return (
    <>
      {isLogin ? <LoginHeader /> : <Header />}
      <Outlet />
    </>
  );
}

export default Home;
