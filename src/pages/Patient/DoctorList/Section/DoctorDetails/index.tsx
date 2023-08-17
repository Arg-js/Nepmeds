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

const schema = Yup.object().shape({
  // availability: [],
  full_name: Yup.string().required("This field is requried"),
  gender: Yup.string().required("This field is requried"),
  // symptoms: [],
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
    // handleSubmit,
    reset,
    getValues,
    control,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });
  useEffect(() => {
    watch("availabilityDate") && setTargeDate(watch("availabilityDate"));
  }, [watch("availabilityDate")]);

  const onSubmitHandler = async (data: IPatientAppointment) => {
    try {
      const response = await createPatientAppointment({
        patientAppointmentDetails: {
          ...data,
          availability: data.availability.map(({ value }) => +value),
          // availability: [+data.availability[0].value],
          symptoms: data.symptoms.map(({ value }) => +value),
          // symptoms: [+data.symptoms[0].value],
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
    <WrapperBox
      width={"560px"}
      // height={"797px"}
      height={"auto"}
      backgroundColor={colors.white}
      border={`1px solid ${colors.light_blue}`}
      paddingX={"4"}
      borderRadius={"3px"}
    >
      {doctorInfo ? (
        <Flex direction={"column"} gap={5}>
          <Flex direction={"column"} alignItems={"center"} gap={4}>
            <Text fontWeight={600} fontSize={"14px"} color={colors.dark_blue}>
              Doctor’s Profile
            </Text>
            <Avatar size={"lg"} />
            <Text fontWeight={600} fontSize={"16px"}>
              {doctorInfo?.name}
            </Text>
            <Box textAlign={"center"}>
              <Text fontWeight={400} fontSize={"12px"}>
                {/* MBBS, MD - General Medicine - Cardiology */}
                {doctorInfo?.specialization_names &&
                  doctorInfo?.specialization_names.map(
                    (specializaion_name, index) => {
                      return `${
                        index === doctorInfo.specialization_names.length - 1 ||
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
            <Text fontWeight={400} fontSize={"12px"}>
              {doctorInfo?.bio_detail}
            </Text>
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
          <form>
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
                error={errors?.full_name?.message ?? ""}
                register={register}
                options={[
                  { label: "Male", value: "1" },
                  { label: "Female", value: "2" },
                ]}
                required
              />
              <FormControl
                control={"input"}
                label={"Date"}
                type={"date"}
                name={"availabilityDate"}
                placeholder={""}
                // error={errors?.full_name?.message ?? ""}
                register={register}
                variant={"outline"}
                style={{
                  minHeight: "55px",
                }}
                required
              />
              <FormControl
                control={"multiSelect"}
                label={"Availability"}
                name={"availability"}
                placeholder={"Book availability"}
                variant={"outline"}
                size={"sm"}
                error={errors?.symptoms?.message ?? ""}
                register={register}
                selectControl={control}
                options={availabilityOptions ?? []}
                style={{
                  border: `1px solid  ${colors.gray_border} `,
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
                  border: `1px solid  ${colors.gray_border} `,
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
                // variant={"outline"}
                // size={"sm"}
                sx={{
                  borderRadius: "8px",
                  p: "3",
                  minHeight: "200px",
                }}
                error={errors?.description?.message ?? ""}
                register={register}
              />
              <Button
                onClick={e => {
                  e.preventDefault();
                  onSubmitHandler(getValues());
                }}
              >
                Confrim & Pay
              </Button>
            </Flex>
          </form>
        </Flex>
      ) : (
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
                Please Click on the doctor list to view detail doctor’s profile.
              </Text>
            </>
          )}
        </VStack>
      )}
    </WrapperBox>
  );
};

export default DoctorDetails;
