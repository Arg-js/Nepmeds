import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Flex, Divider, VStack, Box, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import {
  BackArrowIcon,
  ImageCancel,
  NoDataIcon,
  UploadImageIcon,
} from "@nepMeds/assets/svgs";
import FormControl from "@nepMeds/components/Form/FormControl";
import { useForm } from "react-hook-form";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import {
  IAvailability,
  IDoctorListById,
} from "@nepMeds/service/nepmeds-patient-doctorList";
import { colors } from "@nepMeds/theme/colors";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IPatientAppointmentBasicDetails,
  useCreatePatientAppointment,
} from "@nepMeds/service/nepmeds-patient-appointment";
import { HttpStatusCode } from "axios";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReadMoreComponent from "@nepMeds/components/ReadMore";
import { FormLabel, HStack, Image } from "@chakra-ui/react";
import userAvatar from "@nepMeds/assets/images/userAvatar.png";

type IOptionItem = { label: string; value: string };

interface IPatientAppointment extends IPatientAppointmentBasicDetails {
  symptoms: IOptionItem[];
  availabilityDate?: string;
  availability: IOptionItem[];
  old_report_file?: FileList | null;
}

const today = new Date().toISOString().split("T")[0];
const defaultValues = {
  // availability: [{ label: "", value: "" }],
  availability: [],
  full_name: "",
  gender: "",
  symptoms: [],
  old_report_file: null,
  // symptoms: [{ label: "", value: "" }],
  description: "",
  // status: "",
  availabilityDate: "",
};

const boxShadow = ` rgba(0, 0, 0, 0.05) 0px 10px 24px , ${colors.primary} 0px 0px 0px 0.5px`;

