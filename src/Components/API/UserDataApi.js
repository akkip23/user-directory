import React from "react";
import axios from "axios";

export const UsersData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  } catch (error) {
    console.log("error getting user.");
  }
};

export const PostsData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return response.data;
  } catch (error) {
    console.log("error getting posts.");
  }
};
