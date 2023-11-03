import { IDetailAddress } from "@nepMeds/service/nepmeds-core";

export const extractLabelAndValue = (item: { name: string }) => ({
  label: item.name,
  value: item.name
});

const getDistrictsByProvince = ({
  provinceId,
  detailAddress
}: {
  provinceId: string;
  detailAddress: IDetailAddress[];
}) => {
  const province = detailAddress?.find(item => item.name === provinceId);

  return (province?.province_district ?? []).map(extractLabelAndValue);
};

const getProvinceOptions = ({
  detailAddress
}: {
  detailAddress: IDetailAddress[];
}) => (detailAddress ?? []).map(extractLabelAndValue);

export { getDistrictsByProvince, getProvinceOptions };
