import axios from "axios";
import { HOST_NAME } from "../utils/constant";
import { getItemFigmaClientStorage } from "../utils/storage";

export const getAllConstantValues = (filters?: any) => {
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
        Authorization: `Bearer ${getItemFigmaClientStorage("jsToken")}`,
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
