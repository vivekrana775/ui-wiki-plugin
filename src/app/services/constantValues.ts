import axios from "axios";
import { HOST_NAME } from "../utils/constant";
import { getItemFigmaClientStorage } from "../utils/storage";

export const getAllConstantValues = async(filters?: any) => {
  const token = await getItemFigmaClientStorage("jsToken")
  return new Promise<any>((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/constant-value?search=${
        filters?.searchBy || ""
      }&page=${filters?.page || 1}&pageSize=${filters?.pageSize}&type=${
        filters?.type
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response?.data?.data);
      })
      .catch((error) => {
        console.log("error");
        reject(error);
      });
  });
};
