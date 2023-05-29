import { Grid, GridItem } from "@chakra-ui/layout";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FloatingPassword from "@nepMeds/components/Form/FloatingPassword";
import Select from "@nepMeds/components/Form/Select";
import { colors } from "@nepMeds/theme/colors";
import { title } from "@nepMeds/utils/index";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IRegisterFields } from "../RegistrationForm/RegistrationForm";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";

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

  // const image = watch("image");
  // const imageURL = useMemo(() => {
  //   try {
  //     const file = image?.[0];
  //     return file ? URL.createObjectURL(file) : "";
  //   } catch (error) {
  //     return "";
  //   }
  // }, [image]);

  return (
    <Grid
      templateColumns={isEditable ? "repeat(3,1fr)" : "repeat(4, 1fr)"}
      gap={6}
    >
      {/* <GridItem rowSpan={isEditable ? 3 : 2} colSpan={isEditable ? 3 : 1}>
        <FormLabel htmlFor="file" h="100%">
          <Flex
            bg={colors.forminput}
            borderRadius={12}
            h={isEditable ? "20vh" : "100%"}
            width={isEditable ? "30%" : "auto"}
            margin={isEditable ? "0 auto" : "initial"}
            _hover={{
              "& > img": { opacity: 0.5 },
              "& > div": { display: "flex" },
            }}
            cursor="pointer"
            pos="relative"
          >
            {imageURL ? (
              <>
                <Image src={imageURL} />

                <HStack
                  w="100%"
                  pos="absolute"
                  display="none"
                  bottom={3}
                  justifyContent="center"
                >
                  <svgs.upload />
                  <Text fontSize={14}>Upload Image</Text>
                </HStack>
              </>
            ) : (
              <VStack justifyContent="center" w="100%">
                <svgs.image />
                <HStack>
                  <svgs.upload />
                  <Text fontSize={14}>Upload Image</Text>
                </HStack>
              </VStack>
            )}
          </Flex>
        </FormLabel>
        <Input type="file" id="file" name="image" hidden register={register} />
      </GridItem> */}
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

      <GridItem colSpan={4}>
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
