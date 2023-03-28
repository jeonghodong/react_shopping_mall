import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;

  span:first-child {
    width: 55%;
    text-align: center;
  }

  span:not(:first-child) {
    width: 15%;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 4rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
`;
function Posts({ posts }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {currentPosts.map((v) => (
        <div key={v.id}>
          <Wrap>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/CommunityDetail/${v.bid}`);
              }}
            >
              {v.title}
            </span>
            <span>{v.name}</span>
            <span>{v.date}</span>
            <span>{v.view}</span>
          </Wrap>
          <Line>{""}</Line>
        </div>
      ))}
      {totalPages > 1 && (
        <ButtonContainer>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => handlePageClick(index + 1)} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          ))}
        </ButtonContainer>
      )}
    </>
  );
}

export default Posts;
