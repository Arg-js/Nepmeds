import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { CustomButton } from "@nepMeds/components/Button/Button";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import ScheduleComponent from "@nepMeds/components/Schedule";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";

import {
  IGetDoctorAvailability,
  useCreateDoctorAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import {
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDay,
  isToday,
  startOfMonth,
  // setDate,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useRef, useState } from "react";
import Calendar from "react-calendar";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import {
  IoCalendar,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import "../../assets/styles/fontFamily.css";
import "@nepMeds/assets/styles/reactCalender.css";
import { AddEvent } from "./Component/AddEvent";
import { Value } from "react-calendar/dist/cjs/shared/types";

const CalendarView = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM");
  const dayOfWeek = format(currentDate, "EEEE");

  const [selectedBox, setSelectedBox] = useState<number>(getDay(currentDate));
  const [selectedDay, setSelectedDay] = useState(dayOfWeek);
  const [selectedFullDate, setSelectedFullDate] = useState(
    format(currentDate, "yyyy-MM-dd")
  );

  const [selectedDate, setSelectedDate] = useState(formattedDate);

  const handleDateSelection = (
    date: string,
    day: string,
    fullDate: string,
    index: number
  ) => {
    setSelectedDate(date);
    setSelectedBox(index);
    setSelectedDay(day);
    setSelectedFullDate(fullDate);
  };

  return (
    <Grid templateColumns="repeat(5, 14%)" gap={0}>
      <GridItem colSpan={2} bg="#F2FBFE">
        <CalenderWeekView
          handleDateSelection={handleDateSelection}
          selectedBox={selectedBox}
          setSelectedBox={setSelectedBox}
          selectedDay={selectedDay}
        />
      </GridItem>
      <GridItem colStart={3} colEnd={8} bg="#fff">
        <CalendarDailyDetailView
          selectedDay={selectedDay}
          selectedFullDate={selectedFullDate}
          selectedDate={selectedDate}
        />
      </GridItem>
    </Grid>
  );
};

export default CalendarView;

const CalenderWeekView = ({
  handleDateSelection,
  selectedBox,
  setSelectedBox,
}: {
  handleDateSelection: (
    date: string,
    day: string,
    fullDate: string,
    i: number
  ) => void;
  selectedBox: number;
  setSelectedBox: (box: number) => void;
  selectedDay: string;
}) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef(null);
  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };
  useOutsideClick({
    ref: ref,
    handler: () => setShowCalendar(false),
  });
  const handleCalendarChange = (value: Value) => {
    const date = new Date(value as Date);
    setDate(date);
    setShowCalendar(false);
    setSelectedBox(getDay(date));
  };
  const startOfWeekDate = startOfWeek(date);
  const endOfWeekDate = endOfWeek(date);

  // October 2022 (Note: Month is zero-based)

  const handleNextMonth = () => {
    const nextMonth = addMonths(date, 1);
    const firstDayOfNextMonth = startOfMonth(nextMonth);
    // Set the state to the first day of the next month
    setDate(firstDayOfNextMonth);
  };

  const handlePreviousMonth = () => {
    setDate(prevMonth => subMonths(prevMonth, 1));
  };
  const weekDates = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  });

  const CalenderWeeklyDatas = weekDates.map(date => ({
    day: format(date, "EEEE"),
    date: format(date, "do MMMM"),
    fullDate: format(date, "yyyy-MM-dd"),
    year: format(date, "yyyy"),
    isToday: isToday(date),
  }));

  return (
    <Box m={5} className="inter-font-family">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <IoChevronBackCircleOutline
          fontSize={"25px"}
          color={colors.grey_dark}
          cursor={"pointer"}
          onClick={handlePreviousMonth}
        />
        <Text fontSize={"md"} lineHeight={"22px"} fontWeight={600}>
          {format(date, "MMMM yyyy")}
        </Text>
        <IoChevronForwardCircleOutline
          fontSize={"25px"}
          color={colors.grey_dark}
          cursor={"pointer"}
          onClick={handleNextMonth}
        />
      </Box>
      <Box
        display={"flex"}
        alignItems={"baseline"}
        position="relative"
        justifyContent={"space-between"}
        mt={3}
      >
        <Box display={"flex"} alignItems={"baseline"}>
          <Text fontSize={"2xl"} color={colors.grey_dark} fontWeight={"400"}>
            This{" "}
          </Text>
          <Text fontSize={"35px"} ml={2} fontWeight={600} color={"#333333"}>
            Week
          </Text>
        </Box>{" "}
        <IoCalendar
          onClick={handleIconClick}
          color={colors.green_light}
          fontSize={20}
          cursor={"pointer"}
        />
        <Box position={"absolute"} top={12} width={300} ref={ref}>
          {showCalendar && (
            <Calendar
              onChange={value => handleCalendarChange(value)}
              value={date}
            />
          )}
        </Box>
      </Box>
      {CalenderWeeklyDatas?.map((data, i) =>
        selectedBox === i ? (
          <Box
            key={data.fullDate}
            p={"18px"}
            mr={-5}
            mt={3}
            bg={selectedBox === i ? colors.white : "transparent"}
            cursor={"pointer"}
            onClick={() =>
              handleDateSelection(data.date, data.day, data.fullDate, i)
            }
          >
            <Box display={"flex"} alignItems={"center"}>
              <Box
                bg={colors?.green_light}
                borderRadius={"4px"}
                p={"4px 8px"}
                height={"30px"}
              >
                <Text
                  fontSize={"sm"}
                  fontWeight={400}
                  lineHeight={"20px"}
                  color={colors.white}
                >
                  {data.isToday ? "Today" : "Selected"}
                </Text>
              </Box>

              <Text
                ml={3}
                fontSize={"28px"}
                fontWeight={500}
                lineHeight={"39px"}
                color={colors.dark}
              >
                {data.day}
              </Text>
            </Box>
            <Box
              display={"flex"}
              alignItems={"baseline"}
              mt={2}
              fontSize={"lg"}
              fontWeight={400}
              lineHeight={"25px"}
              color={colors.grey_dark}
            >
              {data.date},{" "}
              <Text
                lineHeight={"20px"}
                fontSize={"md"}
                fontWeight={700}
                color={colors?.main}
                ml={1}
              >
                {data.year}
              </Text>
            </Box>
          </Box>
        ) : (
          <Box
            key={data.fullDate}
            display={"flex"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Box
              key={i}
              p={"18px"}
              pr={"0px"}
              bg={selectedBox === i ? colors.white : "transparent"}
              cursor={"pointer"}
              onClick={() =>
                handleDateSelection(data.date, data.day, data.fullDate, i)
              }
              alignSelf={"flex-start"}
            >
              <Box>
                <Text fontSize={"28px"} lineHeight={"39px"} fontWeight={500}>
                  {data.day}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"baseline"}
                mt={2}
                fontSize={"lg"}
                fontWeight={400}
                lineHeight={"24px"}
                color={colors.grey_dark}
              >
                {data.date},{" "}
                <Text
                  lineHeight={"16px"}
                  fontWeight={700}
                  color={colors?.main}
                  ml={1}
                >
                  {data.year}
                </Text>
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

const CalendarDailyDetailView = ({
  selectedDate,
  selectedDay,
  selectedFullDate,
}: {
  selectedDate: string;
  selectedDay: string;
  selectedFullDate: string;
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
  const createDoctorAvailabilityInfo = useCreateDoctorAvailability();

  const onSubmit = async (data: IGetDoctorAvailability) => {
    try {
      await createDoctorAvailabilityInfo.mutateAsync(data);
      toastSuccess("Availability has been added successfully");
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
            <Text>Add Availability</Text>
          </HStack>
        }
        footer={
          <HStack w="100%" gap={3}>
            <Button variant="outline" onClick={onAddEventClose} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={formMethods.handleSubmit(onSubmit)}
              isLoading={createDoctorAvailabilityInfo.isLoading}
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
              <AddEvent selectedFullDate={selectedFullDate} />
            </form>
          </FormProvider>
        </VStack>
      </ModalComponent>
      <Box
        p={5}
        height={900}
        overflowY={"scroll"}
        css={{
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "0.2rem",
            height: "0.6rem",
            position: "absolute",
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            background: "#fff",
            opacity: 0.1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#e9d8fd",
            borderRadius: 20,
          },
        }}
        className="inter-font-family"
      >
        <Box display={"flex"} justifyContent={"space-between"}>
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
              ml={1}
            >
              {" "}
              {selectedDay}
            </Text>
          </Box>
          <Box onClick={onAddEventOpen} width="130px">
            <CustomButton backgroundColor={colors.primary}>
              <AiOutlinePlus />
              <Text>Add Availability</Text>
            </CustomButton>
          </Box>
        </Box>
        <Box mt={5}>
          <ScheduleComponent selectedFullDate={selectedFullDate} />
        </Box>
      </Box>
    </>
  );
};
