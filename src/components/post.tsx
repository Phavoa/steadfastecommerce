import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "@/slices/posts/postApiSlice";
import React, { useEffect } from "react";

const Post = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery({ limit: 5, offset: 0 });

  const [
    createPostMutation,
    { isLoading: isCreatingPost, isError: isPostError },
  ] = useCreatePostMutation({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError}</div>;
  if (isPostError) return <div>Post Error </div>;
  return (
    <div className="container px-12 flex flex-col gap-10 mb-10">
      <button onClick={() => createPostMutation({ title: "Hello world" })}>
        {isCreatingPost ? "Creating Post" : "Create Post"}
      </button>
      {posts.length > 0 ? (
        posts?.map((post, index: number) => (
          <div key={post.userId}>
            {index + 1}: {post.title}
          </div>
        ))
      ) : (
        <p>No post available</p>
      )}
    </div>
  );
};

export default Post;
