import { HOST_NAME } from "../utils/constant";
import axios from "axios";
// import Cookies from "js-cookie";

type LoginData = {
  username: string;
  password: string;
};
type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
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

export const registerUser = async (data: RegisterData) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};