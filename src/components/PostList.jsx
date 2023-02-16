import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../app/PostSlice";

import EmojiList from "./EmojiList";

const PostList = () => {
  const postLists = useSelector((store) => store.post.posts);
  const dispatch = useDispatch(); 
  const renderedAllPosts = postLists.map((elem, index) => {
    return (
      <div
        key={index}
        className="flex flex-col border m-5 p-5 w-1/2 items-start"
      >
        <h3 className="text-amber-600 text-left">{elem.title}</h3>
        <p className="text-left">{elem.body}</p>
        <EmojiList {...elem} />
        <div className="flex gap-5">
          <Link to={`/edit/${elem.id}`}>
            {" "}
            <button className="border  px-4 pb-1 mt-4 hover:bg-blue-300">
              Edit
            </button>{" "}
          </Link>

          <button
            className="border  px-4 pb-1 mt-4  hover:bg-blue-300"
            onClick={() => {
              dispatch(deletePost(elem.id));
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center">
      <h2>Lists of Post</h2>
      {renderedAllPosts}
    </div>
  );
};
export default PostList;
