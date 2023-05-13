import axios from "axios";
import { API_URL } from "../config/config";

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
