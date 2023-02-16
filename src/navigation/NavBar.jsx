import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar flex justify-between items-center mt-0 mb-4">
      <ul>
        <li>Redux Blog</li>
      </ul>
      <ul className="flex items-center justify-evenly gap-4">
        <Link to={"/"}>
          {" "}
          <li className="hover:text-violet-600">All Posts</li>{" "}
        </Link>
        <Link to={"/addpost"}>
          <li className="hover:text-violet-600">New Post</li>{" "}
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
