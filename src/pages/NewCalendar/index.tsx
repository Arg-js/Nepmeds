import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useProfileData } from "@nepMeds/context/index";
import {
  formatToDateMonth,
  formatToDayOfWeek,
} from "@nepMeds/helper/dateTImeConverter";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { colors } from "@nepMeds/theme/colors";
import { format } from "date-fns";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { useNavigate } from "react-router-dom";
import CalendarDailyDetailView from "./Component/CalendarDailyView";

const NewCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");
  const profileData = useProfileData();
  const navigate = useNavigate();

  const handleCalendarChange = (value: Value) => {
    setDate(value as Date);
  };

  if (!profileData?.data?.doctor?.set_payment_status) {
    return (
      <Flex
        width={"99%"}
        bg={colors.dimmed_red}
        h={"70px"}
        // alignItems={"start"}
        borderRadius={"16px"}
        p={"10px"}
        m={"10px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text color={colors.red} fontSize={"md"} justifyContent={"center"}>
          Congratulations on the successful verification of your profile! To
          fully utilize our platform`s functionality, please set an estimated
          charge for appointments by{" "}
          <Button
            variant={"unstyled"}
            onClick={() => {
              navigate(NAVIGATION_ROUTES.PAYMENTS);
            }}
          >
            Clicking here
          </Button>
        </Text>
      </Flex>
    );
  }

  return (
    <Box m={6}>
      <Grid templateColumns={"repeat(5,14%)"} gap={0} bg={colors.blue_10}>
        <GridItem colSpan={2} justifySelf={"center"}>
          <Calendar
            onChange={value => handleCalendarChange(value)}
            value={date}
          />
        </GridItem>
        <GridItem colStart={3} colEnd={8} bg={colors.white}>
          <CalendarDailyDetailView
            selectedDate={formatToDateMonth(formattedDate)}
            selectedDay={formatToDayOfWeek(formattedDate)}
            selectedFullDate={formattedDate}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NewCalendar;
