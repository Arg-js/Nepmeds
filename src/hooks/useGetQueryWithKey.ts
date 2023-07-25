import { useQueryClient } from "react-query";

export const useGetFetchedQuery = (key: string) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(key);
};
