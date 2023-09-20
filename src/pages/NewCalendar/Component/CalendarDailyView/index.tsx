import {
  useDisclosure,
  HStack,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { PlusIcon, svgs } from "@nepMeds/assets/svgs";
import { CustomButton } from "@nepMeds/components/Button/Button";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import ScheduleComponent from "@nepMeds/components/Schedule";
import { toastSuccess, toastFail } from "@nepMeds/components/Toast";
import { AddEvent } from "@nepMeds/pages/Calendar/Component/AddEvent";
import {
  useCreateDoctorAvailability,
  IGetDoctorAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { useForm, FormProvider } from "react-hook-form";

interface ICalendarDailyDetailView {
  selectedDate: string;
  selectedDay: string;
  selectedFullDate: string;
}

const CalendarDailyDetailView: React.FC<ICalendarDailyDetailView> = ({
  selectedDate,
  selectedDay,
  selectedFullDate,
}) => {
  const formMethods = useForm();

  const {
    isOpen: isAddEventOpen,
    onClose,
    onOpen: onAddEventOpen,
  } = useDisclosure();

  const onAddEventClose = () => {
    onClose();
    formMethods.reset();
  };
  const { mutateAsync, isLoading } = useCreateDoctorAvailability();

  const onSubmit = async (data: IGetDoctorAvailability) => {
    try {
      await mutateAsync(data);
      toastSuccess("Event has been added successfully");
      onAddEventClose();
      formMethods.reset({});
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
  };

  return (
    <>
      <ModalComponent
        size="xl"
        isOpen={isAddEventOpen}
        onClose={onAddEventClose}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Create Availability</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="primaryOutline" onClick={onAddEventClose} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              Save
            </Button>
          </HStack>
        }
      >
        <VStack>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              style={{ width: "100%" }}
            >
              <AddEvent />
            </form>
          </FormProvider>
        </VStack>
      </ModalComponent>
      <Box display={"flex"} justifyContent={"space-between"} p={5}>
        <Box
          display={"flex"}
          alignItems={"baseline"}
          fontSize={"2xl"}
          color={colors.grey_dark}
          lineHeight={"24px"}
        >
          {selectedDate},
          <Text
            fontSize={"40px"}
            color={colors.black}
            lineHeight={"49px"}
            fontWeight={600}
            ml={1}
          >
            {selectedDay}
          </Text>
        </Box>
        <Box onClick={onAddEventOpen} width="130px">
          <CustomButton backgroundColor={colors.primary} gap={2}>
            <Text fontSize={"md"} fontWeight={400}>
              Create
            </Text>
            <PlusIcon />
          </CustomButton>
        </Box>
      </Box>

      <Box
        p={5}
        height={"70dvh"}
        overflowY={"scroll"}
        css={{
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "0.4rem",
            height: "0.6rem",
            position: "absolute",
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            background: "#fff",
            opacity: 0.1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.gray,
            borderRadius: 20,
          },
        }}
        className="inter-font-family"
      >
        <Box mt={5}>
          <ScheduleComponent selectedFullDate={selectedFullDate} />
        </Box>
      </Box>
    </>
  );
};
export default CalendarDailyDetailView;
