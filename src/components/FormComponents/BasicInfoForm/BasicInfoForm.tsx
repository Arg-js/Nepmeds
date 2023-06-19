import { Grid, GridItem } from "@chakra-ui/layout";
import { Box, VStack, Text } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import Select from "@nepMeds/components/Form/Select";
import { colors } from "@nepMeds/theme/colors";
import { title } from "@nepMeds/utils/index";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";
import { IconButton, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ReactComponent as ImageIconSvg } from "@nepMeds/assets/svgs/image.svg";
import { ReactComponent as UploadIconSvg } from "@nepMeds/assets/svgs/fi_upload-cloud.svg";
export const BasicInfoForm = ({
  isEditable,
  hidePasswordField,
  doctorProfileData,
}: {
  isEditable?: boolean;
  hidePasswordField: boolean;
  doctorProfileData?: IGetDoctorProfile;
}) => {
  const { register } = useFormContext<IRegisterFields>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmpasswordVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <Grid
      templateColumns={isEditable ? "repeat(3,1fr)" : "repeat(4, 1fr)"}
      gap={6}
    >
      <GridItem rowSpan={isEditable ? 3 : 2} colSpan={isEditable ? 3 : 1}>
        <VStack spacing={2}>
          {selectedImage ? (
            <Box
              position="relative"
              width="190px"
              height="160px"
              borderRadius="12px"
              overflow="hidden"
            >
              <Image
                src={selectedImage}
                alt="Selected Image"
                objectFit="cover"
                width="100%"
                height="100%"
              />
              <IconButton
                icon={<CloseIcon />}
                aria-label="Remove Image"
                position="absolute"
                top="4px"
                right="4px"
                size="sm"
                onClick={handleRemoveImage}
              />
            </Box>
          ) : (
            <Box
              as="label"
              htmlFor="image-upload"
              width="180px"
              height="160px"
              borderRadius="12px"
              border="1px solid"
              borderColor="#E1E2E9"
              cursor="pointer"
              display="flex"
              flexDirection={"column"}
              backgroundColor={"#F4F5FA"}
              alignItems={"center"}
              justifyContent="center"
              onClick={() =>
                document.getElementById("profile_picture")?.click()
              }
            >
              <IconButton
                icon={<ImageIconSvg />}
                variant="unstyled"
                _hover={{ bg: "transparent" }}
                aria-label="Upload Image"
              />
              <Box display={"flex"} alignItems={"center"} mt={4}>
                <IconButton
                  icon={<UploadIconSvg />}
                  variant="unstyled"
                  _hover={{ bg: "transparent" }}
                  aria-label="Upload Image"
                />
                <Text color="#5593F1" fontWeight={500} fontSize={"14px"}>
                  Upload Image
                </Text>
              </Box>

              <FloatingLabelInput
                type="file"
                name="profile_picture"
                id="profile_picture"
                accept="image/*"
                register={register}
                display={"none"}
                onChange={handleImageChange}
              />
            </Box>
          )}
        </VStack>
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

      <GridItem colSpan={3}>
        <Select
          label="Title"
          placeholder=""
          name="title"
          required
          register={register}
          defaultValue={doctorProfileData?.title}
          options={title}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          label="First Name"
          name="first_name"
          register={register}
          defaultValue={doctorProfileData?.user?.first_name}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          label="Middle Name"
          name="middle_name"
          register={register}
          defaultValue={doctorProfileData?.user?.middle_name}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FloatingLabelInput
          label="Last Name"
          name="last_name"
          register={register}
          defaultValue={doctorProfileData?.user?.last_name}
          style={{ background: colors.forminput, border: "none" }}
        />
      </GridItem>
      {hidePasswordField && (
        <>
          <GridItem colSpan={2}>
            <FloatingPassword
              label="Password"
              name="password"
              required
              register={register}
              isVisible={passwordVisible}
              onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
              style={{ background: colors.forminput, border: "none" }}
            />
          </GridItem>
          <GridItem colSpan={2}>
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
            />
          </GridItem>
        </>
      )}
    </Grid>
  );
};
