import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addPost, postAdded } from "../app/PostSlice";
import { useNavigate } from "react-router-dom";
const PostForm = () => {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (titleInput && contentInput) {
      try {
        dispatch(
          addPost({
            title: titleInput,
            body: contentInput,
            userId: nanoid(),
          })
        ).unwrap();
          navigate('/')
      } catch (err) {
        console.log(err.message);
      }

      setTitleInput("");
      setContentInput("");
    }
  };
  return (
    <section className="">
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={onSubmitHandle}
      >
        <input
          type={"text"}
          name="titleInput"
          onChange={(e) => {
            setTitleInput(e.target.value);
          }}
          value={titleInput}
          placeholder="Enter Title"
          className="max-h-5 border border-indigo-600 my-1 outline-0 px-3 py-4"
        />
        <textarea
          placeholder="Enter Summary"
          name="contentInput"
          onChange={(e) => {
            setContentInput(e.target.value);
          }}
          value={contentInput}
          className=" border border-indigo-600 my-1 outline-0 px-3 py-4"
        />
        <button
          type="submit"
          className="h-8 border border-indigo-600 my-1 px-5  text-xs text-center"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default PostForm;
