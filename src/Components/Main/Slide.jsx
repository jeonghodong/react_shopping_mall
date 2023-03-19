import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SlideWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

const SlideContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
`;

const SlideItem = styled.div`
  flex: 0 0 100%;
  transition-delay: ${(props) => props.index * 0.1}s;
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

const Slide = ({ slides }) => {
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
          <SlideItem key={slide} index={index}>
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
          <IndicatorItem key={slide} active={currentIndex === index} onClick={() => onIndicatorClick(index)}>
            &bull;
          </IndicatorItem>
        ))}
      </Indicator>
    </SlideWrapper>
  );
};

export default Slide;
