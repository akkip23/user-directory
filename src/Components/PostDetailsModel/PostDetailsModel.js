import React, { useEffect } from "react";
import "./PostDetailsModel.css";

// PostDetailsModel component
const PostDetailsModel = ({ showModal, closeModal, post }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, closeModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetailsModel;
