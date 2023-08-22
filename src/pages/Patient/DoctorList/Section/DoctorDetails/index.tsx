import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex, Divider, VStack, Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { NoDataIcon } from "@nepMeds/assets/svgs";
import FormControl from "@nepMeds/components/Form/FormControl";
import { useForm } from "react-hook-form";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { IDoctorListById } from "@nepMeds/service/nepmeds-patient-doctorList";
import { colors } from "@nepMeds/theme/colors";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePatientAppointment } from "@nepMeds/service/nepmeds-patient-appointment";
import { HttpStatusCode } from "axios";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { Dispatch, SetStateAction, useEffect } from "react";
import ReadMoreComponent from "@nepMeds/components/ReadMore";

// TODO: check the similarity
export interface IPatientAppointment {
  availability: { label: string; value: string }[];
  full_name: string;
  gender: string;
  symptoms: { label: string; value: string }[];
  description: string;
  old_report_file?: string;
  status?: string;
  availabilityDate?: string;
}

const defaultValues = {
  // doctor: 0,
  // availability: [{ label: "", value: "" }],
  availability: [],
  full_name: "",
  gender: "",
  symptoms: [],
  // symptoms: [{ label: "", value: "" }],
  description: "",
  // old_report_file: "",
  // status: "",
  availabilityDate: "",
};

const schema = Yup.object({
  full_name: Yup.string().required("This field is requried"),
  availabilityDate: Yup.string().required("This field is required"),
  availability: Yup.array()
    .required("This field is required")
    .min(1, "This field is required"),
  symptoms: Yup.array()
    .required("This field is required")
    .min(1, "This field is required"),
  description: Yup.string().required("This field is requried"),
  // old_report_file: "",
  // status: "",
});

