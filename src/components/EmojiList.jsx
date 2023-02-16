import { useDispatch } from "react-redux";
import { reactionAdded } from "../app/PostSlice";

const emojiObj = {
  like: "🔏",
  love: "💟",
  smile: "😇",
};

const EmojiList = ({ id, emoji }) => {
  const dispatch = useDispatch();

  const renderdEmoji = Object.keys(emojiObj).map((name) => {
    return (
      <div key={name} className="flex flex-row gap-1 ">
        
        <button
         className="cursor-pointer"
          onClick={() => {
            
            dispatch(reactionAdded({ id: id, name: name }));
          }}
        >
          
          {emojiObj?.[name]}
        </button>
        <p>{emoji?.[name]}</p>
      </div>
    );
  });

  return <div className="flex flex-row align-centre gap-2">{renderdEmoji}</div>;
};

export default EmojiList;
