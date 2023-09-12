import { Grid, GridItem } from "@chakra-ui/layout";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import Select from "@nepMeds/components/Form/Select";
import { colors } from "@nepMeds/theme/colors";

import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { title } from "@nepMeds/utils/index";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";

import ImageUpload from "@nepMeds/components/ImageUpload";
import { normalURL } from "@nepMeds/service/service-axios";
import { fileToString } from "@nepMeds/utils/fileToString";
export const BasicInfoForm = ({
  isEditable,
  hidePasswordField,
  doctorProfileData,
}: {
  isEditable?: boolean;
  hidePasswordField: boolean;
  doctorProfileData?: IGetDoctorProfile;
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useFormContext<IRegisterFields>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );

  useEffect(() => {
    if (isEditable && doctorProfileData?.user?.profile_picture) {
      setSelectedImage(
        `${normalURL}/media/${doctorProfileData.user.profile_picture}`
      );
    } else setSelectedImage(getValues("profile_picture")?.[0] ?? null);
  }, [doctorProfileData]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgData = await fileToString(e);
    setSelectedImage(imgData);
  };

  const validateConfirmPassword = (value: string) => {
    const password = getValues("password");
    return value === password || "Passwords do not match.";
  };

  const uploadedImage = watch("profile_picture");
  const checkPictureSize = () => {
    if (uploadedImage && uploadedImage[0].size / 1048576 > 1) {
      return true;
    }
    return false;
  };

  return (
    <Grid templateColumns={"repeat(4, 1fr)"} gap={4}>
      <GridItem
        // rowSpan={isEditable ? 3 : 2}
        rowSpan={2}
        //  colSpan={isEditable ? 3 : 1}
        colSpan={1}
      >
        <ImageUpload
          SelectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleImageChange={handleImageChange}
          name="profile_picture"
          upload_text="Upload Image"
          background="#F9FAFB"
          helperText={false}
          error={
            selectedImage && checkPictureSize() && "File is greater than 1 MB"
          }
          setValue={setValue}
        />
      </GridItem>

      <GridItem colSpan={3}>
        <Select
          label="Title"
          name="title"
          required
          register={register}
          defaultValue={doctorProfileData?.title ?? "Mr"}
          options={title}
          style={{ background: colors.forminput, border: "none" }}
          error={errors.title?.message}
          rules={{
            required: "Title is required.",
          }}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 2, xlg: 1 }}>
        <FloatingLabelInput
          label="First Name"
          name="first_name"
          register={register}
          required
          defaultValue={doctorProfileData?.user?.first_name}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "First name is required.",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "First name should contain only alphabets.",
            },
          }}
          error={errors.first_name?.message}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 2, xlg: 1 }}>
        <FloatingLabelInput
          label="Middle Name"
          name="middle_name"
          register={register}
          defaultValue={doctorProfileData?.user?.middle_name}
          rules={{
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Middle name should contain only alphabets.",
            },
          }}
          style={{ background: colors.forminput, border: "none" }}
          error={errors.middle_name?.message}
        />
      </GridItem>
      <GridItem colSpan={{ base: 4, md: 2, xlg: 1 }}>
        <FloatingLabelInput
          required
          label="Last Name"
          name="last_name"
          register={register}
          defaultValue={doctorProfileData?.user?.last_name}
          style={{ background: colors.forminput, border: "none" }}
          rules={{
            required: "Last name is required.",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Last name should contain only alphabets.",
            },
          }}
          error={errors.last_name?.message}
        />
      </GridItem>

      {isEditable ? (
        <GridItem colSpan={4}>
          <FloatinglabelTextArea
            label="Basic Information"
            name="bio_detail"
            register={register}
            defaultValue={doctorProfileData?.bio_detail}
          />
        </GridItem>
      ) : (
        <></>
      )}
      {hidePasswordField && (
        <>
          <GridItem colSpan={{ base: 4, md: 2, xlg: 2 }}>
            <FloatingPassword
              label="Password"
              name="password"
              required
              register={register}
              isVisible={passwordVisible}
              onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
              style={{ background: colors.forminput, border: "none" }}
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              }}
              error={errors.password?.message}
            />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 2, xlg: 2 }}>
            <FloatingPassword
              label="Confirm Password"
              name="confirm_password"
              register={register}
              required
              isVisible={confirmpasswordVisible}
              onToggleVisibility={() =>
                setConfirmpasswordVisible(!confirmpasswordVisible)
              }
              style={{ background: colors.forminput, border: "none" }}
              rules={{
                required: "Confirm password is required.",
                validate: validateConfirmPassword,
              }}
              error={errors.confirm_password?.message}
            />
          </GridItem>
        </>
      )}
    </Grid>
  );
};