const DoctorDetails: React.FC<{
  doctorInfo: IDoctorListById | undefined;
  isFetching: boolean;
  setTargeDate: Dispatch<SetStateAction<string>>;
}> = ({ doctorInfo, isFetching, setTargeDate }) => {
  // REACT QUERIES
  const { data: symptomData } = useGetSymptoms();
  const { mutateAsync: createPatientAppointment } =
    useCreatePatientAppointment();
  // REACT QUERIES END

  const symptomDataOptions =
    symptomData?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const availabilityOptions =
    doctorInfo &&
    doctorInfo.availability &&
    doctorInfo?.availability.map(info => {
      return {
        label: info.from_time,
        value: info.id,
      };
    });

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    control,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    watch("availabilityDate") && setTargeDate(watch("availabilityDate"));
  }, [watch("availabilityDate")]);

  const onSubmitHandler = async (data: IPatientAppointment) => {
    try {
      const response = await createPatientAppointment({
        patientAppointmentDetails: {
          ...data,
          availability: data.availability.map(({ value }) => +value),
          symptoms: data.symptoms.map(({ value }) => +value),
          doctor: doctorInfo?.id as number,
        },
      });
      if (response.status === HttpStatusCode.Created) {
        reset(defaultValues);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {doctorInfo ? (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <WrapperBox
            // width={"560px"}
            backgroundColor={colors.white}
            boxShadow={` rgba(0, 0, 0, 0.05) 0px 10px 24px , ${colors.primary} 0px 0px 0px 0.5px`}
            style={{
              px: { base: "0", md: "2", xl: "4" },
              height: "auto",
              width: { base: "auto", xl: "560px" },
              borderTopRadius: 3,
            }}
          >
            <Flex direction={"column"} gap={5}>
              <Flex direction={"column"} alignItems={"center"} gap={4}>
                <Text
                  fontWeight={600}
                  fontSize={"14px"}
                  color={colors.dark_blue}
                >
                  Doctor’s Profile
                </Text>
                <Avatar size={"lg"} src={doctorInfo.profile_picture} />
                <Text
                  fontWeight={600}
                  fontSize={"16px"}
                  textTransform="capitalize"
                >
                  {doctorInfo?.name}
                </Text>
                <Box textAlign={"center"}>
                  <Text fontWeight={400} fontSize={"12px"}>
                    {doctorInfo?.specialization_names &&
                      doctorInfo?.specialization_names.map(
                        (specializaion_name, index) => {
                          return `${
                            index ===
                              doctorInfo.specialization_names.length - 1 ||
                            doctorInfo.specialization_names.length === 1
                              ? specializaion_name.name
                              : `${specializaion_name.name} - `
                          }`;
                        }
                      )}
                  </Text>
                  <Text fontWeight={400} fontSize={"12px"}>
                    NMC No: 95671
                  </Text>
                </Box>
                <Divider borderWidth={"0.5px"} />
              </Flex>
              <Flex
                direction={"column"}
                justifyContent={"flex-start"}
                gap={1}
                px={4}
              >
                {/* TODO: same component */}
                <Text fontWeight={700} fontSize={"13px"}>
                  About
                </Text>
                <ReadMoreComponent bio_detail={doctorInfo?.bio_detail} />
              </Flex>
              <Flex
                bg={colors.sky_blue}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={2}
                px={3.5}
                borderRadius={"8px"}
              >
                <Text fontWeight={590} fontSize={"13px"} color={colors.primary}>
                  Consultation Fee
                </Text>
                <Text
                  fontWeight={500}
                  fontSize={"16px"}
                  color={colors.forest_green}
                >
                  NRs. {doctorInfo.schedule_rate}
                </Text>
              </Flex>
              <Divider borderWidth={"0.5px"} />
              {/* TODO: same component */}
              <Text fontWeight={700} fontSize={"13px"}>
                Available time
              </Text>
              <Flex gap={6} direction={"column"}>
                {/* <Box>
                <Button
                  color={colors.primary}
                  px={3}
                  py={2}
                  variant={"ghost"}
                  border={`1px solid ${colors.primary}`}
                  // width={"min-content"}
                  width={"126px"}
                  fontSize={"14px"}
                >
                  11:30 AM
                </Button>
                <Button
                  color={colors.primary}
                  px={3}
                  py={2}
                  variant={"ghost"}
                  border={`1px solid ${colors.primary}`}
                  // width={"min-content"}
                  width={"126px"}
                  fontSize={"14px"}
                >
                  11:30 AM
                </Button>
                <Button
                  color={colors.primary}
                  px={3}
                  py={2}
                  variant={"ghost"}
                  border={`1px solid ${colors.primary}`}
                  // width={"min-content"}
                  width={"126px"}
                  fontSize={"14px"}
                >
                  11:30 AM
                </Button>
              </Box> */}
                <FormControl
                  control={"input"}
                  label={"Full Name"}
                  name={"full_name"}
                  placeholder={"Enter patient name"}
                  error={errors?.full_name?.message ?? ""}
                  register={register}
                  variant={"outline"}
                  style={{
                    minHeight: "55px",
                  }}
                  required
                />
                <FormControl
                  control={"radio"}
                  label={"Choose Gender"}
                  name={"gender"}
                  register={register}
                  options={[
                    { label: "Male", value: "1" },
                    { label: "Female", value: "2" },
                  ]}
                />
                <FormControl
                  control={"input"}
                  label={"Date"}
                  type={"date"}
                  name={"availabilityDate"}
                  placeholder={""}
                  error={errors?.availabilityDate?.message ?? ""}
                  register={register}
                  variant={"outline"}
                  style={{
                    minHeight: "55px",
                  }}
                  required
                />
                <FormControl
                  control={"multiSelect"}
                  label={"Available Time"}
                  name={"availability"}
                  placeholder={"Book availability"}
                  variant={"outline"}
                  size={"sm"}
                  error={errors?.symptoms?.message ?? ""}
                  register={register}
                  selectControl={control}
                  options={availabilityOptions ?? []}
                  style={{
                    background: colors.white,
                    minHeight: "35px",
                  }}
                  required
                />
                <FormControl
                  control={"multiSelect"}
                  label={"Select Health Issue"}
                  name={"symptoms"}
                  placeholder={"Select health issue"}
                  variant={"outline"}
                  size={"sm"}
                  error={errors?.symptoms?.message ?? ""}
                  register={register}
                  selectControl={control}
                  options={symptomDataOptions ?? []}
                  style={{
                    background: colors.white,
                    minHeight: "35px",
                  }}
                  required
                />
                <FormControl
                  control={"textArea"}
                  label={"Tell us about your symptoms"}
                  name={"description"}
                  placeholder={"Type your symptoms here"}
                  sx={{
                    borderRadius: "8px",
                    p: "3",
                    minHeight: "200px",
                  }}
                  error={errors?.description?.message ?? ""}
                  register={register}
                />
              </Flex>
            </Flex>
          </WrapperBox>
          {/* TODO: ui update */}
          {/* TODO: wrapper code repeated, width 560px also repeat */}
          <Button
            type="submit"
            width="560px"
            variant={"primary"}
            borderRadius="none"
          >
            Confrim & Pay
          </Button>
        </form>
      ) : (
        <WrapperBox
          // width={"560px"}
          backgroundColor={colors.white}
          boxShadow={` rgba(0, 0, 0, 0.05) 0px 10px 24px , ${colors.primary} 0px 0px 0px 0.5px`}
          style={{
            px: 4,
            height: "1227px",
            width: { base: "auto", xl: "560px" },
          }}
          borderRadius={"3px"}
        >
          <VStack
            justifyContent={"center"}
            alignContent={"center"}
            // width={"544px"}
            // height={"700px"}
            mt={30}
          >
            {isFetching ? (
              <Spinner />
            ) : (
              <>
                <NoDataIcon />
                <Text fontWeight={700} fontSize={"16px"} color={colors.red_700}>
                  There are no details here.
                </Text>
                <Text fontWeight={400} fontSize={"12px"}>
                  Please Click on the doctor list to view detail doctor’s
                  profile.
                </Text>
              </>
            )}
          </VStack>
        </WrapperBox>
      )}
    </>
  );
};

export default DoctorDetails;
