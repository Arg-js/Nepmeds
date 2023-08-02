import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, TimeSquare, svgs } from "@nepMeds/assets/svgs";

import {
  convertMinutesToHoursAndMinutes,
  getHour,
  getTimeDifferenceInMinutes,
  removeSeconds,
} from "@nepMeds/helper/checkTimeRange";
import { AddEvent } from "@nepMeds/pages/Calendar/Component/AddEvent";
import CalendarAppointmentBox from "@nepMeds/pages/NewCalendar/Component/CalendarAppointmentBox";
import {
  IGetDoctorAvailability,
  getSingleAvailability,
  useDeleteAvailability,
  useDoctorAvailability,
  useUpdateDoctorAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { generateHoursTimeArray } from "@nepMeds/utils/timeRange";
import { AxiosError } from "axios";
import { isSameDay, parseISO } from "date-fns";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ModalComponent from "../Form/ModalComponent";
import { toastFail, toastSuccess } from "../Toast";
// TODO: change the path imports
import {
  formatToDate,
  formatToDayOfWeek,
  formatToMonth,
} from "@nepMeds/helper/dateTImeConverter";
import HourTimeSlot from "./HourTimeSlot";
import MinuteTImeSlot from "./MinuteTimeSlot";

const timeData = generateHoursTimeArray();

interface IScheduleComponent {
  selectedFullDate: string;
}
const boxPositions = ["0", "25%", "50%", "75%"];

const minuteTime = {
  "0": "00",
  "25%": "15",
  "50%": "30",
  "75%": "45",
};

const ScheduleComponent: React.FC<IScheduleComponent> = ({
  selectedFullDate,
}) => {
  const availabilityData = useDoctorAvailability().data;
  const [isSingleAvailabilityLoading, setIsSingleAvailabilityLoading] =
    useState(false);

  const listOfTimeObject = availabilityData
    ?.filter(event => {
      if (event.date) {
        const todayEvent = isSameDay(
          parseISO(event.date),
          parseISO(selectedFullDate)
        );

        return todayEvent;
      } else if (event.frequency === "Daily") {
        return true;
      }

      return false;
    })
    .flatMap(item => {
      return {
        id: item?.id,
        timeFrame: item?.child_time_frames?.map(childFrame =>
          childFrame?.from_time.slice(0, -3)
        ),
      };
    });

  const shouldColorBlock = (time: string, minute: string) => {
    const tim =
      String(getHour(time)) +
      ":" +
      minuteTime[minute as keyof typeof minuteTime];
    if (!listOfTimeObject) return undefined;
    return listOfTimeObject.find(item => item?.timeFrame?.includes(tim));
  };

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const deleteDoctorAvailability = useDeleteAvailability();
  const updateDoctorAvailability = useUpdateDoctorAvailability();
  const formMethods = useForm();

  const [availabilityId, setAvailabilityId] = useState(0);
  const onSubmit = async (data: IGetDoctorAvailability) => {
    try {
      const response = await updateDoctorAvailability.mutateAsync({
        id: availabilityId,
        data: data,
      });
      if (response) {
        toastSuccess("Event has been added successfully");
        onEditModalClose();
        onViewModalClose();
      }
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };
  const [doctorAvailabilityData, setDoctorAvailabilityData] =
    useState<IGetDoctorAvailability>();

  const handleView = async (id: number) => {
    onViewModalOpen();
    setIsSingleAvailabilityLoading(true);
    try {
      const res = await getSingleAvailability(id);
      setDoctorAvailabilityData(res);
      setAvailabilityId(id);
      formMethods.reset({});
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
    setIsSingleAvailabilityLoading(false);
  };

  const handleEdit = async (id: number) => {
    onEditModalOpen();
    setIsSingleAvailabilityLoading(true);
    try {
      const res = await getSingleAvailability(id);
      setDoctorAvailabilityData(res);
      setAvailabilityId(id);
      formMethods.reset({});
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
    setIsSingleAvailabilityLoading(false);
  };

  const handleDeleteModal = (id: number) => {
    setAvailabilityId(id);
    onOpenDeleteModal();
  };
  const onDeleteSymptom = async () => {
    try {
      if (!availabilityId) return;

      await deleteDoctorAvailability.mutateAsync({
        id: availabilityId,
      });

      onCloseDeleteModal();
      onViewModalClose();
      toastSuccess("Availability deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete availability!");
    }
  };

  return (
    <Box>
      {/* Minute time Slot */}
      <MinuteTImeSlot />
      {/* Minute time Slot ends */}

      {timeData?.map(data => (
        <Grid key={data.time} templateColumns="5% repeat(4, 15%)" gap={0}>
          {/* RULER */}
          <HourTimeSlot timeSlot={data.time} />
          {/* RULER ENDS */}

          <GridItem colStart={2} colEnd={8}>
            <Box position="relative">
              {boxPositions.map(boxPosition => (
                <Box key={boxPosition + data.time}>
                  <CalendarAppointmentBox
                    handleEdit={handleView}
                    handleDeleteModal={handleDeleteModal}
                    leftPosition={boxPosition}
                    time={data.time}
                    timeObject={shouldColorBlock(data.time, boxPosition)}
                  />
                </Box>
              ))}
            </Box>
          </GridItem>
        </Grid>
      ))}

      {/* view availability */}
      <ModalComponent
        size="xl"
        isOpen={isViewModalOpen}
        onClose={() => {
          onViewModalClose();
        }}
        heading={
          <Flex justifyContent={"space-between"} mr={5}>
            <Flex>
              <Text>{doctorAvailabilityData?.title}</Text>
            </Flex>
            {/* TODO: move this to generic component */}
            <Flex gap={4} mr={3}>
              <EditIcon
                cursor={"pointer"}
                onClick={() => handleEdit(availabilityId ?? 0)}
              />
              <DeleteIcon
                cursor={"pointer"}
                onClick={() => handleDeleteModal(availabilityId ?? 0)}
              />
            </Flex>
          </Flex>
        }
        footer={<></>}
      >
        <VStack>
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              style={{ width: "100%" }}
            >
              {isSingleAvailabilityLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <>
                  <Flex direction={"column"} gap={3}>
                    <Text>
                      {doctorAvailabilityData &&
                        `${formatToDayOfWeek(
                          doctorAvailabilityData.date as string
                        )},
                      
                        ${formatToMonth(doctorAvailabilityData.date as string)}
                        ${formatToDate(doctorAvailabilityData.date as string)}.

                        ${removeSeconds(
                          doctorAvailabilityData.from_time as string
                        )} -
                        ${removeSeconds(
                          doctorAvailabilityData.to_time as string
                        )}
                        `}
                    </Text>
                    <Flex gap={3} alignItems={"flex-start"}>
                      <TimeSquare />
                      <Text>
                        {doctorAvailabilityData &&
                          convertMinutesToHoursAndMinutes(
                            getTimeDifferenceInMinutes(
                              doctorAvailabilityData.from_time as string,
                              doctorAvailabilityData.to_time as string
                            )
                          )}
                      </Text>
                    </Flex>
                  </Flex>
                </>
              )}
            </form>
          </FormProvider>
        </VStack>
      </ModalComponent>

      {/* edit availability */}
      <ModalComponent
        size="xl"
        isOpen={isEditModalOpen}
        onClose={() => {
          onEditModalClose();
          formMethods.reset();
        }}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Edit Availability</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button
              variant="outline"
              onClick={() => {
                onEditModalClose();
                formMethods.reset();
              }}
              flex={1}
            >
              Discard
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onSubmit)}
              background={colors.primary}
              color={colors.white}
              isLoading={updateDoctorAvailability.isLoading}
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
              {isSingleAvailabilityLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <AddEvent doctorAvailabilityData={doctorAvailabilityData} />
              )}
            </form>
          </FormProvider>
        </VStack>
      </ModalComponent>
      {/* delete availability */}
      <ModalComponent
        size="sm"
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Delete Availability</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="outline" onClick={onCloseDeleteModal} flex={1}>
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={onDeleteSymptom}
              borderColor={colors.red}
              color={colors.red}
              isLoading={deleteDoctorAvailability.isLoading}
              variant="outline"
            >
              Delete
            </Button>
          </HStack>
        }
      >
        <Text>Are you sure you want to this availability ?</Text>
      </ModalComponent>
    </Box>
  );
};

export default ScheduleComponent;
