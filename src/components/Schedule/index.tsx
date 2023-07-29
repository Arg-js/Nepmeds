import {
  Box,
  Button,
  Center,
  Divider,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";

import { isTimeInRange, removeMinutes } from "@nepMeds/helper/checkTimeRange";
import { AddEvent } from "@nepMeds/pages/Calendar/Component/AddEvent";
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
import CalendarAppointmentBox from "@nepMeds/pages/Calendar2/Component/CalendarAppointmentBox";

const timeData = generateHoursTimeArray();

const boxStyle: React.CSSProperties = {
  height: "138px",
  backgroundColor: "transparent",
  border: `1px solid ${colors.gray}`,
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  width: "25%",
  alignItems: "center",
  justifyContent: "center",
};

interface IScheduleComponent {
  selectedFullDate: string;
}
const boxPositions = ["0", "25%", "50%", "75%"];

const ScheduleComponent: React.FC<IScheduleComponent> = ({
  selectedFullDate,
}) => {
  const availabilityData = useDoctorAvailability().data;
  const [isSingleAvailabilityLoading, setIsSingleAvailabilityLoading] =
    useState(false);

  const filteredEvents = availabilityData?.filter(event => {
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
  });

  const {
    isOpen: isEditModalOpen,
    onClose: onEditModalClose,
    onOpen: onEditModalOpen,
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
      }
    } catch (error) {
      const err = serverErrorResponse(error);

      toastFail(err);
    }
  };
  const [doctorAvailabilityData, setDoctorAvailabilityData] =
    useState<IGetDoctorAvailability>();
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
      toastSuccess("Availability deleted successfully!");
    } catch (error) {
      toastFail("Failed to delete availability!");
    }
  };

  return (
    <Box>
      {timeData?.map(data => (
        <Grid key={data.time} templateColumns="5% repeat(4, 15%)" gap={0}>
          {/* RULER */}
          <GridItem colSpan={1} mb={"30px"}>
            <List spacing={"30px"}>
              {/* TODO: claendar view shift this might create an issue */}
              <ListItem fontSize={"12px"} color={colors.grey_dark} mt={-2}>
                {data.time}
              </ListItem>
              <ListItem>
                <Divider
                  width={2}
                  borderWidth={1}
                  borderColor={colors.dark_grey}
                  orientation="horizontal"
                />
              </ListItem>
              <ListItem>
                <Divider
                  width={5}
                  borderWidth={1}
                  borderColor={colors.dark_grey}
                  orientation="horizontal"
                />
              </ListItem>
              <ListItem>
                <Divider
                  width={2}
                  borderWidth={1}
                  borderColor={colors.dark_grey}
                  orientation="horizontal"
                />
              </ListItem>
            </List>
          </GridItem>
          {/* RULER ENDS */}

          <GridItem colStart={2} colEnd={8}>
            {filteredEvents?.map(eventData =>
              isTimeInRange(
                removeMinutes(eventData.from_time as string).toString(),
                removeMinutes(eventData.to_time as string).toString(),
                data.time
              ) ? (
                <Box position="relative" key={eventData.id}>
                  {boxPositions.map(boxPosition => (
                    <CalendarAppointmentBox
                      key={boxPosition + eventData.id}
                      eventData={eventData}
                      handleEdit={handleEdit}
                      handleDeleteModal={handleDeleteModal}
                      leftPosition={boxPosition}
                      time={data.time}
                    />
                  ))}
                </Box>
              ) : (
                // TODO: border color too dark
                // TODO: This box is similar to calendarAppointmentBox
                // TODO: make a component for CalendarNoAppointmentBox
                <Box position="relative" key={eventData.id}>
                  {/* <CalendarNoAppointmentBox key={eventData.id} uniqueId={eventData.id!}/> */}
                  <Box
                    style={{ ...boxStyle, left: `${0 * 25}%` }}
                    key={Math.random() + new Date().getTime()}
                  />
                  <Box
                    style={{ ...boxStyle, left: `${1 * 25}%` }}
                    key={Math.random() + new Date().getTime()}
                  />
                  <Box
                    style={{ ...boxStyle, left: `${2 * 25}%` }}
                    key={Math.random() + new Date().getTime()}
                  />
                  <Box
                    style={{ ...boxStyle, left: `${3 * 25}%` }}
                    key={Math.random() + new Date().getTime()}
                  />
                </Box>
              )
            )}
          </GridItem>
        </Grid>
      ))}

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
