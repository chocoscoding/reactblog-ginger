import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const postData = await fetch("http://localhost:4000/posts");
      const posts = await postData.json();
      setPosts(posts);
    })();
  }, []);
  return (
    <div className="flex flex-col items-center">
      {posts.map((post, i) => (
        <Post key={`post${i}`} {...post} />
      ))}
    </div>
  );
};

export default IndexPage;
