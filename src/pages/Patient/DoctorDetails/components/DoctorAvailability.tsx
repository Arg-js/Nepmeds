import { Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SkeletonControl from "@nepMeds/components/Loader";
import { IAvailability } from "@nepMeds/service/nepmeds-patient-doctorList";
import TokenService from "@nepMeds/service/service-token";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import AvailabilitySection from "./AvailabilitySection";

const DoctorAvailability = ({
  setFormState,
  date,
  setDate,
  isAvailabilityFetching,
  availability,
  selectedAvailability,
  setSelectedAvailability,
}: {
  setFormState: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<Date>>;
  date: Date;
  isAvailabilityFetching: boolean;
  availability: IAvailability[] | undefined;
  selectedAvailability: number[];
  setSelectedAvailability: Dispatch<SetStateAction<number[]>>;
}) => {
  const isAuthenticated = TokenService.isAuthenticated();
  const [appointment, setAppointment] = useState(true);
  const handleCalendarChange = (value: Value) => {
    const date = new Date(value as Date);
    setDate(date);
  };

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      if (selectedAvailability?.length !== 0) {
        setFormState(1);
      }
      setAppointment(false);
    } else {
      location.href = import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE;
    }
  };
  return (
    <WrapperBox
      p={{ base: 5, md: 10, lg: 5, xl: 10 }}
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius="2"
    >
      <>
        <Text fontWeight={600} fontSize={"xl"} color={colors.black_60}>
          Select Date and Time
        </Text>
        <Flex gap={4} direction={"column"}>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Calendar
              onChange={value => handleCalendarChange(value)}
              value={date}
              minDate={new Date()}
            />
          </Flex>
          <Text fontWeight={600} fontSize={"lg"} color={colors.black_60}>
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
                : selectedAvailability?.length === 0 &&
                  !appointment &&
                  "Please Choose the availability*"}
            </FormLabel>
          )}
          {/* AVAILABLE TIME ENDS */}
          <Flex justifyContent="flex-end">
            <Button
              variant={"secondary"}
              height="40px"
              borderRadius="4px"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
          </Flex>
        </Flex>
      </>
    </WrapperBox>
  );
};

export default DoctorAvailability;
