import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2vw;
  font-weight: 500;
`;

function ProfileHeader() {
  return (
    <Wrap>
      <h2>마이페이지</h2>
    </Wrap>
  );
}

export default ProfileHeader;
