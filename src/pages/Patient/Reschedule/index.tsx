import {
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import Header from "@nepMeds/pages/Patient/Section/Header";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import DoctorDetailView from "@nepMeds/components/DocProfile/DoctorDetailView";
import { useLocation, useNavigate } from "react-router-dom";
import { Value } from "react-calendar/dist/cjs/shared/types";
import SkeletonControl from "@nepMeds/components/Loader";
import Calendar from "react-calendar";
import AvailabilitySection from "../DoctorDetails/components/AvailabilitySection";
import { useState } from "react";
import { formatDateToString } from "@nepMeds/utils/TimeConverter/timeConverter";
import {
  useGetRescheduleAvailability,
  useRescheduleAppointment,
} from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useForm } from "react-hook-form";
import FloatinglabelTextArea from "@nepMeds/components/Form/FloatingLabeltextArea";

const currentDate = formatDateToString(new Date());

const RescheduleAppointment = () => {
  const { state } = useLocation() as {
    state: { appointment_id: string; doctor_id: string };
  };
  const navigate = useNavigate();
  const [selectedAvailability, setSelectedAvailability] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const { data: availability, isFetching: isAvailabilityFetching } =
    useGetRescheduleAvailability({
      id: +state?.doctor_id,
      target_date: formatDateToString(date) || currentDate,
    });
  const { mutateAsync, isLoading } = useRescheduleAppointment();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remarks: "",
    },
  });

  const handleCalendarChange = (value: Value) => {
    const date = new Date(value as Date);
    setDate(date);
  };

  const handleSubmitForm = async ({ remarks }: { remarks: string }) => {
    await mutateAsync({
      remarks,
      doctor_consult: state?.appointment_id,
      availability: selectedAvailability.toString(),
    });
    navigate(-1);
  };

  return (
    <>
      <Header />
      <WrapperBox>
        <Grid
          templateColumns={{ lg: "repeat(3,1fr)", xl: "repeat(12,1fr)" }}
          justifyContent={"center"}
          gap={5}
        >
          <GridItem colSpan={{ lg: 2, xl: 7 }}>
            <DoctorDetailView id={state?.doctor_id} enabled={true} />
          </GridItem>

          <GridItem colSpan={{ lg: 1, xl: 5 }}>
            <WrapperBox
              p={{ base: 5, md: 10, lg: 5, xl: 10 }}
              boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
              borderRadius="2"
            >
              <>
                {/* TODO: this is being repeated */}
                <Text fontWeight={600} fontSize={"xl"} color={colors.black_60}>
                  Select Date and Time for Reschedule
                </Text>
                <Flex gap={4} direction={"column"}>
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Calendar
                      onChange={value => handleCalendarChange(value)}
                      value={date}
                      minDate={new Date()}
                    />
                  </Flex>
                  <Text
                    fontWeight={600}
                    fontSize={"lg"}
                    color={colors.black_60}
                  >
                    Available Time
                  </Text>
                  {/* AVAILABLE TIME */}
                  {isAvailabilityFetching && (
                    <Flex textAlign={"center"} gap={2}>
                      <SkeletonControl
                        variant={"skeleton"}
                        height={"30px"}
                        flex={0.19}
                        length={5}
                      />
                    </Flex>
                  )}
                  {!!availability?.length && (
                    <>
                      <AvailabilitySection
                        title="Morning"
                        availability={availability}
                        selectedAvailability={selectedAvailability}
                        setSelectedAvailability={setSelectedAvailability}
                      />
                      <AvailabilitySection
                        title="Evening"
                        availability={availability}
                        selectedAvailability={selectedAvailability}
                        setSelectedAvailability={setSelectedAvailability}
                      />
                    </>
                  )}
                  {!isAvailabilityFetching && (
                    <FormLabel
                      color={colors.error}
                      fontSize={"xs"}
                      textAlign={"center"}
                    >
                      {!availability?.length
                        ? "This doctor is not available on this date, choose another date"
                        : selectedAvailability === 0 &&
                          "Please Choose the availability*"}
                    </FormLabel>
                  )}
                  {/* AVAILABLE TIME ENDS */}

                  <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <FloatinglabelTextArea
                      label="Remarks"
                      name="remarks"
                      register={register}
                      required
                      rules={{
                        required: "Remarks is required!",
                      }}
                      error={errors?.remarks?.message?.toString()}
                      pb={4}
                    />

                    <Flex justifyContent="flex-end">
                      <Button
                        variant={"secondary"}
                        height="40px"
                        borderRadius="4px"
                        type="submit"
                        isLoading={isLoading}
                        mt={4}
                      >
                        Reschedule Appointment
                      </Button>
                    </Flex>
                  </form>
                </Flex>
              </>
            </WrapperBox>
          </GridItem>
        </Grid>
      </WrapperBox>
    </>
  );
};

export default RescheduleAppointment;