import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

type Province = {
  id: number;
  name: string;
};

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
    select: res => res.data.data,
  });

const getDistrict = (provinceId: number) => async () => {
  const response = await HttpClient.get<NepMedsResponse<District[]>>(
    api.district,
    {
      params: { province_id: provinceId },
    }
  );
  return response;
};

export const useGetDistricts = (provinceId: number) => {
  return useQuery([api.district, provinceId], getDistrict(provinceId), {
    select: res => res.data.data,
    enabled: !!provinceId,
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
    select: res => res.data.data,
  });

const getMunicipalities = (districtId: number) => async () => {
  const response = await HttpClient.get<NepMedsResponse<Municipality[]>>(
    api.municipality,
    {
      params: { district_id: districtId },
    }
  );
  return response;
};

export const useGetMunicipalities = (districtId: number) =>
  useQuery([api.municipality, districtId], getMunicipalities(districtId), {
    select: res => res.data.data,
    enabled: !!districtId,
  });

const getAllCollege = () => async () => {
  const response = await HttpClient.get<NepMedsResponse<College[]>>(
    api.college_list
  );
  return response;
};

export const useGetAllCollege = () =>
  useQuery([api.college_list], getAllCollege(), {
    select: res => res.data.data,
  });
