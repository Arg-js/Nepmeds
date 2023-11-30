export interface ServerError {
  message: string;
  success: boolean;
}

const serverErrorResponse = (error: any, customMessage?: string) => {
  try {
    const e = error?.data?.errors[0];
    const firstErrorMessage = e
      ? Object.values(error?.data?.errors[0])[0]
      : error?.data?.message;

    return (
      firstErrorMessage?.toString() || customMessage || "Something went wrong."
    );
  } catch (error) {
    return "Something went wrong.";
  }
};

export default serverErrorResponse;
