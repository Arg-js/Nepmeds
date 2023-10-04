import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BackArrowIcon,
  ImageCancelIcon,
  UploadImageIcon,
} from "@nepMeds/assets/svgs";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { colors } from "@nepMeds/theme/colors";
import FormControl from "@nepMeds/components/Form/FormControl";
import {
  IAvailability,
  IDoctorListById,
} from "@nepMeds/service/nepmeds-patient-doctorList";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { dateFormatter } from "@nepMeds/utils/index";
export const defaultValues = {
  full_name: "",
  contact: "",
  age: "",
  gender: "",
  symptoms: [],
  description: "",
  old_report_file: null,
};

interface PatientDetailProps {
  doctorList: IDoctorListById | undefined;
  bookedDates: IAvailability[];
  setFormState: Dispatch<SetStateAction<number>>;
  formProps: UseFormReturn<typeof defaultValues>;
}

const PatientDetail = ({
  doctorList,
  setFormState,
  formProps,
  bookedDates,
}: PatientDetailProps) => {
  const { data: symptomData } = useGetSymptoms();

  const symptomDataOption =
    symptomData?.map(p => ({
      label: p.name,
      value: p.id,
    })) || [];

  const oldReportFileWatch = formProps.watch("old_report_file");

  const onSubmitHandler = () => {
    setFormState(2);
    //   setFormData(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <WrapperBox
      px={"5"}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius="2"
    >
      <>
        <Flex
          alignItems={"center"}
          gap={2}
          mb={6}
          cursor={"pointer"}
          onClick={() => setFormState(0)}
        >
          <BackArrowIcon />
          <Text fontWeight={600} fontSize={"md"} color={colors.dark_blue}>
            Appointment Details
          </Text>
        </Flex>
        <VStack display={"start"}>
          <Box marginBottom={"12px"}>
            <Text
              fontWeight={600}
              fontSize="md"
              mb="4px"
              textTransform={"capitalize"}
            >
              {doctorList?.title}. {doctorList?.name}
            </Text>
            <Flex>
              {doctorList?.specialization_names?.map((speciality, index) => {
                return (
                  <Text key={speciality.id} fontSize={"sm"} fontWeight={500}>
                    {speciality.name}{" "}
                    {index !== doctorList?.specialization_names.length - 1 &&
                      ` - `}
                  </Text>
                );
              })}
            </Flex>
            <Flex my={"3px"} fontSize={"sm"} fontWeight={500}>
              <Text>NMC No: &nbsp;</Text>
              <Text color={colors.primary}>
                {doctorList?.medical_licence_number ?? "N/A"}
              </Text>
            </Flex>
            <Text fontWeight={600} fontSize="sm" my="4px">
              Selected Date
            </Text>

            {bookedDates.map(bookedDate => (
              <Text
                color={colors.primary}
                fontSize={"sm"}
                fontWeight={500}
                key={bookedDate.id}
              >
                {dateFormatter({
                  date: bookedDate?.date,
                  time: bookedDate?.from_time,
                })}
              </Text>
            ))}
          </Box>
          <Divider borderWidth="1px" />
          <VStack display={"flex-start"}>
            <Text fontWeight={600} fontSize={"md"}>
              Please enter patient information
            </Text>
            <form onSubmit={formProps.handleSubmit(onSubmitHandler)}>
              <Box mb={4}>
                <FormControl
                  control={"input"}
                  label={"Full Name"}
                  name={"full_name"}
                  placeholder={"Enter patient name"}
                  error={formProps.formState.errors?.full_name?.message ?? ""}
                  register={formProps.register}
                  variant={"outline"}
                  style={{
                    minHeight: "35px",
                  }}
                  required
                />
              </Box>
              <Box mb={4}>
                <FormControl
                  control={"input"}
                  label={"Enter Contact Number"}
                  name={"contact"}
                  placeholder={"Enter contact number"}
                  error={formProps.formState.errors?.contact?.message ?? ""}
                  register={formProps.register}
                  variant={"outline"}
                  style={{
                    minHeight: "35px",
                  }}
                  required
                />
              </Box>
              <Grid gap={4} mb={4} templateColumns={"repeat(5,1fr)"}>
                <GridItem colSpan={{ base: 5, sm: 2, lg: 5, xl: 2 }}>
                  <FormControl
                    control={"input"}
                    label={"Age"}
                    name={"age"}
                    placeholder={"Enter age"}
                    error={formProps.formState.errors?.age?.message ?? ""}
                    register={formProps.register}
                    variant={"outline"}
                    style={{
                      minHeight: "35px",
                    }}
                  />
                </GridItem>
                <GridItem
                  gridColumn={{
                    base: "1",
                    sm: "4",
                    lg: "1",
                    xl: "4",
                  }}
                >
                  <FormControl
                    control={"radio"}
                    label={"Choose Gender"}
                    name={"gender"}
                    register={formProps.register}
                    options={[
                      { label: "Male", value: "1" },
                      { label: "Female", value: "2" },
                      { label: "Others", value: "3" },
                    ]}
                  />
                </GridItem>
              </Grid>
              <Box mb={4}>
                <FormControl
                  control={"multiSelect"}
                  label={"Select Health Issue"}
                  name={"symptoms"}
                  placeholder={"Select health issue"}
                  variant={"outline"}
                  size={"sm"}
                  error={formProps.formState.errors?.symptoms?.message ?? ""}
                  register={formProps.register}
                  selectControl={formProps.control}
                  options={symptomDataOption}
                  style={{
                    background: colors.white,
                    minHeight: "35px",
                  }}
                  required
                />
              </Box>
              <Box mb={4}>
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
                  error={formProps.formState.errors?.description?.message ?? ""}
                  register={formProps.register}
                />
              </Box>
              <Box mb={4}>
                <FormLabel
                  fontWeight={"500"}
                  fontSize={"13px"}
                  fontFamily={"Quicksand"}
                >
                  Upload Older Reports or Prescription (if any)
                </FormLabel>
                <FormControl
                  register={formProps.register}
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
                          formProps.setValue("old_report_file", null)
                        }
                      >
                        <ImageCancelIcon style={{ cursor: "pointer" }} />
                      </Box>
                    </HStack>
                  )}
                </Flex>
              </Box>
              {/* TODO: align this design*/}
              <Button
                width="full"
                variant={"primary"}
                type="submit"
                sx={{
                  backgroundColor: colors.main,
                }}
              >
                Confirm & pay
              </Button>
            </form>
          </VStack>
        </VStack>
      </>
    </WrapperBox>
  );
};
// );
// PatientDetail.displayName = "PatientDetail";
export default PatientDetail;

//formdata udnu
