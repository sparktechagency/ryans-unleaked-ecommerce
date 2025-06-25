/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";

const handleMutation = async (
  data: object | string,
  mutationFunc: any,
  loadingTxt: string,
  onSuccess?: unknown,
  onFailure?: unknown
) => {
  const toastId = toast.loading(loadingTxt);

  try {
    const res = await mutationFunc(data).unwrap(); // Await the mutation

    if (res?.success) {
      toast.success(res?.message || "Operation successful", {
        id: toastId,
        duration: 2500,
      });
      if (typeof onSuccess === "function") {
        onSuccess(res);
      }
    } else {
      toast.error(res?.message || "Operation failed", {
        id: toastId,
        duration: 2500,
      });
      if (typeof onFailure === "function") {
        onFailure(res);
      }
    }
  } catch (error: any) {
    let errorMessage = "Something went wrong!";
    if (error.status === "PARSING_ERROR") {
      errorMessage = "Server returned invalid data. Please try again or contact support.";
    } else if (error.data?.message) {
      errorMessage = error.data.message;
    }

    toast.error(errorMessage, {
      id: toastId,
      duration: 2500,
    });
    console.log("api error: ", error);
    if (typeof onFailure === "function") {
      onFailure(error);
    }
  }
};

export default handleMutation;