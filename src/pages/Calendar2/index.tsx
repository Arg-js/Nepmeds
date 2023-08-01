import { Grid, GridItem, Box } from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import React, { useState } from "react";
// TODO: manage this route
import CalendarDailyDetailView from "./Component/CalendarDailyView";
import Calendar from "react-calendar";
import { format } from "date-fns";
import {
  formatToDateMonth,
  formatToDayOfWeek,
} from "@nepMeds/helper/dateTImeConverter";
import { Value } from "react-calendar/dist/cjs/shared/types";

const Calendar2: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");

  const handleCalendarChange = (value: Value) => {
    setDate(value as Date);
  };

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

export default Calendar2;
