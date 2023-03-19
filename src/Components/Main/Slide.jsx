import React, { useState, useEffect } from "react";
import styled from "styled-components";
import B1 from "../../assets/B1.png";
import B2 from "../../assets/B2.png";
import B3 from "../../assets/B3.png";
import B4 from "../../assets/B4.png";
import B5 from "../../assets/B5.png";
import B6 from "../../assets/B6.png";
import B7 from "../../assets/B7.png";

const Img = styled.img`
  width: 100vw;
  height: 500px;
`;

const SlideWrapper = styled.div`
  overflow: hidden;
  position: relative;
  margin-bottom: 5rem;
`;

const SlideContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
`;

const SlideItem = styled.div`
  flex: 0 0 100%;
  transition-delay: ${(props) => props.index * 0.1}s;
  overflow: hidden;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: white;
  z-index: 1;

  ${(props) => (props.direction === "prev" ? "left: 3rem;" : "right: 3rem;")}
`;

const Indicator = styled.ul`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
`;

const IndicatorItem = styled.li`
  list-style: none;
  margin-right: 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "white" : "gray")};
`;

const Slide = () => {
  const slides = [
    <Img src={B1} alt="Slide 1" />,
    <Img src={B2} alt="Slide 2" />,
    <Img src={B3} alt="Slide 3" />,
    <Img src={B4} alt="Slide 4" />,
    <Img src={B5} alt="Slide 5" />,
    <Img src={B6} alt="Slide 6" />,
    <Img src={B7} alt="Slide 7" />,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const onIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex === length - 1 ? 0 : currentIndex + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, length]);
  return (
    <SlideWrapper>
      <SlideContent style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <SlideItem key={index} index={index}>
            {slide}
          </SlideItem>
        ))}
      </SlideContent>
      <SlideButton direction="prev" onClick={prevSlide}>
        ❮
      </SlideButton>
      <SlideButton direction="next" onClick={nextSlide}>
        ❯
      </SlideButton>
      <Indicator>
        {slides.map((slide, index) => (
          <IndicatorItem key={index} active={currentIndex === index} onClick={() => onIndicatorClick(index)}>
            &bull;
          </IndicatorItem>
        ))}
      </Indicator>
    </SlideWrapper>
  );
};

export default Slide;
