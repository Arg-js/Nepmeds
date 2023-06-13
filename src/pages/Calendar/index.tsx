import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { colors } from "@nepMeds/theme/colors";
import "../../assets/styles/fontFamily.css";
import ScheduleComponent from "@nepMeds/components/Schedule";
import { CustomButton } from "@nepMeds/components/Button/Button";
import { AiOutlinePlus } from "react-icons/ai";

const Calendar = () => {
  return (
    <Grid templateColumns="repeat(5, 13%)" gap={0}>
      <GridItem colSpan={2} bg="#F2FBFE">
        <CalenderWeekView />
      </GridItem>
      <GridItem colStart={3} colEnd={8} bg="#fff">
        <CalendarDailyDetailView />
      </GridItem>
    </Grid>
  );
};

export default Calendar;

interface ICalenderWeeklyData {
  day: string;
  date: string;
  year: number;
  isToday: boolean;
}

const CalenderWeeklyDatas: ICalenderWeeklyData[] = [
  {
    day: "Sunday",
    date: "11th December",
    year: 2021,
    isToday: true,
  },
  {
    day: "Monday",
    date: "12th December",
    year: 2021,
    isToday: false,
  },
  {
    day: "Tuesday",
    date: "13th December",
    year: 2021,
    isToday: false,
  },
  {
    day: "Wednesday",
    date: "14th December",
    year: 2021,
    isToday: false,
  },
  {
    day: "Thursday",
    date: "15th December",
    year: 2021,
    isToday: false,
  },
  {
    day: "Friday",
    date: "16th December",
    year: 2021,
    isToday: false,
  },
];

const CalenderWeekView = () => {
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
        />
        <Text fontSize={"16px"} lineHeight={"22px"} fontWeight={600}>
          October 2022
        </Text>
        <IoChevronForwardCircleOutline
          fontSize={"25px"}
          color={colors.grey_dark}
          cursor={"pointer"}
        />
      </Box>
      <Box display={"flex"} mt={3} alignItems={"baseline"}>
        <Text fontSize={"32px"} color={colors.grey_dark} fontWeight={"400"}>
          This{" "}
        </Text>
        <Text fontSize={"48px"} ml={2} fontWeight={400} color={"#333333"}>
          Week
        </Text>
      </Box>

      {CalenderWeeklyDatas?.map((data, i) =>
        data.isToday ? (
          <Box
            key={i}
            p={"22px"}
            mr={-5}
            mt={3}
            bg={colors.white}
            cursor={"pointer"}
          >
            <Box display={"flex"} alignItems={"center"}>
              {data.isToday && (
                <Box bg={colors?.green_light} p={"4px 8px"}>
                  <Text
                    fontSize={"16px"}
                    fontWeight={400}
                    lineHeight={"20px"}
                    color={colors.white}
                  >
                    Today
                  </Text>
                </Box>
              )}
              <Text
                ml={3}
                fontSize={"32px"}
                lineHeight={"39px"}
                fontWeight={500}
              >
                {data.day}
              </Text>
            </Box>
            <Text
              display={"flex"}
              alignItems={"baseline"}
              mt={2}
              fontSize={"20px"}
              fontWeight={400}
              lineHeight={"24px"}
              color={colors.grey_dark}
            >
              {data.date},{" "}
              <Text lineHeight={"20px"} color={colors?.main} ml={1}>
                {data.year}
              </Text>
            </Text>
          </Box>
        ) : (
          <Box display={"flex"} justifyContent={"center"} cursor={"pointer"}>
            <Box
              key={i}
              p={"22px"}
              pr={"0px"}
              bg={"transparent"}
              alignSelf={"flex-start"}
            >
              <Box>
                <Text fontSize={"32px"} lineHeight={"39px"} fontWeight={500}>
                  {data.day}
                </Text>
              </Box>
              <Text
                display={"flex"}
                alignItems={"baseline"}
                mt={2}
                fontSize={"20px"}
                fontWeight={400}
                lineHeight={"24px"}
                color={colors.grey_dark}
              >
                {data.date},{" "}
                <Text lineHeight={"20px"} color={colors?.main} ml={1}>
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

const CalendarDailyDetailView = () => {
  return (
    <Box p={5} className="inter-font-family">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Text
          display={"flex"}
          alignItems={"baseline"}
          fontSize={"24px"}
          color={colors.grey_dark}
          lineHeight={"24px"}
        >
          10th,{" "}
          <Text
            fontSize={"40px"}
            color={colors.black}
            lineHeight={"49px"}
            ml={1}
          >
            {" "}
            Monday
          </Text>
        </Text>
        <Box width="130px">
          <CustomButton backgroundColor={colors.primary}>
            <AiOutlinePlus />
            <Text>Add Event</Text>
          </CustomButton>
        </Box>
      </Box>
      <Box mt={5}>
        <ScheduleComponent />
      </Box>
    </Box>
  );
};
