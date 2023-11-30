import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { colors } from "@nepMeds/theme/colors";
import { IoFunnelOutline } from "react-icons/io5";
import { svgs } from "@nepMeds/assets/svgs";
import { useState } from "react";
import { paymentColumnAdmin } from "./paymentColumn";
import {
  useDisbursePayment,
  useGetPaymentHistoryAdmin,
  useGetPaymentHistoryById,
} from "@nepMeds/service/nepmeds-payment";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import SearchInput from "@nepMeds/components/Search";
import TableWrapper from "@nepMeds/components/TableWrapper";

const AllPaymentAdmin = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onClose: onViewClose,
    onOpen: onViewOpen,
  } = useDisclosure();

  // React Query

  const { data: tableData, isFetching } = useGetPaymentHistoryAdmin({
    page_no: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
    search: debouncedInputValue,
  });

  const { data: historyData } = useGetPaymentHistoryById(id, isViewOpen);

  const { mutate, isLoading } = useDisbursePayment();
  // React Query Ends

  const onModalClose = () => {
    onClose();
    onViewClose();
    setId("");
  };

  const onToggleClick = (id: string) => {
    setId(id);
    onOpen();
  };

  const onDisburseClick = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        onModalClose();
      },
    });
  };

  const onViewClick = (id: string) => {
    setId(id);
    onViewOpen();
  };

  return (
    <TableWrapper>
      <>
        <Flex justifyContent={"flex-end"}>
          <HStack>
            <SearchInput
              setSearchValue={setSearchValue}
              setPageParams={setPagination}
            />

            <Button
              color={colors.grey_dark}
              bg={colors.white}
              outlineColor={colors.grey_dark}
              h={8}
            >
              <IoFunnelOutline pointerEvents={"none"} />
              &nbsp; Filter
            </Button>
          </HStack>
        </Flex>

        {/* Table Header Ends */}

        <DataTable
          columns={paymentColumnAdmin({
            pageParams: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            },
            onToggleClick,
            onView: onViewClick,
          })}
          data={tableData?.results ?? []}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: {
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            },
            pageCount: tableData?.page_count,
            onChangePagination: setPagination,
          }}
        />

        <ModalComponent
          size="sm"
          isOpen={isOpen}
          onClose={onClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Disbursal Confirmation</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={onModalClose}
                flex={1}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                variant={"primary"}
                onClick={() => onDisburseClick(id)}
                isLoading={isLoading}
              >
                Confirm
              </Button>
            </HStack>
          }
        >
          <Text textAlign={"center"}>
            Are you sure you want to change disbursal status for the payment?
          </Text>
        </ModalComponent>
        <ModalComponent
          size="lg"
          isOpen={isViewOpen}
          onClose={onViewClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Payment Details</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button
                variant={"primaryOutline"}
                onClick={onModalClose}
                flex={1}
              >
                Close
              </Button>
            </HStack>
          }
        >
          <Box>
            <Flex gap={3} mb={1}>
              <Flex gap={1} flexDirection={"column"}>
                <Text>Payment Id:</Text>
                <Text>Order Id:</Text>
              </Flex>
              <Flex gap={1} flexDirection={"column"}>
                <Text fontWeight={"bold"}>{historyData?.payment_id}</Text>
                <Text fontWeight={"bold"}>{historyData?.order_id}</Text>
              </Flex>
            </Flex>
            <Text>Appointment</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Appointment Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {historyData?.appointments?.map(item => (
                    <Tr key={item.id}>
                      <Td>{item.availability_time}</Td>
                      <Td>
                        {item.call_status}
                        <Badge
                          colorScheme={item.call_status ? "green" : "red"}
                          p={1}
                          borderRadius={20}
                          fontSize={11}
                          textAlign="center"
                        >
                          {item.call_status ? "Completed" : "Not Completed"}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </ModalComponent>
      </>
    </TableWrapper>
  );
};

export default AllPaymentAdmin;
