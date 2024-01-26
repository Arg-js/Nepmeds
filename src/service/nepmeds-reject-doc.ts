import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { generatePath } from "react-router-dom";

const onHoldDoc = async ({
  id,
  remarks,
  title_id,
}: {
  id: string;
  title_id: string;
  remarks: string;
}) => {
  return await HttpClient.post(generatePath(api.holdDoctor, { id }), {
    remarks,
    title_id,
  });
};

export const useHoldDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation(onHoldDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.registereddoctor);
      queryClient.invalidateQueries(api.doctordetails);
    },
  });
};

const rejectDoc = async ({ id, remarks }: { id: string; remarks: string }) => {
  const response = await HttpClient.post(
    api.rejectsingledoctor.replace("{id}", id),
    { remarks }
  );
  return response;
};

export const useRejectDoc = () => {
  const queryClient = useQueryClient();

  return useMutation(rejectDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.registereddoctor);
      queryClient.invalidateQueries(api.doctordetails);
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
