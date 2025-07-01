import axios from "axios";
import { HOST_NAME } from "../utils/constant";
import { getItemFigmaClientStorage } from "../utils/storage";

export const getAllPages = async(filters?: any) => {
   const token = await getItemFigmaClientStorage("jsToken")
  return new Promise((resolve, reject) => {
    const pageNumber =
      filters?.page !== "" &&
      filters?.page !== undefined &&
      filters?.page !== null
        ? filters?.page
        : "";
    const pageSize =
      filters?.pageSize !== "" &&
      filters?.pageSize !== undefined &&
      filters?.pageSize !== null
        ? filters?.pageSize
        : "";

    const categoriesArray = filters?.categories || [];
    const collectionsArray = filters?.collections || [];
    const licensesArray = filters?.licenses || [];

    const categoriesJSON =
      categoriesArray?.length !== 0
        ? `${categoriesArray?.map((element: any) => `"${element}"`).join(" ")}`
        : "";

    const collectionsJSON =
      collectionsArray?.length !== 0
        ? `${collectionsArray?.map((element: any) => `"${element}"`).join(" ")}`
        : "";

    const licensesJSON =
      licensesArray?.length !== 0
        ? `${licensesArray?.map((element: any) => `"${element}"`).join(" ")}`
        : "";

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/page?search=${
        filters?.searchBy || ""
      }&page=${pageNumber}&pageSize=${pageSize}&category=${categoriesJSON}&collection=${collectionsJSON}&license=${licensesJSON}&sortBy=${
        filters?.sortBy || ""
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response?.data?.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};