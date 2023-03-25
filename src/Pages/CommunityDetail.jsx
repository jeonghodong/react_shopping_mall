import React from "react";
import PostDetail from "../Components/Community/PostDetail";

function CommunityDetail({ posts, setPosts }) {
  return (
    <>
      <PostDetail posts={posts} setPosts={setPosts} />
    </>
  );
}

export default CommunityDetail;
