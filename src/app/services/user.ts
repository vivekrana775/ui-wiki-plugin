import axios from "axios";
import { HOST_NAME } from "../utils/constant";
import { getItemFigmaClientStorage } from "../utils/storage";

export const getUserById = async (id: string) => {
   const token = await getItemFigmaClientStorage("jsToken")
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.request(config);
    return res?.data;
  } catch (error) {
    return error;
  }
};