import axios from "axios";
import { HOST_NAME } from "../utils/constant";
import { getItemFigmaClientStorage } from "../utils/storage";

export const getAllComponents = (filters?: any) => {
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
      url: `${HOST_NAME}/component?search=${
        filters?.searchBy || ""
      }&page=${pageNumber}&pageSize=${pageSize}&category=${categoriesJSON}&collection=${collectionsJSON}&license=${licensesJSON}&sortBy=${
        filters?.sortBy || ""
      }`,
      headers: {
        Authorization: `Bearer ${getItemFigmaClientStorage("jsToken")}`,
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

export const getFigmaSouceCodeById = (objectId: string) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${HOST_NAME}/figma-source/${objectId}`,
      headers: {
        Authorization: `Bearer ${getItemFigmaClientStorage("jsToken")}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MjZkYjY4OTM5OGYzNzAwNDA5MTIyZCIsImlkIjoiNjgyNmRiNjg5Mzk4ZjM3MDA0MDkxMjJkIn0sImlhdCI6MTc1MDkyNzgwNiwiZXhwIjoxNzU4NzAzODA2fQ.B_EQ84wAXcBew8okpxsYiWVCsRyh1G4ALG3DisrmVbA`,
      },
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