const schema = Yup.object({
  full_name: Yup.string().required("This field is requried"),
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
  isAvailabilityFetching: boolean;
  availability: IAvailability[] | undefined;
  setTargeDate: Dispatch<SetStateAction<string>>;
}> = ({
  doctorInfo,
  availability,
  isFetching,
  isAvailabilityFetching,
  setTargeDate,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState<number[]>(
    []
  );
  const [isAvailability, setIsAvailability] = useState(false);
  // REACT QUERIES
  const { data: symptomData } = useGetSymptoms();
  const { mutateAsync: createPatientAppointment, isLoading } =
    useCreatePatientAppointment();
  // REACT QUERIES END

  const symptomDataOptions =
    symptomData?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const oldReportFileWatch = watch("old_report_file");
  const availabilityDateWatch = watch("availabilityDate");

  useEffect(() => {
    availabilityDateWatch && setTargeDate(availabilityDateWatch);
    setValue("availability", []);
  }, [availabilityDateWatch]);

  const onSubmitHandler = async (data: IPatientAppointment) => {
    try {
      const response = await createPatientAppointment({
        patientAppointmentDetails: {
          ...data,
          availability: selectedAvailability,
          symptoms: data.symptoms.map(({ value }) => +value),
          old_report_file: data.old_report_file?.[0] as File,
          doctor: doctorInfo?.id as number,
        },
      });
      if (response.status === HttpStatusCode.Created) {
        setSelectedAvailability([]);
        reset(defaultValues);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      {doctorInfo ? (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {!isAvailability && (
            <>
              <WrapperBox
                backgroundColor={colors.white}
                boxShadow={boxShadow}
                style={{
                  px: { base: "0", md: "2", xl: "4" },
                  height: "auto",
                  borderTopRadius: 3,
                }}
              >
                <>
                  <Flex direction={"column"} gap={5}>
                    <Flex direction={"column"} alignItems={"center"} gap={4}>
                      <Text
                        fontWeight={600}
                        fontSize={"14px"}
                        color={colors.dark_blue}
                      >
                        Doctor’s Profile
                      </Text>
                      <Avatar
                        size={"lg"}
                        src={doctorInfo.profile_picture ?? userAvatar}
                      />
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
                                    doctorInfo.specialization_names.length -
                                      1 ||
                                  doctorInfo.specialization_names.length === 1
                                    ? specializaion_name.name
                                    : `${specializaion_name.name} - `
                                }`;
                              }
                            )}
                        </Text>
                        <Text fontWeight={400} fontSize={"12px"}>
                          NMC No: {doctorInfo?.medical_licence_number || "N/A"}
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
                      <Text
                        fontWeight={590}
                        fontSize={"13px"}
                        color={colors.primary}
                      >
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
                    <Flex alignSelf={"flex-end"}>
                      {/* TODO: add this */}
                      {/* <Text fontWeight={700} fontSize={"13px"}>
                      Available time
                    </Text> */}
                      <FormControl
                        control={"input"}
                        label={""}
                        type={"date"}
                        name={"availabilityDate"}
                        placeholder={""}
                        error={errors?.availabilityDate?.message ?? ""}
                        register={register}
                        variant={"outline"}
                        style={{
                          minHeight: "35px",
                          width: "180px",
                          borderRadius: "9px",
                        }}
                        // Restricts selection of past date in Datepicker
                        min={today}
                        required
                      />
                    </Flex>
                    <Box>
                      {!isAvailabilityFetching && (
                        <FormLabel color={colors.red}>
                          {!availability?.length
                            ? "This doctor is not available on this date, choose another date"
                            : selectedAvailability?.length === 0 &&
                              "Please Choose the availability*"}
                        </FormLabel>
                      )}
                      {isAvailabilityFetching ? (
                        <Box textAlign={"center"}>
                          <Spinner />
                        </Box>
                      ) : (
                        availability?.map(data => (
                          <Button
                            variant={"primaryOutline"}
                            width={"100px"}
                            key={data.id}
                            borderRadius={3}
                            height={"34px"}
                            m={1}
                            sx={{
                              bg: `${
                                selectedAvailability.includes(data.id)
                                  ? colors.sky_blue
                                  : "transparent"
                              }`,
                            }}
                            onClick={() =>
                              setSelectedAvailability(prev =>
                                prev.includes(data.id)
                                  ? prev.filter(item => item !== data.id)
                                  : [...prev, data.id]
                              )
                            }
                          >
                            {data?.from_time?.substr(0, 5)}
                          </Button>
                        ))
                      )}
                    </Box>
                  </Flex>
                </>
              </WrapperBox>
              <Button
                width="full"
                borderRadius="none"
                onClick={() =>
                  selectedAvailability?.length &&
                  setIsAvailability(!isAvailability)
                }
              >
                Book Appointment
              </Button>
            </>
          )}
          {isAvailability && (
            <>
              <WrapperBox
                backgroundColor={colors.white}
                boxShadow={boxShadow}
                style={{
                  px: { base: "0", md: "2", xl: "4" },
                  py: 4,
                  height: "auto",
                  // width: { base: "auto" },
                  // width: "clamp(200px, 100%, 100%)",
                  // maxWidth: "400px",
                  borderTopRadius: 3,
                }}
              >
                <>
                  <Flex direction={"column"} gap={5}>
                    <Flex direction={"column"} gap={4} px={4}>
                      <Flex gap={4} alignItems={"center"}>
                        <BackArrowIcon
                          cursor={"pointer"}
                          onClick={() => setIsAvailability(false)}
                        />
                        <Text
                          fontWeight={600}
                          fontSize={"16px"}
                          color={colors.dark_blue}
                        >
                          Appointment Details
                        </Text>
                      </Flex>
                      <Flex direction={"column"} gap={1}>
                        <Text
                          fontWeight={600}
                          fontSize={"16px"}
                          textTransform="capitalize"
                        >
                          DR. {doctorInfo?.name}
                        </Text>
                        <Text fontWeight={400} fontSize={"12px"}>
                          {doctorInfo?.specialization_names &&
                            doctorInfo?.specialization_names.map(
                              (specializaion_name, index) => {
                                return `${
                                  index ===
                                    doctorInfo.specialization_names.length -
                                      1 ||
                                  doctorInfo.specialization_names.length === 1
                                    ? specializaion_name.name
                                    : `${specializaion_name.name} - `
                                }`;
                              }
                            )}
                        </Text>
                        <Text fontWeight={400} fontSize={"12px"}>
                          NMC No: {doctorInfo?.medical_licence_number || "N/A"}
                        </Text>
                      </Flex>
                      <Divider borderWidth={"0.5px"} />
                    </Flex>
                    <Flex gap={5} direction={"column"} px={4}>
                      <Text fontWeight={600} fontSize={"16px"}>
                        Please enter patient information
                      </Text>
                      <FormControl
                        control={"input"}
                        label={"Full Name"}
                        name={"full_name"}
                        placeholder={"Enter patient name"}
                        error={errors?.full_name?.message ?? ""}
                        register={register}
                        variant={"outline"}
                        style={{
                          minHeight: "35px",
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
                      <Box>
                        <FormLabel
                          fontWeight={"500"}
                          fontSize={"13px"}
                          fontFamily={"Quicksand"}
                        >
                          Upload Older Reports or Prescription (if any)
                        </FormLabel>
                        <FormControl
                          register={register}
                          control={"input"}
                          type={"file"}
                          id={"image"}
                          name={"old_report_file"}
                          display={"none"}
                        />
                        <Flex>
                          <FormLabel
                            htmlFor="image"
                            cursor={"pointer"}
                            border={`1px dashed ${colors.gray}`}
                            width={"76px"}
                          >
                            <UploadImageIcon />
                          </FormLabel>

                          {oldReportFileWatch && (
                            <HStack>
                              <Image
                                src={URL.createObjectURL(
                                  oldReportFileWatch[0] as unknown as Blob
                                )}
                                width={"76px"}
                                objectFit={"cover"}
                              />
                              <Box
                                onClick={() =>
                                  setValue("old_report_file", null)
                                }
                              >
                                <ImageCancel style={{ cursor: "pointer" }} />
                              </Box>
                            </HStack>
                          )}
                        </Flex>
                      </Box>
                    </Flex>
                  </Flex>
                </>
              </WrapperBox>
              <Button
                type="submit"
                width="full"
                borderRadius="none"
                isLoading={isLoading}
              >
                Confirm & Pay
              </Button>
            </>
          )}
        </form>
      ) : (
        <WrapperBox
          // width={"560px"}
          backgroundColor={colors.white}
          boxShadow={boxShadow}
          style={{
            px: 4,
            py: 48,
            // height: "567px",
            width: { base: "auto" },
          }}
          borderRadius={"3px"}
        >
          <VStack
            justifyContent={"center"}
            alignContent={"center"}
            // width={"544px"}
            // height={"700px"}
            // mt={30}
          >
            {isFetching ? (
              <Spinner />
            ) : (
              <>
                <NoDataIcon width={"full"} />
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
    </Box>
  );
};

export default DoctorDetails;
