/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_URL_API;

const CreatePost = ({ fetchPosts }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = { query };

    setIsLoading(true);
    axios
      .post(`${BASE_URL}/articles`, data)
      .then((resp) => resp.data)
      .then(() => {
        setQuery("");
        fetchPosts();
        toast.success("Post created!");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
          return;
        }

        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={onSubmit} className="d-flex gap-2">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="write a topic"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="btn btn-secondary mb-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <div
            className="spinner-border text-light spinner-border-sm me-2"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        ) : null}
        Create post
      </button>
      <ToastContainer />
    </form>
  );
};
export default CreatePost;
