import { formatISO9075 } from "date-fns";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

export interface PostType {
  title: string;
  content: string;
  summary: string;
  cover: string;
  createdAt: Date;
  _id: string;
  author: {
    username: string;
    _id: string;
  };
}
const Post: FC<PostType> = ({ _id, title, content, summary, cover, createdAt, author }) => {
  return (
    <div className="flex w-full flex-wrap overflow-hidden max-w-6xl mb-4">
      <Link
        className="contents"
        to={`/post/${_id}`}>
        <div className="w-[100%] sm:w-[40%] rounded-lg h-auto flex-shrink-0 mr-[1rem] lg:h-[15rem] overflow-hidden object-cover">
          <img
            src={`http://localhost:4000/${cover.replace(/\\/g, "/")}`}
            alt="title"
            className="w-full"
          />
        </div>
      </Link>

      <main className="flex-1">
        <Link
          className="contents"
          to={`/post/${_id}`}>
          <h2 className="font-bold text-3xl sm:text-4xl">{title}</h2>
        </Link>

        <p className="my-2 sm:my-2 text-gray-500">
          <Link
            className="font-bold mr-1"
            to={`/author/_id`}>
            {author.username}
          </Link>
          <span>{formatISO9075(new Date(createdAt))}</span>
        </p>
        <p className="break-words text-lg sm:text-xl sm:w-[85%] text-gray-800">{summary}</p>
      </main>
    </div>
  );
};

export default Post;
