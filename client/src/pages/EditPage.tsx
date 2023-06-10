import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Usercontext";
import Input from "../components/Input";
import Editor from "../components/Editor";
const EditPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingApi, setLoadingApi] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [postfound, setPostFound] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { userinfo, loading: userLoading } = useUser();

  //fetch post info
  useEffect(() => {
    const apiCaller = async () => {
      try {
        const postInfo = await fetch(`http://localhost:4000/posts/${id}`);
        const response = await postInfo.json();
        const { title, author, summary, cover, content } = response;
        if (postInfo.ok && response !== null) {
          setPostFound(true);
          setTitle(title);
          setSummary(summary);
          setSelectedFile(cover);
          setContent(content);
          setLoading(false);
          return;
        }
        setPostFound(false);
        setLoading(false);
      } catch (error) {
        setPostFound(false);
        setLoading(false);
        console.log(error);
      }
    };
    const timer = setTimeout(apiCaller, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const updatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("id", id!);
    data.set("content", content);
    if (selectedFile) {
      data.set("file", selectedFile);
    }
    setLoadingApi(true);
    try {
      const apiCall = await fetch("http://localhost:4000/posts/edit", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      const response = await apiCall.json();
      if (apiCall.ok) {
        navigate(`/post/${id}`);
        setLoadingApi(false);
      }
      throw new Error(response);
    } catch (error: any) {
      setLoadingApi(false);
      console.log(error.message);
    }
  };

  if (loading || userLoading) return <div>Loading...</div>;
  if (postfound !== true) return <div>Post not found</div>;
  return (
    <form onSubmit={updatePost}>
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
        required={!selectedFile}
        id="picture"
        name="picture"
        type="file"
        placeholder={`Your post picture`}
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
        disabled={loadingApi}
        type="submit"
        className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-primary px-4 py-2.5 text-sm font-semibold text-white bg-primary shadow-sm hover:border-primary-accent hover:bg-primary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-primary disabled:hover:bg-primary disabled:hover:text-white dark:focus:ring-white/80 w-full text-center">
        PUBLISH
      </button>
    </form>
  );
};

export default EditPage;
