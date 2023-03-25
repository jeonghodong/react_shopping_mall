import PostHeader from "../Components/Community/PostHeader";
import Posts from "../Components/Community/Posts";

function Community({ modal, setModal, posts, setPosts }) {
  return (
    <>
      <PostHeader posts={posts} setPosts={setPosts} modal={modal} setModal={setModal} />
      <Posts modal={modal} setModal={setModal} posts={posts} />
    </>
  );
}

export default Community;
