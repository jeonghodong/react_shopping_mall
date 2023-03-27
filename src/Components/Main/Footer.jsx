import React from "react";
import styled from "styled-components";
const Container = styled.div`
  flex: 1;
`;
const Wrap = styled.div`
  width: 100vw;
  height: 25vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5rem;
  & div:nth-child(1) {
    display: flex;
    margin-bottom: 2rem;
    & span {
      cursor: pointer;
      margin-right: 1rem;
      font-size: 0.8vw;
    }
  }
  & div:nth-child(2) {
    & span {
      font-size: 0.9vw;
      margin-right: 1rem;
      & span {
        margin-left: 0.5rem;
        color: gray;
      }
    }
  }
  & div:nth-child(3) {
    margin-top: 0.5rem;
    & span {
      font-size: 0.9vw;
      margin-right: 1rem;
      & span {
        margin-left: 0.5rem;
        color: gray;
      }
    }
  }
  & div:nth-child(4) {
    margin-top: 1rem;
    & span {
      font-size: 0.9vw;
      margin-right: 1rem;
      color: gray;
      & span {
        margin-left: 0.5rem;
        color: gray;
      }
    }
  }
`;
const FFooter = styled.div`
  background-color: #dadada;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: gray;
    font-size: 0.8vw;
  }
`;
const Top = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(195, 48, 115, 1) 0%, rgba(0, 168, 255, 1) 100%);
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: white;
    font-size: 1.2vw;
    font-weight: 500;
    line-height: 30px;
    & span {
      font-size: 1.4vw;
      font-weight: bold;
    }
  }
`;
const TopLine = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 1px;
  height: 60px;
  margin: 0rem 2rem 0rem 2rem;
`;

function Footer() {
  return (
    <Container>
      <Top>
        <span>
          냥냥이와 집사님을 위한 공간 <br />
          <span>CAT MALL과 함께!</span>
        </span>
        <TopLine></TopLine>
        <span>
          오전 12시 이전 주문 시<br />
          <span>오늘 배송합니다.</span>
        </span>
        <TopLine></TopLine>
        <span>
          전 상품 무료 배송
          <br />
          <span>세상에 공짜는 있다.</span>
        </span>
        <TopLine></TopLine>
        <span>
          신선한 사료 & 간식
          <br />
          <span>유통기한 책임제</span>
        </span>
      </Top>
      <Wrap>
        <div>
          <span>회사소개</span>
          <span>개인정보처리방침</span>
          <span>제휴 입점 및 문의</span>
          <span>사업자 정보</span>
        </div>
        <div>
          <span>
            대표자<span>정호동</span>
          </span>
          <span>
            사업자등록번호<span>123-12-12345</span>
          </span>
          <span>
            주소<span>부산광역시 동래구 온천동</span>
          </span>
        </div>
        <div>
          <span>
            대통신판매업<span>제 2023-부산동래-12345호</span>
          </span>
          <span>
            개인정보보호책임자<span>정주원</span>
          </span>
          <span>
            팩스<span>051-123-1234</span>
          </span>
        </div>
        <div>
          <span>
            Tel. <span>1588-1234</span>
          </span>
          <span>
            Email. <span>jeonghodong@naver.com</span>
          </span>
        </div>
      </Wrap>
      <FFooter>
        <span>
          기업은행 채무지급보증 안내 당사는 고객님이 현금 결제한 금액에 대해 기업은행과 채무지급보증 계약을 체결하여
          안전거래를 보장하고 있습니다
        </span>
      </FFooter>
    </Container>
  );
}

export default Footer;
