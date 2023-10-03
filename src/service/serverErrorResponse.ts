export interface ServerError {
  message: string;
  success: boolean;
}

// TODO: handleError instead of serverErrorResponse

const serverErrorResponse = (error: any, customMessage?: string) => {
  const firstErrorMessage = Object.values(error?.data?.errors[0])[0];

  return (
    firstErrorMessage?.toString() || customMessage || "Something went wrong."
  );
};

export default serverErrorResponse;
