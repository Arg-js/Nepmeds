import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";
import SearchInput from "@nepMeds/components/Search";
import {
  useGetRescheduledAdmin,
  useGetRescheduledById,
} from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { svgs } from "@nepMeds/assets/svgs";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { rescheduledAdminColumn } from "./column";
import CenterLoader from "@nepMeds/components/Common/Loader";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import StatusBadge from "@nepMeds/components/Common/StatusBadge";
import BoxWrapper from "@nepMeds/components/Wrapper/BoxWrapper";

export type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const RescheduledList = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  const {
    isOpen: isViewOpen,
    onOpen: onViewModalOpen,
    onClose: onViewClose,
  } = useDisclosure();

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  // REACT QUERIES

  const { data, isLoading } = useGetRescheduledAdmin({
    page_no: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    search: debouncedInputValue,
  });

  const { data: detailData, isLoading: detailLoading } =
    useGetRescheduledById(appointmentId);

  // REACT QUERIES END

  const onModalClose = () => {
    setAppointmentId("");
    onViewClose();
  };

  return (
    <BoxWrapper>
      {/* View Modal */}
      {isViewOpen && (
        <ModalComponent
          size={"2xl"}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Detail View</Text>
            </HStack>
          }
          isOpen={isViewOpen}
          onClose={onModalClose}
          footer={<></>}
        >
          {detailLoading ? (
            <CenterLoader />
          ) : (
            <Box>
              <Flex justifyContent={"space-between"}>
                <Flex gap={3}>
                  <Text fontWeight={"bold"}>Doctor Name :</Text>
                  <Text>{detailData?.doctor}</Text>
                </Flex>
                <Flex gap={3}>
                  <Text fontWeight={"bold"}>Patient Name :</Text>
                  <Text>{detailData?.patient}</Text>
                </Flex>
              </Flex>

              <Divider my={3} />
              <Flex flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"}>
                  <Flex gap={3}>
                    <Text fontWeight={"bold"}>Appointment Date :</Text>
                    <Text>{detailData?.old_availability?.date}</Text>
                  </Flex>
                  <Flex gap={3}>
                    <Text fontWeight={"bold"}>Appointment Time :</Text>
                    <Text>{`${removeSeconds(
                      detailData?.old_availability?.from_time ?? ""
                    )} - ${removeSeconds(
                      detailData?.old_availability?.to_time ?? ""
                    )}`}</Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Flex gap={3}>
                    <Text fontWeight={"bold"}>Rescheduled Date :</Text>
                    <Text>
                      {detailData?.extra_data?.cancelled_availability?.date ??
                        detailData?.request_availability?.date}
                    </Text>
                  </Flex>
                  <Flex gap={3}>
                    <Text fontWeight={"bold"}>Rescheduled Time :</Text>
                    <Text>{`${removeSeconds(
                      (detailData?.extra_data?.cancelled_availability
                        ?.from_time ??
                        detailData?.request_availability?.from_time) as string
                    )} - ${removeSeconds(
                      (detailData?.extra_data?.cancelled_availability
                        ?.to_time ??
                        detailData?.request_availability?.to_time) as string
                    )}`}</Text>
                  </Flex>
                </Flex>
                <Flex gap={3}>
                  <Text fontWeight={"bold"}>Approved Status :</Text>
                  <StatusBadge
                    customProps={{
                      status: detailData?.status?.toString() ?? "",
                    }}
                  />
                </Flex>
                <Flex gap={3}>
                  <Text fontWeight={"bold"} width={"110px"}>
                    Patient Remarks :
                  </Text>
                  <Text>{detailData?.remarks}</Text>
                </Flex>
              </Flex>
            </Box>
          )}
        </ModalComponent>
      )}
      {/* View Modal ENDS */}

      <>
        {/* Table Header */}
        <Flex justifyContent={"flex-end"}>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPageParams}
          />
        </Flex>

        {/* Table Header Ends */}

        <DataTable
          data={data?.results ?? []}
          columns={rescheduledAdminColumn({
            pageParams,
            setAppointmentId,
            onModalOpen: onViewModalOpen,
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
    </BoxWrapper>
  );
};

export default RescheduledList;
