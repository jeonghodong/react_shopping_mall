import React from "react";
import Slide from "../Components/Main/Slide";
import styled from "styled-components";
import B1 from "../assets/B1.png";
import B2 from "../assets/B2.png";
import B3 from "../assets/B3.png";
import B4 from "../assets/B4.png";
import B5 from "../assets/B5.png";
import B6 from "../assets/B6.png";
import B7 from "../assets/B7.png";
const Img = styled.img`
  width: 100vw;
  height: 500px;
`;
function Cats() {
  const slides = [
    <Img src={B1} alt="Slide 1" />,
    <Img src={B2} alt="Slide 2" />,
    <Img src={B3} alt="Slide 3" />,
    <Img src={B4} alt="Slide 4" />,
    <Img src={B5} alt="Slide 5" />,
    <Img src={B6} alt="Slide 6" />,
    <Img src={B7} alt="Slide 7" />,
  ];
  return (
    <div>
      <Slide slides={slides} />
    </div>
  );
}

export default Cats;
