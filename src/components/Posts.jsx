import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import { Pagination } from "antd";
import Header from "./Header";

const BASE_URL = import.meta.env.VITE_URL_API;

const Posts = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState({ total: 0, data: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/articles`, {
        params: {
          page,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        setPosts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPosts, [page]);

  return (
    <>
      <Header fetchPosts={fetchPosts} />
      <div className="row align-items-start">
        <div className="col-12 order-last order-md-first ">
          <div className="mt-4">
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : (
              <div>
                {posts.data.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
                <div className="py-4 d-flex justify-content-center">
                  <Pagination
                    current={page}
                    total={posts.total}
                    showTotal={(total) => total + " posts"}
                    onChange={(page) => setPage(page)}
                    pageSize={10}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
