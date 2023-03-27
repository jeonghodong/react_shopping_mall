import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrap = styled.div`
  height: 100vh;
`;

function Profile() {
  const userId = useSelector((store) => store.loginState.userId);
  const name = useSelector((store) => store.loginState.name);
  const email = useSelector((store) => store.loginState.email);
  const isLogin = useSelector((store) => store.loginState.isLogin);
  return (
    <Wrap>
      <span>{`${name} ${userId} ${email} ${isLogin}`}</span>
    </Wrap>
  );
}

export default Profile;
