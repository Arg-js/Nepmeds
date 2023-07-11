import axios, { AxiosError } from "axios";
export interface ServerError {
  message: string;
  success: boolean;
}

const serverErrorResponse = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ errors: [0] }>;

    const errorObject = err?.response?.data?.errors?.[0];
    const firstErrorMessage = errorObject
      ? Object.values(errorObject)[0]
      : null;

    return firstErrorMessage?.toString() || "Something went wrong.";
  }
  return "Something went wrong.";
};

export default serverErrorResponse;
