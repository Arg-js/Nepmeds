import { useMutation, useQuery, useQueryClient } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";
import { toastSuccess } from "@nepMeds/components/Toast";
import { toastFail } from "./service-toast";
import serverErrorResponse from "./serverErrorResponse";

type Province = {
  id: number;
  name: string;
};

interface IDistrict {
  id: 0;
  name: string;
  district_municipality: Municipality[];
}

export interface IDetailAddress {
  id: number;
  name: string;
  province_district: IDistrict[];
}

type District = {
  id: number;
  name: string;
};
type College = {
  id: number;
  name: string;
};

type Municipality = {
  id: number;
  name: string;
};
const getProvince = async () => {
  const response = await HttpClient.get<NepMedsResponse<Province[]>>(
    api.province
  );
  return response;
};

export const useGetProvince = () =>
  useQuery(api.province, getProvince, {
    select: res => res.data.data
  });

const getDistrict = (provinceId: number | null) => async () => {
  const response = await HttpClient.get<NepMedsResponse<District[]>>(
    api.district,
    {
      params: { province_id: provinceId }
    }
  );
  return response;
};

export const useGetDistricts = (provinceId: number | null) => {
  return useQuery([api.district, provinceId], getDistrict(provinceId), {
    select: res => res.data.data
  });
};

const getAllDistrict = () => async () => {
  const response = await HttpClient.get<NepMedsResponse<District[]>>(
    api.district
  );
  return response;
};

export const useGetAllDistricts = () =>
  useQuery([api.district], getAllDistrict(), {
    select: res => res.data.data
  });

const getDetailAddress = () => async () => {
  const response = await HttpClient.get<NepMedsResponse<IDetailAddress[]>>(
    api.detail_address
  );
  return response;
};

export const useGetDetailAddress = () =>
  useQuery([api.detail_address], getDetailAddress(), {
    select: res => res.data.data
  });

const getMunicipalities = (districtId: number | null) => async () => {
  const response = await HttpClient.get<NepMedsResponse<Municipality[]>>(
    api.municipality,
    {
      params: { district_id: districtId }
    }
  );
  return response;
};

export const useGetMunicipalities = (districtId: number | null) =>
  useQuery([api.municipality, districtId], getMunicipalities(districtId), {
    select: res => res.data.data
  });

const getAllCollege = () => async () => {
  const response = await HttpClient.get<NepMedsResponse<College[]>>(
    api.college_list.get
  );
  return response;
};

export const useGetAllCollege = () =>
  useQuery([api.college_list.get], getAllCollege(), {
    select: res => res.data.data
  });

const createCollege = async (collegeReqBody: { name: string }) => {
  const response = await HttpClient.post(api.college_list.post, collegeReqBody);
  return response;
};
export const useCreateCollege = () => {
  const queryClient = useQueryClient();
  return useMutation(createCollege, {
    onSuccess: () => {
      toastSuccess("Created college successfully");
      queryClient.invalidateQueries(api.college_list.get);
    },
    onError: e => {
      toastFail(serverErrorResponse(e));
    }
  });
};
