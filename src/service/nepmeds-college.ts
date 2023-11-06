import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpClient } from "./service-axios";
import { NepMedsResponse, api } from "@nepMeds/service/service-api";
import { generatePath } from "react-router-dom";
import { toastFail, toastSuccess } from "@nepMeds/service/service-toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";

export interface ICollegeList {
  id: number;
  name?: string;
}
export interface ICollegeResp {
  count: number;
  page_count: number;
  next: string;
  previous: string;
  results: ICollegeList[];
}

interface IPaginationParams {
  page: number;
  page_size: number;
}

//Get Hospital List
const getCollege = () => {
  return HttpClient.get<NepMedsResponse<ICollegeList[]>>(api.college.get);
};

const useGetCollege = () => {
  return useQuery(api.college.get, getCollege, {
    select: ({ data }) =>
      data?.data.map(item => ({
        label: item.name,
        value: item.id,
      })),
    onError: error => {
      const formattedError = serverErrorResponse(error);
      toastFail(formattedError);
    },
  });
};

const getAllCollege = ({ page, page_size }: IPaginationParams) => {
  return HttpClient.get<NepMedsResponse<ICollegeResp>>(api.college.get, {
    params: { page, page_size },
  });
};

const useGetAllCollegeDetails = ({ page, page_size }: IPaginationParams) => {
  return useQuery(
    [api.college.get, page, page_size],
    () => getAllCollege({ page, page_size }),
    {
      select: ({ data }) => data?.data,
      onError: error => {
        const formattedError = serverErrorResponse(error);
        toastFail(formattedError);
      },
    },
  );
};

// Update College
const updateCollege = (collegeUpdateRequestBody: ICollegeList) => {
  return HttpClient.patch(
    generatePath(api.college.patch, {
      id: collegeUpdateRequestBody.id.toString(),
    }),
    collegeUpdateRequestBody,
  );
};

const useUpdateCollege = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCollege, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.college_list.get);
      toastSuccess("College updated successfully!");
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    },
  });
};

//Delete College
const deleteCollege = ({ id }: { id: string }) => {
  console.log(id, "id");
  return HttpClient.delete(generatePath(api.college.delete, { id }));
};

const useDeleteCollege = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCollege, {
    onSuccess: () => {
      toastSuccess("College deleted successfully");
      queryClient.invalidateQueries([api.college_list.get]);
    },
  });
};

//GetById
const getCollegeById = ({ id }: { id: string }) => {
  return HttpClient.get<NepMedsResponse<ICollegeList>>(
    generatePath(api.college.getById, { id }),
  );
};
const useGetCollegeById = ({ id }: { id: string }) => {
  return useQuery([api.college.getById, id], () => getCollegeById({ id }), {
    enabled: !!id,
    select: ({ data }) => data?.data,
  });
};

export {
  useGetCollege,
  useGetAllCollegeDetails,
  useUpdateCollege,
  useDeleteCollege,
  useGetCollegeById,
};
