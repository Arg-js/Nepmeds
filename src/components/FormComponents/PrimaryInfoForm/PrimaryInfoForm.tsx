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
  useGetDetailAddress,
} from "@nepMeds/service/nepmeds-core";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { normalURL } from "@nepMeds/service/service-axios";
import { colors } from "@nepMeds/theme/colors";
import { gender, idType } from "@nepMeds/utils/choices";
import { fileToString } from "@nepMeds/utils/fileToString";
import { checkNumberMatch } from "@nepMeds/utils/validation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IRegisterFields } from "@nepMeds/components/FormComponents/RegistrationForm/RegistrationForm";

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
    setValue,
    control,
    formState: { errors },
  } = useFormContext<IRegisterFields>();
  const location = useLocation();
  const [validField, setValidField] = useState<"mobile" | "email">();
  const allDistrictInfo = useGetAllDistricts();
  const { data: detailedAddress } = useGetDetailAddress();
  const { data: specialization = [] } = useSpecializationRegisterData();
  const getMunicipalities = (provinceId: string, districtId: string) => {
    let municipalities = [];
    const province = detailedAddress?.find(
      item => item.id.toString() === provinceId
    );

    const district = province?.province_district.find(
      item => item.id.toString() === districtId
    );

    municipalities =
      district?.district_municipality.map(muni => ({
        label: muni.name,
        value: muni.id,
      })) ?? [];

    return municipalities;
  };

  function getDistrictsByProvince(provinceId: string) {
    let districts = [];
    const province = detailedAddress?.find(
      item => item.id.toString() === provinceId
    );

    if (!province) {
      return [];
    }

    districts = province.province_district.map(district => ({
      label: district.name,
      value: district.id,
    }));

    return districts;
  }

  const provinceOptions = detailedAddress?.map(e => {
    return { label: e.name, value: e.id };
  });

  const districtOptions = getDistrictsByProvince(
    watch("province")?.toString() ?? ""
  );

  const municipalityOptions = getMunicipalities(
    watch("province")?.toString() ?? "",
    watch("district")?.toString() ?? ""
  );

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
        id_issued_district: +doctorProfileData.issued_district?.id,
        province: doctorProfileData?.user?.province_data?.id,
        district: doctorProfileData?.user?.district_data?.id,
        municipality: doctorProfileData?.user?.municipality_data?.id,
      });
    }
  }, [doctorProfileData]);

  useEffect(() => {
    if (location.state) {
      const mobileNumber = (location.state as { mobile: string }).mobile;
      if (checkNumberMatch(mobileNumber)) {
        setValue("mobile_number", mobileNumber);
        setValidField("mobile");
        setValue("is_mobile_number_verified", true);
      } else {
        setValue("email", mobileNumber);
        setValidField("email");
        setValue("is_email_verified", true);
      }
    }
  }, [location.state]);

  const watchIdType = watch("id_type");
  function IdType(watchIdType: string) {
    return watchIdType;
  }

  useEffect(() => {
    IdType(watchIdType);
  }, [watchIdType]);

  const [selectedFrontImage, setSelectedFrontImage] = useState<
    File | string | null
  >(null);

  const [selectedBackImage, setSelectedBackFrontImage] = useState<
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

  const checkPictureSize = (image: File[] | undefined) => {
    if (image?.length !== 0 && (image as File[])?.[0]?.size / 1048576 > 1) {
      return "Image is greater than 1MB";
    }
  };
  //Only enabling date picker to 18 years before todays date
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return (
    <Grid gap={4} pb={8} templateColumns={"repeat(4, 1fr)"}>
      {!isEditable && (
        <GridItem colSpan={4}>
          <FloatinglabelTextArea
            label="Basic Information"
            name="bio_detail"
            register={register}
            defaultValue={doctorProfileData?.bio_detail}
            required
            rules={{
              required: "Basic Information is required.",
              minLength: {
                value: 50,
                message: "Basic Information must be atleast 50 characters.",
              },
              maxLength: {
                value: 250,
                message: "Basic Information must be less than 250 characters.",
              },
            }}
            error={errors.bio_detail?.message}
          />
        </GridItem>
      )}
      <GridItem colSpan={{ base: 2, lg: 1 }}>
        <Input
          py={"28px"}
          pl={"20"}
          name="phone"
          register={register}
          defaultValue={"+977"}
          isReadOnly
          startIcon={
            <img
              src={NepalFlag}
              style={{ height: "45px", marginTop: "15px" }}
              alt="Nepal Flag"
            />
          }
          style={{
            background: colors.forminput,
            border: "none",
          }}
          error={errors.phone?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          label="Mobile No."
          name="mobile_number"
          type="tel"
          required
          isReadOnly={validField === "mobile"}
          isDisabled={validField === "mobile"}
          // isReadOnly

          register={register}
          defaultValue={doctorProfileData?.user?.mobile_number}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Mobile No. is required.",
            min: "Mobile No. can be only 10 digit long",
            max: "Mobile No. can be only 10 digit long",
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
          isReadOnly={validField === "email"}
          isDisabled={validField === "email"}
          register={register}
          defaultValue={doctorProfileData?.user?.email}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email is invalid.",
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
          required
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
          label="Date of Birth"
          register={register}
          defaultValue={doctorProfileData?.user?.date_of_birth}
          type="date"
          max={maxDate.toISOString().split("T")[0]}
          required
          _hover={{ cursor: "pointer" }}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          rules={{
            required: "Date of Birth is required.",
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
            paddingLeft: "5px",
          }}
          rules={
            !isEditable
              ? {
                required: "Specialization is required.",
              }
              : {}
          }
          error={errors.specialization_names?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          label="Pan Number"
          name="pan_number"
          maxLength={9}
          type="number"
          defaultValue={doctorProfileData?.pan_number}
          required
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
          }}
          rules={{
            required: "Pan Number is required.",
            minLength: {
              value: 9,
              message: "Pan Number can be only 9 digits long.",
            },
            maxLength: {
              value: 9,
              message: "Pan Number can be only 9 digits long.",
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
          required
          defaultValue={doctorProfileData?.id_type ?? "1"}
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
        <Text fontWeight={100} fontSize={"xl"}>
          Id Detail
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <ImageUpload
          SelectedImage={selectedFrontImage}
          setSelectedImage={setSelectedFrontImage}
          handleImageChange={handleImageChange}
          name="id_front_image"
          helperText={true}
          upload_text="Upload Front Side of your Id "
          error={
            errors.id_front_image?.message ||
            checkPictureSize(watch("id_front_image"))
          }
          rules={{
            required: "Front Side  of your id is required",
          }}
          setValue={setValue}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, lg: 2 }}>
        <ImageUpload
          SelectedImage={selectedBackImage}
          setSelectedImage={setSelectedBackFrontImage}
          handleImageChange={handleBackImageChange}
          name="id_back_image"
          upload_text="Upload Back side of your Id "
          helperText={true}
          error={
            errors.id_back_image?.message ||
            checkPictureSize(watch("id_back_image"))
          }
          rules={{
            required: "Back Side of your id is required",
          }}
          setValue={setValue}
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
            required: "ID Number is required.",
          }}
          error={errors.id_number?.message}
        />
      </GridItem>
      {!allDistrictInfo.isLoading && (
        <GridItem colSpan={isEditable ? 1 : 1}>
          <Select
            placeholder="Select district"
            label="Issued District"
            name="id_issued_district"
            required
            register={register}
            options={allDistrictOptions}
            defaultValue={doctorProfileData?.issued_district?.id}
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
      )}

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
        <Text fontWeight={100} fontSize={"xl"}>
          Address Details
        </Text>
      </GridItem>

      <GridItem colSpan={2}>
        <Select
          placeholder="Select Province"
          label="Province"
          name="province"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.province_data?.id || 0}
          options={provinceOptions ?? []}
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
      <GridItem colSpan={2}>
        <Select
          placeholder="Select District"
          label="District"
          name="district"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.district_data?.id}
          options={districtOptions}
          isDisabled={!districtOptions.length}
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
      <GridItem colSpan={2}>
        <Select
          placeholder="Select Municipality/VDC"
          label="Municipality/VDC"
          name="municipality"
          required
          register={register}
          defaultValue={doctorProfileData?.user?.municipality_data?.id}
          options={municipalityOptions}
          isDisabled={!municipalityOptions.length}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Municipality/VDC is required.",
          }}
          error={errors.municipality?.message}
        />
      </GridItem>
      <GridItem colSpan={isEditable ? 1 : 1}>
        <FloatingLabelInput
          placeholder=""
          label="Ward"
          name="ward"
          maxLength={2}
          required
          register={register}
          defaultValue={doctorProfileData?.user?.ward}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Ward is required.",
            maxLength: {
              value: 2,
              message: "Ward can be only 2 digits long.",
            },
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
