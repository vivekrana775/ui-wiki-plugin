import { HOST_NAME } from "../utils/constant";
import axios from "axios";

type LoginData = {
  username: string;
  password: string;
};

export const loginUser = async (data: LoginData) => {
  try {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};

export const loginUserByToken = async (data: any) => {
  try {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/verify-token`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};
