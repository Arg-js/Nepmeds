import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
import { useNavigate } from "react-router-dom";
import CalendarDailyDetailView from "./Component/CalendarDailyView";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SearchInput from "@nepMeds/components/Search";
import { DataTable } from "@nepMeds/components/DataTable";
import { availabilityColumn } from "./Component/availabilityColumn";
import { useGetAvailabilityList } from "@nepMeds/service/nepmeds-doctor-availability";
import AvailabilityDetails from "./Component/AvailabilityDetails";
import { useDebounce } from "@nepMeds/hooks/useDebounce";

const NewCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");
  const profileData = useProfileData();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  const [activeTab, setActiveTab] = useState(0);
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useGetAvailabilityList({
    page_no: pageParams.pageIndex,
    page_size: pageParams.pageSize,
    index: activeTab,
    search: debouncedInputValue,
  });

  const detailModal = useDisclosure();
  const [dateRange, setDateRange] = useState({
    from_time: "",
    to_time: "",
    id: "",
  });

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
    <Box
      m={6}
      bg={colors.white}
      sx={{ borderTopLeftRadius: "12px" }}
      height={"85dvh"}
    >
      <AvailabilityDetails dateRange={dateRange} detailModal={detailModal} />

      <Tabs onChange={setActiveTab} index={activeTab}>
        <TabList>
          <Tab>Calendar</Tab>
          <Tab>Availability List</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {activeTab === 0 && (
              <Grid templateColumns={"repeat(6,1fr)"} gap={2}>
                <GridItem colSpan={1} m={2} backgroundColor={colors.blue_10}>
                  <Calendar
                    onChange={value => setDate(value as Date)}
                    value={date}
                  />
                </GridItem>
                <GridItem colSpan={5}>
                  <CalendarDailyDetailView
                    selectedDate={formatToDateMonth(formattedDate)}
                    selectedDay={formatToDayOfWeek(formattedDate)}
                    selectedFullDate={formattedDate}
                  />
                </GridItem>
              </Grid>
            )}
          </TabPanel>
          <TabPanel>
            {activeTab === 1 && (
              <WrapperBox
                style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}
              >
                <>
                  {/* Table Header */}
                  <Grid display={"flex"} justifyContent={"space-between"}>
                    <Text color={colors.blue_100} variant="tableHeading">
                      Availability List
                    </Text>
                    <SearchInput
                      setSearchValue={setSearchValue}
                      setPageParams={setPageParams}
                    />
                  </Grid>

                  {/* Table Header Ends */}

                  <DataTable
                    data={data?.results ?? []}
                    columns={availabilityColumn({
                      pageParams: { pageIndex: 0, pageSize: 1 },
                      onModalOpen: (data: {
                        from_time: string;
                        to_time: string;
                        id: string;
                      }) => {
                        setDateRange(data);
                        detailModal.onOpen();
                      },
                    })}
                    isLoading={isLoading}
                    pagination={{
                      manual: true,
                      pageParams,
                      pageCount: data?.page_count,
                      onChangePagination: setPageParams,
                    }}
                  />
                </>
              </WrapperBox>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NewCalendar;
