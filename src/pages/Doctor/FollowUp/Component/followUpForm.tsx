import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import FormControl from "@nepMeds/components/Form/FormControl";
import SkeletonControl from "@nepMeds/components/Loader";
import { useProfileData } from "@nepMeds/context/index";
import appointment from "@nepMeds/pages/Admin/Appointments/appointment";
import AvailabilitySection from "@nepMeds/pages/Patient/DoctorDetails/components/AvailabilitySection";
import { useGetAvailability } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { colors } from "@nepMeds/theme/colors";
import { currentDate, nextDayDate } from "@nepMeds/utils/time";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

const FollowUpForm = ({
  formMethods,
  selectedAvailability,
  setSelectedAvailability,
}: {
  formMethods: UseFormReturn<{
    availabilityDate: string;
  }>;
  selectedAvailability: number;
  setSelectedAvailability: Dispatch<SetStateAction<number>>;
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = formMethods;

  //   React Queries
  const profileData = useProfileData();
  const { data: availability, isLoading: isAvailabilityFetching } =
    useGetAvailability({
      // TODO: remove this 0
      id: profileData?.data?.doctor?.id ?? 0,
      target_date: watch("availabilityDate") || nextDayDate,
    });
  //   React Queries ENDS

  return (
    <>
      <Flex>
        <Text fontWeight={600} fontSize={"md"} color={colors.black_60} flex={1}>
          Select Date and Time
        </Text>
        <Box flex={1}>
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
              borderRadius: "9px",
            }}
            // Restricts selection of past date in Date picker
            defaultValues={nextDayDate}
            min={currentDate}
            required
          />
        </Box>
      </Flex>
      {/* AVAILABLE TIME */}
      {/* TODO: after the changes pass QA test apply to other places also */}
      {isAvailabilityFetching ? (
        <Flex textAlign={"center"} gap={2} mt={2}>
          <SkeletonControl
            variant={"skeleton"}
            height={"30px"}
            flex={0.19}
            length={5}
          />
        </Flex>
      ) : (
        <FormLabel
          color={colors.error}
          fontSize={"xs"}
          textAlign={"center"}
          mt={4}
        >
          {!availability?.length
            ? "This doctor is not available on this date, choose another date"
            : !!selectedAvailability &&
              !appointment &&
              "Please Choose the availability*"}
        </FormLabel>
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
    </>
  );
};

export default FollowUpForm;
