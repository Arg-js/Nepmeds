import axios, { AxiosError } from "axios";
export interface ServerError {
  message: string;
  success: boolean;
}

// TODO: handleError instead of serverErrorResponse

const serverErrorResponse = (error: any, customMessage?: string) => {
  if (axios.isAxiosError(error)) {
    const err = (error as AxiosError<{ errors: [0] }>) ?? [];

    const errorObject = err?.response?.data?.errors?.[0] ?? {};
    const firstErrorMessage = errorObject
      ? Object.values(errorObject)[0]
      : null;

    return (
      firstErrorMessage?.toString() || customMessage || "Something went wrong."
    );
  }
  return "Something went wrong.";
};

export default serverErrorResponse;
