import {
  Box,
  Button,
  Flex,
  FormLabel,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { IAvailability } from "@nepMeds/service/nepmeds-patient-doctorList";
import TokenService from "@nepMeds/service/service-token";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";

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
  const [appointment, setAppointment] = useState(false);
  const handleCalendarChange = (value: Value) => {
    const date = new Date(value as Date);
    setDate(date);
  };

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      if (selectedAvailability?.length !== 0) {
        setAppointment(!appointment);
        setFormState(1);
      }
    } else {
      window.location.href = import.meta.env.VITE_APP_NEPMEDS_LOGIN_ROUTE;
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
          <Text fontWeight={600} fontSize={"md"} color={colors.black_60}>
            Evening
          </Text>
          <Box>
            {isAvailabilityFetching ? (
              <Box textAlign={"center"}>
                <Spinner />
              </Box>
            ) : (
              <SimpleGrid
                gridTemplateColumns={"repeat(auto-fit, minmax(90px, 1fr))"}
              >
                {availability?.map(data => (
                  <Button
                    variant={"primaryOutlineFilled"}
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
                    {data?.from_time?.slice(0, 5)} -{data?.to_time?.slice(0, 5)}
                  </Button>
                ))}
              </SimpleGrid>
            )}
            {!isAvailabilityFetching && (
              <FormLabel color={colors.error} fontSize={"xs"} mt={4}>
                {!availability?.length &&
                  "This doctor is not available on this date, choose another date"}
              </FormLabel>
            )}
            {appointment && selectedAvailability?.length === 0 && (
              <FormLabel color={colors.error} fontSize={"xs"} mt={4}>
                Please Choose the availability*
              </FormLabel>
            )}
          </Box>
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
