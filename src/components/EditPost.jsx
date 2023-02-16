import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../app/PostSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const singlePost = useSelector((store) => store.post.posts).find((elem) => {
    if (elem.id == id) {
      return elem;
    }
  });

 
  const [titleInput, setTitleInput] = useState(singlePost?.title || "");
  const [contentInput, setContentInput] = useState(singlePost?.body || "");
  const dispatch = useDispatch();

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if (titleInput && contentInput) {
      try {
        dispatch(
          updatePost({
            title: titleInput,
            body: contentInput,
            userId: nanoid(),
            id: singlePost?.id || nanoid(),
          })
        ).unwrap();
        navigate('/')

      } catch (err) {
        console.log(err.message);
      }
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

export default EditForm;
