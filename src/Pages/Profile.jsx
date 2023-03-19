import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const userId = useSelector((store) => store.loginState.userId);
  const name = useSelector((store) => store.loginState.name);
  const email = useSelector((store) => store.loginState.email);
  const isLogin = useSelector((store) => store.loginState.isLogin);
  return (
    <>
      <span>{`${name} ${userId} ${email} ${isLogin}`}</span>
    </>
  );
}

export default Profile;
