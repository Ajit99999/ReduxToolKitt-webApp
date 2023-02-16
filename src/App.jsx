import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Cart from "./components/Cart";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import NavBar from "./navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import EditForm from "./components/EditPost";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./app/PostSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <NavBar />
      <div className="App flex flex-col justify-center items-center">
        <Routes>
          <Route path="/addpost" element={<PostForm />} />
          <Route path="/" element={<PostList />} />
          <Route path="/edit/:id" element={<EditForm />} />
          <Route path="*" element={<PostList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
