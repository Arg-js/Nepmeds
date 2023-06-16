import { Grid, GridItem } from "@chakra-ui/layout";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import Select from "@nepMeds/components/Form/Select";
import {
  useGetAllDistricts,
  useGetDistricts,
  useGetProvince,
} from "@nepMeds/service/nepmeds-core";
import { useSpecializationData } from "@nepMeds/service/nepmeds-specialization";
import { colors } from "@nepMeds/theme/colors";
import { gender, idType, phone } from "@nepMeds/utils/choices";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useEffect } from "react";

const PrimaryInfo = ({
  doctorProfileData,
  isEditable,
}: {
  doctorProfileData?: IGetDoctorProfile;
  isEditable?: boolean;
}) => {
  const { register, control, watch, reset, getValues } =
    useFormContext<IRegisterFields>();
  const provinceInfo = useGetProvince();
  const districtInfo = useGetDistricts(watch("province"));
  const allDistrictInfo = useGetAllDistricts();
  const { data: specialization = [] } = useSpecializationData();

  const provinceOptions =
    provinceInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const districtOptions =
    districtInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const allDistrictOptions =
    allDistrictInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const specializationOptions = specialization.map(s => ({
    label: s.name,
    value: s.id,
  }));

  useEffect(() => {
    if (doctorProfileData) {
      reset({
        ...getValues(),
        // phone: doctorProfileData.
        id_issued_district: allDistrictOptions.find(
          p => p.value === doctorProfileData.id_issued_district
        )?.value,
        province: provinceOptions.find(
          p => p.value === doctorProfileData.user.province
        )?.value,
        district: districtOptions.find(
          p => p.value === doctorProfileData.user.district
        )?.value,
      });
    }
  }, [doctorProfileData, reset]);

  const watchIdType = watch("id_type");
  function IdType(watchIdType: string) {
    return watchIdType;
  }
  useEffect(() => {
    IdType(watchIdType);
  }, [watchIdType]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
      {isEditable ? (
        <></>
      ) : (
        <GridItem colSpan={4}>
          <FloatinglabelTextArea
            label="Basic Information"
            name="bio_detail"
            register={register}
            defaultValue={doctorProfileData?.bio_detail}
          />
        </GridItem>
      )}
      <GridItem colSpan={isEditable ? 2 : 1}>
        <Select
          placeholder=""
          name="phone"
          register={register}
          options={phone}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          label="Mobile No."
          name="mobile_number"
          type="tel"
          required
          isReadOnly
          cursor="not-allowed"
          register={register}
          defaultValue={doctorProfileData?.user?.mobile_number}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 4 : 2}>
        <FloatingLabelInput
          type="email"
          label="Email"
          required
          name="email"
          register={register}
          defaultValue={doctorProfileData?.user?.email}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>{" "}
      <GridItem colSpan={2}>
        <Select
          placeholder=""
          label="Gender"
          name="gender"
          register={register}
          defaultValue={doctorProfileData?.user?.gender}
          options={gender}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          name="date_of_birth"
          label="Date"
          register={register}
          defaultValue={doctorProfileData?.user?.date_of_birth}
          type="date"
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 4 : 2}>
        <MultiSelect
          label="Specialization"
          required
          name="specialization"
          multiValue={doctorProfileData?.specialization?.map(item => ({
            label: item,
            value: item,
          }))}
          options={specializationOptions}
          selectControl={control}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          label="Pan Number"
          name="pan_number"
          defaultValue={doctorProfileData?.pan_number}
          required
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
          }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <Select
          placeholder=""
          label="ID Type"
          name="id_type"
          register={register}
          options={idType}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <p>{IdType(watchIdType)} Detail</p>
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          label="ID Number"
          name="id_number"
          required
          register={register}
          defaultValue={doctorProfileData?.id_number}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <Select
          placeholder=""
          label="Issued District"
          name="id_issued_district"
          required
          register={register}
          options={districtOptions}
          defaultValue={doctorProfileData?.id_issued_district}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          name="id_issued_date"
          label="Issued Date"
          register={register}
          defaultValue={doctorProfileData?.id_issued_date}
          type="date"
          required
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <FloatingLabelInput
          label="Id front image"
          name="id_front_image"
          register={register}
          type="file"
        />
      </GridItem>
      <GridItem colSpan={4}>
        <FloatingLabelInput
          name="id_back_image"
          register={register}
          type="file"
        />
      </GridItem>
      <GridItem colSpan={4}>
        <p>Address Details</p>
      </GridItem>
      <GridItem colSpan={2}>
        <Select
          placeholder=""
          label="Province"
          name="province"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.province}
          options={provinceOptions}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <Select
          placeholder=""
          label="District"
          name="district"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.district}
          options={districtOptions}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Municipality/ VDC"
          name="municipality"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.municipality}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Ward"
          name="ward"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.ward}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Tole"
          name="tole"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.tole}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
    </Grid>
  );
};
export const PrimaryInfoForm = PrimaryInfo;
