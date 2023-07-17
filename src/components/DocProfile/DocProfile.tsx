import { VStack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import {
  IGetDoctorProfile,
  useDoctorProfile,
} from "@nepMeds/service/nepmeds-doctor-profile";
import DocUpdateProfile from "./DocUpdateProfile";

const DocProfile = () => {
  const { data: doctorProfileData } = useDoctorProfile();
  const formMethods = useForm();
  console.log(doctorProfileData);
  return (
    <VStack align={"stretch"} p={4}>
      <FormProvider {...formMethods}>
        <DocUpdateProfile
          doctorProfileData={doctorProfileData ?? ({} as IGetDoctorProfile)}
        />
      </FormProvider>
    </VStack>
  );
};

export default DocProfile;
