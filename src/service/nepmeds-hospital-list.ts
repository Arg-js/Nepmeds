import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastFail, toastSuccess } from "./service-toast";

interface IHospitalReqBody {
  name: string;
  district: string;
  province: string;
}
interface IHospitalUpdateReqBody extends IHospitalReqBody {
  id: string;
}

interface IHospital {
  id: number;
  name: string;
  province: string;
  district: string;
}
interface IHospitalResp {
  results: IHospital[];
  count: number;
  page_count: number;
  next: string;
  previous: string;
}

interface IPaginationParams {
  page: number;
  page_size: number;
}

const getHospital = () => {
  return HttpClient.get<NepMedsResponse<IHospital[]>>(api.hospital_lists.get);
};

const useGetAllHospital = () => {
  return useQuery(api.hospital_list.get, getHospital, {
    select: ({ data }) =>
      data?.data?.map(item => ({
        label: item.name,
        value: item.id,
      })),
    onError: error => {
      const formattedError = serverErrorResponse(error);
      toastFail(formattedError);
    },
  });
};

const getAllHospital = ({ page, page_size }: IPaginationParams) => {
  return HttpClient.get<NepMedsResponse<IHospitalResp>>(api.hospital_list.get, {
    params: { page, page_size },
  });
};
const useGetAllHospitalDetails = ({ page, page_size }: IPaginationParams) => {
  return useQuery(
    [api.hospital_list.get, page, page_size],
    () => getAllHospital({ page, page_size }),
    {
      select: ({ data }) => data?.data,
      onError: error => {
        const formattedError = serverErrorResponse(error);
        toastFail(formattedError);
      },
    },
  );
};

const createHospital = (hospitalListReqBody: IHospitalReqBody) => {
  return HttpClient.post(api.hospital_list.post, hospitalListReqBody);
};
const useCreateHospital = () => {
  const queryClient = useQueryClient();
  return useMutation(createHospital, {
    onSuccess: () => {
      toastSuccess("Hospital Successfully Added!");
      queryClient.invalidateQueries(api.hospital_list.get);
    },
    onError: error => toastFail(serverErrorResponse(error)),
  });
};

const updateHospital = (hospitalListReqBody: IHospitalUpdateReqBody) => {
  return HttpClient.patch(
    generatePath(api.hospital_list.patch, { id: hospitalListReqBody.id }),
    hospitalListReqBody,
  );
};
const useUpdateHospital = () => {
  const queryClient = useQueryClient();
  return useMutation(updateHospital, {
    onSuccess: () => {
      toastSuccess("Hospital Successfully Updated!");
      queryClient.invalidateQueries(api.hospital_list.getById);
      queryClient.invalidateQueries(api.hospital_list.get);
    },
    onError: error => toastFail(serverErrorResponse(error)),
  });
};

const deleteHospital = (id: string) => {
  return HttpClient.delete(generatePath(api.hospital_list.delete, { id }));
};
const useDeleteHospital = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteHospital, {
    onSuccess: () => {
      toastSuccess("Hospital Successfully Deleted!"),
        queryClient.invalidateQueries(api.hospital_list.get);
    },
    onError: error => toastFail(serverErrorResponse(error)),
  });
};

const getHospitalById = async ({ id }: { id: string }) => {
  const response = await HttpClient.get<NepMedsResponse<IHospital>>(
    generatePath(api.hospital_list.getById, { id }),
  );
  return response;
};

const useGetHospitalById = (id: string) => {
  return useQuery(
    [api.hospital_list.getById, id],
    () => getHospitalById({ id }),
    {
      select: ({ data }) => data?.data,
      enabled: !!id,
      onError: error => toastFail(serverErrorResponse(error)),
    },
  );
};

export {
  useGetAllHospital,
  useGetHospitalById,
  useCreateHospital,
  useUpdateHospital,
  useDeleteHospital,
  useGetAllHospitalDetails,
};
