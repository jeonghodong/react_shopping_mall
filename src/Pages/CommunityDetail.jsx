import React from "react";
import PostDetail from "../Components/Community/PostDetail";

function CommunityDetail({ posts, setPosts, setUpdateCount }) {
  return (
    <>
      <PostDetail setUpdateCount={setUpdateCount} posts={posts} setPosts={setPosts} />
    </>
  );
}

export default CommunityDetail;
