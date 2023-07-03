import {
  Box,
  Divider,
  Grid,
  GridItem,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import {
  addOneHour,
  getMinutes,
  getMinutesDifference,
  isTimeInRange,
} from "@nepMeds/helper/checkTimeRange";
import { useDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { parseISO, isSameDay } from "date-fns";

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
    } else if (event.frequency_choice === "Weekends") {
      const isSaturday = parseISO(selectedFullDate).getDay() === 6;
      return isSaturday;
    } else if (event.frequency_choice === "Everyday") {
      return true;
    } else if (event.frequency_choice === "Weekdays") {
      const isWeekday =
        parseISO(selectedFullDate).getDay() >= 1 &&
        parseISO(selectedFullDate).getDay() <= 5;
      return isWeekday;
    }

    return false;
  });
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
