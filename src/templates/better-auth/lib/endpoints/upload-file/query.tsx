import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadFile } from "./action";

export function useUploadFileQuery() {
  return useMutation({
    mutationFn: async (file: File) => {
      console.log(file);
      const { data, status } = await uploadFile(file);

      console.log({ data });

      if (status !== 200) {
        throw new Error(data);
      }

      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
}
