import axios from "axios";
import { API_URL } from "../config/config";
import { useState } from "react";

export const getQuestions = async (numberOfQuestions, difficulty, category) => {
  try {
    return await axios.get(
      `${API_URL}/api/v1/questions?amount=${numberOfQuestions}`
    );
  } catch (e) {
    throw e;
  }
};

export const getRatingData = async () => {
  try {
    return await axios.get(`${API_URL}/api/v1/ratingtable`);
  } catch (e) {
    throw e;
  }
};

export const getUserStatistics = async (userId) => {
  try {
    return await axios.get(`${API_URL}/api/v1/results/${userId}`);
  } catch (e) {
    throw e;
  }
};

export const registerNewUser = async (user) => {
  try {
    return await axios.post(`${API_URL}/api/v1/registration`, user);
  } catch (e) {
    throw e;
  }
};

export const saveQuizzResult = async (result) => {
  try {
    return await axios.post(`${API_URL}/api/v1/results`, result);
  } catch (e) {
    throw e;
  }
};

export const authenticateUser = async (user) => {
  try {
    return await axios.post(`${API_URL}/api/v1/auth`, user);
  } catch (e) {
    // console.log("error");
    throw e;
  }
};
