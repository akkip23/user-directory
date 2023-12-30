import React, { useEffect, useState } from "react";
import "./Users.css";
import { useDispatch } from "react-redux";
import { UsersData, PostsData } from "../API/UserDataApi";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function data() {
      const userData = await UsersData();
      // console.log("userData", userData);
      setUsers(userData);
    }
    data();
  }, []);

  useEffect(() => {
    async function posts() {
      const posts = await PostsData();
      // console.log("postData", posts);
      setUserPosts(posts);
      getUserPostCount(posts);
    }
    posts();
  }, []);

  function getUserPostCount(posts) {
    const postCountByUser = {};

    posts.forEach((post) => {
      const { userId } = post;
      if (!postCountByUser[userId]) {
        postCountByUser[userId] = 1;
      } else {
        postCountByUser[userId]++;
      }
    });
    console.log("POST COUNT", postCountByUser);
    setPosts(postCountByUser);
  }

  const getUserDetails = (user) => {
    const filteredPosts = userPosts.filter((post) => post.userId === user.id);
    console.log(filteredPosts);
    dispatch({ type: "FETCH_DATA_SUCCESS", payload: user });
    dispatch({ type: "POSTS_DATA_SUCCESS", payload: filteredPosts });
    navigate(`/userDetails/${user.id}`);
  };

  return (
    <>
      <div className="users-container">
        {users.map((user) => (
          <div
            className="card"
            key={user.id}
            onClick={() => getUserDetails(user)}
          >
            <div className="img"></div>
            <div className="textBox">
              <div className="textContent">
                <p className="h1">{user.name}</p>
                <div className="posts-count">
                  <span className="span">{posts[user.id]}</span>
                  <span>Posts</span>
                </div>
              </div>
              <p className="p">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;