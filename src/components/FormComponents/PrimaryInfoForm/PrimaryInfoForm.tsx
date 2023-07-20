import { Grid, GridItem } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import NepalFlag from "@nepMeds/assets/images/flag-nepal.png";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import Input from "@nepMeds/components/Form/Input";
import MultiSelect from "@nepMeds/components/Form/MultiSelect";
import Select from "@nepMeds/components/Form/Select";
import ImageUpload from "@nepMeds/components/ImageUpload";
import { calculateAge } from "@nepMeds/helper/checkTimeRange";
import {
  useGetAllDistricts,
  useGetDistricts,
  useGetMunicipalities,
  useGetProvince,
} from "@nepMeds/service/nepmeds-core";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { gender, idType } from "@nepMeds/utils/choices";
import { fileToString } from "@nepMeds/utils/fileToString";
import React, { ChangeEvent, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

const PrimaryInfo = ({
  doctorProfileData,
  isEditable,
}: {
  doctorProfileData?: IGetDoctorProfile;
  isEditable?: boolean;
}) => {
  const {
    register,
    watch,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useFormContext<IRegisterFields>();
  const provinceInfo = useGetProvince();
  const districtInfo = useGetDistricts(watch("province"));
  const municipalityInfo = useGetMunicipalities(watch("district"));
  const allDistrictInfo = useGetAllDistricts();
  const { data: specialization = [] } = useSpecializationRegisterData();

  const provinceOptions =
    provinceInfo.data?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const municipalityOptions =
    municipalityInfo.data?.map(p => ({
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
  // useEffect(() => {
  //   if (watch("province") !== 0) {
  //     reset({
  //       ...getValues(),
  //       district: 0,
  //       municipality: 0,
  //     });
  //   }
  // }, [watch("province")]);

  useEffect(() => {
    if (doctorProfileData) {
      reset({
        ...getValues(),
        // phone: doctorProfileData.
        id_issued_district: allDistrictOptions.find(
          p => p.value === doctorProfileData.issued_district?.id
        )?.value,
        province: provinceOptions.find(
          p => p.value === doctorProfileData?.user?.province_data?.id
        )?.value,
        district: districtOptions.find(
          p => p.value === doctorProfileData?.user?.district_data?.id
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

  const [selectedFrontImage, setSelectedFrontImage] = React.useState<
    File | string | null
  >(null);

  const [selectedBackImage, setSelectedBackFrontImage] = React.useState<
    File | string | null
  >(null);

  useEffect(() => {
    if (isEditable && doctorProfileData?.id_front_image) {
      setSelectedFrontImage(
        `${normalURL}/media/${doctorProfileData.id_front_image}`
      );
    } else setSelectedFrontImage(getValues("id_front_image")?.[0] ?? null);

    if (isEditable && doctorProfileData?.id_back_image) {
      setSelectedBackFrontImage(
        `${normalURL}/media/${doctorProfileData.id_back_image}`
      );
    } else setSelectedBackFrontImage(getValues("id_back_image")?.[0] ?? null);
  }, [doctorProfileData]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgData = await fileToString(e);
    setSelectedFrontImage(imgData);
  };

  const handleBackImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgData = await fileToString(e);
    setSelectedBackFrontImage(imgData);
  };

  const validateDateOfBirth = () => {
    const currentDateObj = new Date();
    const currentDate = currentDateObj.toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const dateOfBirth = getValues("date_of_birth");
    if (dateOfBirth > currentDate) {
      return "Date of birth cannot be greater than the current date.";
    }

    if (calculateAge(new Date(dateOfBirth)) < 18) {
      return "You must be at least 18 years old to register.";
    }
    return true; // Return true if the validation passes
  };

  const validateDateOfCardIssued = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in ISO format (YYYY-MM-DD)
    const idIssuedDate = getValues("id_issued_date");
    if (idIssuedDate > currentDate) {
      return "Citizenship issued date cannot be greater than the current date.";
    }

    return true; // Return true if the validation passes
  };
  console.log(getValues("id_issued_district"), "llll");

  return (
    <Grid gap={4} pb={8} templateColumns={"repeat(4, 1fr)"}>
      {!isEditable && (
        <GridItem colSpan={4}>
          <FloatinglabelTextArea
            label="Basic Information"
            name="bio_detail"
            register={register}
            defaultValue={doctorProfileData?.bio_detail}
          />
        </GridItem>
      )}
      <GridItem colSpan={{ base: 2, lg: 1 }}>
        <Input
          name="phone"
          register={register}
          defaultValue={"+977"}
          isReadOnly
          startIcon={
            <img src={NepalFlag} style={{ height: "25px" }} alt="Nepal Flag" />
          }
          style={{ background: colors.forminput, border: "none" }}
          error={errors.phone?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          label="Mobile No."
          name="mobile_number"
          type="tel"
          required
          // isReadOnly

          register={register}
          defaultValue={doctorProfileData?.user?.mobile_number}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Phone no is required.",
            min: "Phone no can be only 10 digit long",
            max: "Phone no can be only 10 digit long",
          }}
          error={errors.mobile_number?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 2}>
        <FloatingLabelInput
          type="email"
          label="Email"
          required
          name="email"
          register={register}
          defaultValue={doctorProfileData?.user?.email}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email address must be a valid address",
            },
          }}
          error={errors.email?.message}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 2 }}>
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
          rules={{
            required: "Gender is required.",
          }}
          error={errors.gender?.message}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 2 }}>
        <FloatingLabelInput
          name="date_of_birth"
          label="Date of birth"
          register={register}
          defaultValue={doctorProfileData?.user?.date_of_birth}
          type="date"
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Date of birth is required.",
            validate: validateDateOfBirth,
          }}
          error={errors.date_of_birth?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 2 : 2}>
        <MultiSelect
          label="Specialization"
          required
          name="specialization_names"
          multiValue={doctorProfileData?.specialization_names?.map(item => ({
            label: item?.name,
            value: item?.id?.toString(),
          }))}
          register={register}
          options={specializationOptions}
          selectControl={control}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Specialization is required.",
          }}
          error={errors.specialization_names?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
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
          rules={{
            required: "Pan no is required.",
            minLength: {
              value: 9,
              message: "Pan no can be only 9 digits long.",
            },
            maxLength: {
              value: 9,
              message: "Pan no can be only 9 digits long.",
            },
          }}
          error={errors.pan_number?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <Select
          placeholder=""
          label="ID Type"
          name="id_type"
          register={register}
          options={idType}
          value={doctorProfileData?.id_type}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "ID type is required.",
          }}
          error={errors.id_type?.message}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Text fontWeight={100} fontSize={"20px"}>
          {IdType(watchIdType)} Detail
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <ImageUpload
          SelectedImage={selectedFrontImage}
          setSelectedImage={setSelectedFrontImage}
          handleImageChange={handleImageChange}
          name="id_front_image"
          helperText={true}
          upload_text="Upload Front of your Id "
          error={errors.id_front_image?.message}
          rules={{
            required: "Front of your id is required",
          }}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, lg: 2 }}>
        <ImageUpload
          SelectedImage={selectedBackImage}
          setSelectedImage={setSelectedBackFrontImage}
          handleImageChange={handleBackImageChange}
          name="id_back_image"
          upload_text="Upload Back of your Id "
          helperText={true}
          error={errors.id_back_image?.message}
          rules={{
            required: "Back of your id is required",
          }}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          label="ID Number"
          name="id_number"
          required
          register={register}
          defaultValue={doctorProfileData?.id_number}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "ID no is required.",
          }}
          error={errors.id_number?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <Select
          placeholder=" "
          label="Issued District"
          name="id_issued_district"
          required
          register={register}
          options={allDistrictOptions}
          // value={0}
          defaultValue={doctorProfileData?.issued_district?.id}
          // defaultValue={""}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "ID issued district is required.",
          }}
          error={errors.id_issued_district?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          name="id_issued_date"
          label="Issued Date"
          register={register}
          defaultValue={doctorProfileData?.id_issued_date?.toString()}
          type="date"
          required
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "ID issued date is required.",
            validate: validateDateOfCardIssued,
          }}
          error={errors.id_issued_date?.message}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Text fontWeight={100} fontSize={"20px"}>
          Address Details
        </Text>
      </GridItem>
      {!provinceInfo.isLoading && (
        <GridItem colSpan={1}>
          <Select
            placeholder="Select Province"
            label="Province"
            name="province"
            required
            register={register}
            defaultValue={doctorProfileData?.user?.province_data?.id || 0}
            options={provinceOptions}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "Province is required.",
            }}
            error={errors.province?.message}
          />
        </GridItem>
      )}
      {!districtInfo.isLoading && (
        <GridItem colSpan={isEditable ? 1 : 1}>
          <Select
            placeholder="Select District"
            label="District"
            name="district"
            required
            register={register}
            defaultValue={doctorProfileData?.user?.district_data?.id}
            options={districtOptions}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "District is required.",
            }}
            error={errors.district?.message}
          />
        </GridItem>
      )}
      {!municipalityInfo.isLoading && (
        <GridItem colSpan={isEditable ? 1 : 1}>
          <Select
            placeholder="Select Municipality/Vdc"
            label="Municipality/Vdc"
            name="municipality"
            required
            register={register}
            defaultValue={doctorProfileData?.user?.municipality_data?.id}
            options={municipalityOptions}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "Municipality is required.",
            }}
            error={errors.municipality?.message}
          />
        </GridItem>
      )}
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Ward"
          name="ward"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.ward}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Ward is required.",
          }}
          error={errors.ward?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Tole"
          name="tole"
          register={register}
          defaultValue={doctorProfileData?.user?.tole}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
    </Grid>
  );
};
export const PrimaryInfoForm = PrimaryInfo;
