import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import Register from "./pages/Register";
import { UserContextProvider } from "./Usercontext";
import Create from "./pages/Create";
import Author from "./pages/Author";
import Post from "./pages/Post";
import EditPage from "./pages/EditPage";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/author" element={<Author />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
