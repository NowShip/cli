"use server";

import axios, { AxiosError } from "axios";

export async function uploadFile(
  file: File
): Promise<FunctionResponse<string>> {
  const options = {
    method: "POST",
    url: "https://api.uploadthing.com/v6/uploadFiles",
    headers: {
      "Content-Type": "application/json",
      "X-Uploadthing-Api-Key": process.env.UPLOADTHING_TOKEN,
    },
    data: {
      files: file,
      acl: "public-read",
      contentDisposition: "inline",
    },
  };

  try {
    const { data } = await axios.request(options);

    return {
      data: data,
      message: "File uploaded successfully",
      status: 200,
    };
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    console.log(err);

    return {
      data: "",
      message: err.response?.data.error || "Failed to upload file",
      status: err.response?.status || 500,
    };
  }
}
