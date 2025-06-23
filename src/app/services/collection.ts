import axios from "axios";
// import Cookies from "js-cookie";
import { HOST_NAME } from "../utils/constant";

export const getAllCollections = (filters?: any) => {
  return new Promise<any>((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/collection?search=${filters?.searchBy || ""}&type=${
        filters?.type || ""
      }&page=${filters?.page || 1}&pageSize=${filters?.pageSize || 25}`,
      headers: {
        // Authorization: `Bearer ${Cookies.get("jstoken")}`,
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
