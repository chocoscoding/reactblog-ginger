import React, { useEffect, useState } from "react";
import { PostType } from "../components/Post";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { useUser } from "../Usercontext";
import "react-quill/dist/quill.core.css";

const Post = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [postInfo, setPostInfo] = useState<PostType | null>(null);
  const { id } = useParams();
  const { userinfo } = useUser();
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const postInfo = await fetch(`http://localhost:4000/posts/${id}`);
        const response = await postInfo.json();
        setPostInfo(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    const timer = setTimeout(apiCaller, 150);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (postInfo === null) return <div>Post not found</div>;
  return (
    <main className="mt-4 md:mt-20">
      {/* Header section */}
      <header className="flex flex-col gap-6 sm:gap-12">
        {/* Hero image */}
        <div className="relative">
          <div className="aspect-video w-full rounded-xl object-cover max-h-[40rem] overflow-hidden">
            <img
              src={`http://localhost:4000/${postInfo.cover.replace(/\\/g, "/")}`}
              alt="hero"
              className="w-full"
            />
          </div>
          <div className="mt-6 text-center sm:absolute sm:right-6 sm:top-6 sm:mt-0">
            <span className="inline-flex items-center rounded-full border-2 border-blue-200 bg-green-200 px-2 py-1 text-sm font-semibold text-green-600 shadow-sm">
              Tech
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-5xl text-center sm:px-8">
          <h1 className="text-xl font-semibold text-heading sm:text-5xl">{postInfo.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-text sm:mt-6 sm:text-lg">{postInfo.summary}</p>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div>
              <div className="text-base font-medium text-heading">{postInfo.author.username}</div>
              <div className="text-base font-medium text-text">{formatISO9075(new Date(postInfo.createdAt))}</div>
            </div>
          </div>
          {postInfo.author._id === userinfo?.id ? (
            <Link to={`/edit/${id}`}>
              <button className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-primary-accent hover:bg-primary-accent ">
                Edit this Post
              </button>
            </Link>
          ) : null}
        </div>
      </header>

      {/* Article content */}
      <div className="ql-snow">
        <div
          className="ql-editor mx-auto mt-6 sm:mt-16"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </main>
  );
};

export default Post;
