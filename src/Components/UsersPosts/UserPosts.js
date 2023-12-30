import React, { useState } from "react";
import "./UserPosts.css";
import { useSelector } from "react-redux";
import PostDetailsModel from "../PostDetailsModel/PostDetailsModel";

const UserPosts = () => {
  const selectedUserPost = useSelector((state) => state.posts.posts);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const openModal = (post) => {
    console.log("in");
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        {selectedUserPost ? (
          <div className="user-postCards">
            {selectedUserPost.map((post) => (
              <div
                className="post-card"
                key={post.id}
                onClick={() => openModal(post)}
              >
                <div className="post-title">
                  <p>{post.title}</p>
                </div>
                <div className="post-description">
                  <p>{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Render a loading state or alternative content if selectedUserPost is not available
          <p>Loading...</p>
        )}
      </div>
      <PostDetailsModel
        showModal={showModal}
        closeModal={closeModal}
        post={selectedPost}
      />
    </>
  );
};

export default UserPosts;
