import React from "react";
import axios from "axios";

export const UsersData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    console.log("error getting user.");
    return {
      error: true,
      message: "Failed to fetch user. Please try again later.",
    };
  }
};

export const PostsData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    console.log("error getting posts.");
    return {
      error: true,
      message: "Failed to fetch posts. Please try again later.",
    };
  }
};
