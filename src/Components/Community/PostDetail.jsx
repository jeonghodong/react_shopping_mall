import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail({ posts, setPosts }) {
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setDetail(posts.find((v) => v.bid === Number(id)));
  }, []);

  console.log(detail);
  return (
    <>
      <div>
        <span>{detail.title}</span>
        <span>{detail.name}</span>
        <span>{detail.text}</span>
        <span>{detail.text}</span>
      </div>
    </>
  );
}

export default PostDetail;
