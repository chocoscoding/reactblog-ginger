import React, { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Editor from "../components/Editor";
const Create = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    setSelectedFile(file);
  };
  const createNewPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", selectedFile || "");
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("http://localhost:4000/posts", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      navigate("/");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <Input
        Heading="Title"
        name="title"
        value={title}
        setValue={setTitle}
      />
      <Input
        Heading="Summary"
        name="summary"
        value={summary}
        setValue={setSummary}
      />
      <label
        htmlFor="picture"
        className="block text-sm font-semibold text-heading">
        Picture
      </label>
      <input
        accept="image/*"
        multiple={false}
        required
        id="picture"
        name="picture"
        type="file"
        placeholder="Your post picture"
        className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
        onChange={handleFileChange}
      />
      <br />
      <Editor
        value={content}
        setValue={setContent}
      />
      <br />
      <button
        disabled={loading}
        type="submit"
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary px-4 py-2.5 text-sm font-semibold text-white bg-primary shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80 w-full text-center">
        PUBLISH
      </button>
    </form>
  );
};

export default Create;
