/* eslint-disable react/prop-types */
import CreatePost from "./CreatePost";

const Header = ({ fetchPosts }) => {
  return (
    <div className="sticky-top">
      <nav className="navbar bg-primary text-white navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            Blog
          </a>
          <div className="collapse navbar-collapse d-inline-block" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <CreatePost fetchPosts={fetchPosts} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
