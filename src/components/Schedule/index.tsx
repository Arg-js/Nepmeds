import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";

import { colors } from "@nepMeds/theme/colors";
import {
  addOneHour,
  getMinutes,
  getMinutesDifference,
  isTimeInRange,
} from "@nepMeds/helper/checkTimeRange";
import {
  IGetDoctorAvailability,
  getSingleAvailability,
  useDeleteAvailability,
  useDoctorAvailability,
  useUpdateDoctorAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import { parseISO, isSameDay } from "date-fns";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ModalComponent from "../Form/ModalComponent";
import { AddEvent } from "@nepMeds/pages/Calendar";
import { toastFail, toastSuccess } from "../Toast";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { FormProvider, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useState } from "react";
const ScheduleComponent = ({
  selectedFullDate,
}: {
  selectedFullDate: string;
}) => {
  const availabilityData = useDoctorAvailability().data;

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

  const onSaveEvent = () => {
    formMethods.handleSubmit(onSubmit)();
    formMethods.reset();
  };

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
    try {
      const res = await getSingleAvailability(id);
      setDoctorAvailabilityData(res);
      setAvailabilityId(id);
    } catch (error) {
      const err = serverErrorResponse(error as AxiosError);
      toastFail(err);
    }
    onEditModalOpen();
  };

  const handleDeleteModal = (id: number) => {
    setAvailabilityId(id);
    onOpenDeleteModal();
  };
  const onDeleteSymptom = async () => {
    console.log(availabilityId);
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
      {timeData?.map((data, i) => (
        <Grid key={i} templateColumns="repeat(5, 13%)" gap={0}>
          <GridItem colSpan={1} mb={"30px"}>
            <List spacing={"30px"}>
              <ListItem fontSize={"12px"} color={colors.grey_dark}>
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
          <GridItem colStart={2} colEnd={8}>
            {filteredEvents?.map((eventData, i) =>
              isTimeInRange(
                data.time,
                addOneHour(data.time),
                eventData.from_time as string
              ) ? (
                <Box position="relative">
                  <Box
                    key={i}
                    mt={`calc(${getMinutes(
                      eventData.from_time as string
                    )} * 2.5px)`}
                    height={`calc(${getMinutesDifference(
                      eventData.from_time as string,
                      eventData.to_time as string
                    )} * 2.5px)`}
                    bg={"#FDECF0"}
                    border={`1px dashed  #F48F18`}
                    display={"flex"}
                    flexDirection={"column"}
                    position="absolute"
                    top={0}
                    width={"100%"}
                    left={0}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <>
                      <Text
                        fontWeight={600}
                        fontSize={"16px"}
                        lineHeight={"19px"}
                      >
                        {" "}
                        {eventData?.title}
                      </Text>
                      <Text
                        mt={2}
                        fontSize={"12px"}
                        lineHeight={"15px"}
                        color={colors.grey_dark}
                      >
                        {eventData.from_time}........{eventData.to_time}
                      </Text>
                    </>
                    <Box position={"absolute"} top={2} right={2}>
                      <EditIcon
                        color={colors.green_button}
                        cursor={"pointer"}
                        onClick={() => handleEdit(eventData.id ?? 0)}
                      />

                      <DeleteIcon
                        cursor={"pointer"}
                        color={colors?.red}
                        marginLeft={2}
                        onClick={() => handleDeleteModal(eventData.id ?? 0)}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box position="relative">
                  <Box
                    key={i}
                    //   mt={"calc(15 * 2.5px)"}
                    //   height={"calc(30 * 2.5px)"}
                    height={"150px"}
                    bg={"transparent"}
                    border={"none"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    position="absolute"
                    top={0}
                    width={"100:00%"}
                    left={0}
                  ></Box>
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
                onEditModalClose;
                formMethods.reset();
              }}
              flex={1}
            >
              Discard
            </Button>
            <Button
              flex={1}
              onClick={onSaveEvent}
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
              <AddEvent doctorAvailabilityData={doctorAvailabilityData} />
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

interface IcTimeData {
  time: string;
}

const timeData: IcTimeData[] = [
  {
    time: "1:00:00",
  },
  {
    time: "2:00:00",
  },
  {
    time: "3:00:00",
  },
  {
    time: "4:00:00",
  },
  {
    time: "5:00:00",
  },
  {
    time: "6:00:00",
  },
  {
    time: "7:00:00",
  },
  {
    time: "8:00:00",
  },
  {
    time: "9:00:00",
  },
  {
    time: "10:00:00",
  },
  {
    time: "11:00:00",
  },
  {
    time: "12:00:00",
  },
  {
    time: "13:00:00",
  },
  {
    time: "14:00:00",
  },
  {
    time: "15:00:00",
  },
  {
    time: "16:00:00",
  },
  {
    time: "17:00:00",
  },
  {
    time: "18:00:00",
  },
  {
    time: "19:00:00",
  },
  {
    time: "20:00:00",
  },
  {
    time: "21:00:00",
  },
  {
    time: "22:00:00",
  },
  {
    time: "23:00:00",
  },
  {
    time: "24:00:00",
  },
];
