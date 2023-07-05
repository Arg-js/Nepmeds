import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IoCalendar,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { colors } from "@nepMeds/theme/colors";
import "../../assets/styles/fontFamily.css";
import ScheduleComponent from "@nepMeds/components/Schedule";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { svgs } from "@nepMeds/assets/svgs";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import { AppointmentType, FrequencyType } from "@nepMeds/utils/choices";
import {
  IGetDoctorAvailability,
  useCreateDoctorAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { AxiosError } from "axios";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useState } from "react";
import Calendar from "react-calendar";

const CalendarView = () => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "do MMMM");
  const dayOfWeek = format(currentDate, "EEEE");
  const [selectedBox, setSelectedBox] = useState<number>(getDay(currentDate));
  const [selectedDay, setSelectedDay] = useState(dayOfWeek);
  const [selectedFullDate, setSelectedFullDate] = useState("");

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
    <Grid templateColumns="repeat(5, 13%)" gap={0}>
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
  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };
  const handleCalendarChange = (value: any) => {
    const date = new Date(value);
    setDate(date);
    setShowCalendar(false);
    setSelectedBox(getDay(date));
  };
  const startOfWeekDate = startOfWeek(date);
  const endOfWeekDate = endOfWeek(date);

  // October 2022 (Note: Month is zero-based)

  const handleNextMonth = () => {
    setDate(prevMonth => addMonths(prevMonth, 1));
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
        <Text fontSize={"16px"} lineHeight={"22px"} fontWeight={600}>
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
          <Text fontSize={"24px"} color={colors.grey_dark} fontWeight={"400"}>
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
        <Box position={"absolute"} top={12} width={300}>
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
            key={i}
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
                  fontSize={"14px"}
                  fontWeight={400}
                  lineHeight={"20px"}
                  color={colors.white}
                >
                  {data.isToday ? "Today" : "Selected"}
                </Text>
              </Box>

              <Text
                ml={3}
                fontSize={"24px"}
                fontWeight={500}
                lineHeight={"39px"}
                color={colors.dark}
              >
                {data.day}
              </Text>
            </Box>
            <Text
              display={"flex"}
              alignItems={"baseline"}
              mt={2}
              fontSize={"18px"}
              fontWeight={400}
              lineHeight={"25px"}
              color={colors.grey_dark}
            >
              {data.date},{" "}
              <Text
                lineHeight={"20px"}
                fontSize={"16px"}
                fontWeight={700}
                color={colors?.main}
                ml={1}
              >
                {data.year}
              </Text>
            </Text>
          </Box>
        ) : (
          <Box display={"flex"} justifyContent={"center"} cursor={"pointer"}>
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
                <Text fontSize={"24px"} lineHeight={"39px"} fontWeight={500}>
                  {data.day}
                </Text>
              </Box>
              <Text
                display={"flex"}
                alignItems={"baseline"}
                mt={2}
                fontSize={"18px"}
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
              </Text>
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
  const {
    isOpen: isAddEventOpen,
    onClose: onAddEventClose,
    onOpen: onAddEventOpen,
  } = useDisclosure();

  const createDoctorAvailabilityInfo = useCreateDoctorAvailability();
  const formMethods = useForm();

  const onSaveEvent = () => {
    formMethods.handleSubmit(onSubmit)();
  };
  console.log(selectedDate);
  const onSubmit = async (data: IGetDoctorAvailability) => {
    try {
      const response = await createDoctorAvailabilityInfo.mutateAsync(data);
      if (response) {
        toastSuccess("Event has been added successfully");
        onAddEventClose();
      }
    } catch (error) {
      const err = error as AxiosError<{ errors: [0] }>;

      const errorObject = err?.response?.data?.errors?.[0];
      const firstErrorMessage = errorObject
        ? Object.values(errorObject)[0]
        : null;
      toastFail(firstErrorMessage?.toString() || "Failed to add event!");
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
            <Button variant="outline" onClick={onAddEventOpen} flex={1}>
              Discard
            </Button>
            <Button
              flex={1}
              onClick={onSaveEvent}
              background={colors.primary}
              color={colors.white}
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
      <Box p={5} height={900} overflow={"scroll"} className="inter-font-family">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text
            display={"flex"}
            alignItems={"baseline"}
            fontSize={"24px"}
            color={colors.grey_dark}
            lineHeight={"24px"}
          >
            {selectedDate},
            <Text
              fontSize={"30px"}
              color={colors.black}
              lineHeight={"49px"}
              ml={1}
            >
              &nbsp;
              {selectedDay}
            </Text>
          </Text>
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

const AddEvent = () => {
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<IGetDoctorAvailability>();

  const validateDateFormat = () => {
    const givenDate = getValues("from_time");
    const [hours, minutes] = givenDate ? givenDate.split(":") : ["", ""];
    const minutesNumber = parseInt(minutes);
    console.log(hours);
    // Check if minutes is a multiple of 5
    if (minutesNumber % 5 !== 0) {
      return "Minutes can be only multiple of 5"; // Disable the option
    }

    return true; // Enable the option
  };

  const validateToDateFormat = () => {
    const givenDate = getValues("to_time");
    const fromDate = getValues("from_time");
    const [hours, minutes] = givenDate ? givenDate.split(":") : ["", ""];
    const minutesNumber = parseInt(minutes);
    console.log(hours);
    // Check if minutes is a multiple of 5
    if (givenDate) {
      if (minutesNumber % 5 !== 0) {
        return "Minutes can be only multiple of 5"; // Disable the option
      }
      if (fromDate) {
        if (givenDate < fromDate) {
          return "To time cannot be less than from time";
        } else return true;
      }

      return true; // Enable the option
    }
  };
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
      <GridItem colSpan={4}>
        <Select
          label="Type"
          name="type"
          register={register}
          options={AppointmentType}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Appointment type is required.",
          }}
          error={errors.type?.message}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <FloatingLabelInput
          label="Title"
          name="title"
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Title is required.",
          }}
          error={errors.title?.message}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Select
          label=""
          name="frequency_choice"
          register={register}
          options={FrequencyType}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
        />
      </GridItem>
      {watch("frequency_choice") === "Weekday" && (
        <GridItem colSpan={4}>
          <FloatingLabelInput
            label="Date"
            name="date"
            type="date"
            register={register}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "Date is required.",
            }}
            error={errors.date?.message}
          />
        </GridItem>
      )}
      <GridItem colSpan={2}>
        <FloatingLabelInput
          label="From"
          name="from_time"
          type="time"
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "From time is required.",
            validate: validateDateFormat,
          }}
          error={errors.from_time?.message}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FloatingLabelInput
          label="To"
          name="to_time"
          type="time"
          register={register}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "To time is required.",
            validate: validateToDateFormat,
          }}
          error={errors.to_time?.message}
        />
      </GridItem>
    </Grid>
  );
};
