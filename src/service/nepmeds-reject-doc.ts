import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

const rejectDoc = async ({
  id,
  remarks,
  title_id,
}: {
  id: string;
  remarks: string;
  title_id: string;
}) => {
  const response = await HttpClient.post(
    api.rejectsingledoctor.replace("{id}", id),
    { remarks, title_id }
  );
  return response;
};

export const useRejectDoc = () => {
  const queryClient = useQueryClient();

  return useMutation([api.rejectsingledoctor], rejectDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.registereddoctor);
    },
  });
};

interface IGetRejectionTitle {
  id: string;
  name: string;
}

const getRejectionTitle = async () =>
  await HttpClient.get<NepMedsResponse<IGetRejectionTitle[]>>(
    api.rejectionTitle
  );
export const useGetRejectionTitle = () =>
  useQuery([api.rejectionTitle], getRejectionTitle, {
    select: data => {
      return data.data.data?.map(item => {
        return { label: item.name, value: item.id };
      });
    },
  });
