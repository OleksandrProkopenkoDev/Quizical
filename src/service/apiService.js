import axios from "axios";
import { API_URL } from "../config/config";
import { Buffer } from "buffer";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// const getAuthConfig = (user) => ({
//   headers: {
//     Authorization: `Basic ${encodeToBase64(user)}`,
//   },
// });

// const encodeToBase64 = (user) => {
//   const str = user.username + ":" + user.password;

//   return Buffer.from(str).toString("base64");
// };

export const getQuestions = async (numberOfQuestions, difficulty, category) => {
  try {
    return await axios.get(
      `${API_URL}/api/v1/questions?amount=${numberOfQuestions}`
    );
  } catch (e) {
    throw e;
  }
};

export const getRatingData = async (user) => {
  try {
    return await axios.get(
      `${API_URL}/api/v1/ratingtable`,
      getAuthConfig(user)
    );
  } catch (e) {
    throw e;
  }
};

export const getUserStatistics = async (user) => {
  try {
    return await axios.get(
      `${API_URL}/api/v1/results/${user.userId}`,
      getAuthConfig(user)
    );
  } catch (e) {
    throw e;
  }
};

export const registerNewUser = async (user) => {
  try {
    return await axios.post(`${API_URL}/api/v1/registration`, user);
  } catch (e) {
    console.log("error during registration");
    throw e;
  }
};

export const saveQuizzResult = async (result, user) => {
  try {
    return await axios.post(
      `${API_URL}/api/v1/results`,
      result,
      getAuthConfig(user)
    );
  } catch (e) {
    throw e;
  }
};

export const authenticateUser = async (user) => {
  try {
    // return await axios.post(`${API_URL}/api/v1/auth`, user);
    return await axios.post(`${API_URL}/login`, user);
  } catch (e) {
    throw e;
  }
};
