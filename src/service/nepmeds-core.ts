import { useQuery } from "react-query";
import { NepMedsResponse, api } from "./service-api";
import { HttpClient } from "./service-axios";

type Province = {
  id: string;
  name: string;
};

type District = {
  id: string;
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

const getDistrict = (provinceId: string) => async () => {
  const response = await HttpClient.get<NepMedsResponse<District[]>>(
    api.district,
    {
      params: { province_id: provinceId },
    }
  );
  return response;
};

export const useGetDistricts = (provinceId: string) =>
  useQuery([api.district, provinceId], getDistrict(provinceId), {
    select: res => res.data.data,
  });
