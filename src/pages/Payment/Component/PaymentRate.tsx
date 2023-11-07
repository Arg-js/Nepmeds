import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { svgs } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";
import { paymentRateColumn } from "@nepMeds/components/DataTable/Columns";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
// import { useDebounce } from '@nepMeds/hooks/useDebounce';
import CenterLoader from "@nepMeds/components/Common/Loader";
import PaymentAmountBox from "@nepMeds/components/Payment/PaymentRateBox";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useGetAmountList } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import useAmountForm from "../useAmountForm";

const PaymentRate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setSearchFilter] = useState("");
  const { data, isSuccess, isLoading } = useGetAmountList();
  const amountList = data?.results;
  // const debouncedInputValue = useDebounce(searchFilter, 500);

  const {
    formMethods: { formState, trigger, getValues, register, reset },
    handleSubmitAmount,
    handleEditPayment,
    loading,
  } = useAmountForm();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleFormSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = amountList?.find(
      e => e.rate_status === STATUSTYPE.pending.toString()
    );

    data
      ? handleEditPayment(getValues(), data?.id?.toString(), closeAmountModal)
      : handleSubmitAmount({
          value: getValues(),
          closeModal: closeAmountModal,
        });
  };

  const closeAmountModal = () => {
    onClose();
    reset();
  };

  const onOpenModal = () => {
    onOpen();
    const data = amountList?.find(
      e => e.rate_status === STATUSTYPE.pending.toString()
    );
    if (data) {
      reset({
        instant_amount: data?.instant_amount,
        schedule_amount: data?.schedule_amount,
      });
    }
  };

  if (isLoading) return <CenterLoader />;
  return (
    <div>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={closeAmountModal}
          size={"md"}
          heading={
            <HStack>
              <svgs.logo_small />

              <Text>Choose Your Rate</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"space-around"}>
              <Button flex={1} variant={"reset"} onClick={closeAmountModal}>
                Cancel
              </Button>
              <Button
                flex={1}
                type="submit"
                onClick={handleFormSubmit}
                isLoading={loading}
              >
                Done
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <form style={{ width: "96%", marginTop: "10px" }}>
              <Stack gap={2} bg={colors.white} w={"100%"}>
                <FloatingLabelInput
                  label="Instant Rate"
                  name="instant_amount"
                  placeholder="Enter the Instant rate"
                  type="number"
                  required
                  register={register}
                  rules={{
                    required: "Please Enter the Instant rate",
                  }}
                  error={formState?.errors?.instant_amount?.message}
                />
                <FloatingLabelInput
                  label="Schedule Rate"
                  name="schedule_amount"
                  placeholder="Enter the Schedule rate"
                  type="number"
                  required
                  register={register}
                  rules={{
                    required: "Please Enter Schedule rate",
                  }}
                  error={formState?.errors?.schedule_amount?.message}
                />
              </Stack>
            </form>
          </VStack>
        </ModalComponent>
      )}

      {amountList && amountList?.length < 1 ? (
        <Box
          h={"84vh"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <VStack>
            <svgs.InCompletePayment />
            <Heading color={colors.red}>Rate hasn’t been added</Heading>
            <Text>You can get started by clicking the Add button.</Text>
            <VStack>
              <Button
                bg={colors.primary}
                color={colors.white}
                w={"200px"}
                mt={5}
                h={"45px"}
                sx={{
                  "&:hover": { bg: colors.primary },
                }}
                onClick={onOpen}
              >
                Add Rate
              </Button>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Box>
          <Flex gap={5} my={3}>
            <PaymentAmountBox
              isPending={false}
              data={amountList?.find(e => e.is_active_amount)}
            />
            <PaymentAmountBox
              isPending={true}
              data={amountList?.find(
                e => e.rate_status === STATUSTYPE.pending.toString()
              )}
              onOpen={onOpenModal}
            />
          </Flex>
          <HStack justifyContent="space-between">
            <Text fontWeight="medium">Rate History</Text>
            <HStack>
              <InputGroup borderColor={colors.grey_dark}>
                <InputLeftElement pointerEvents="none" h={10}>
                  <SearchIcon color={colors.grey_dark} boxSize={6} />
                </InputLeftElement>
                <Input
                  w={60}
                  h={10}
                  onChange={({ target: { value } }) => {
                    setSearchFilter(value);
                    setPagination({ pageIndex: 0, pageSize });
                  }}
                  // TODO: MAKE this left and add gap
                  textAlign={"center"}
                  placeholder={"Search"}
                />
              </InputGroup>
            </HStack>
          </HStack>

          {isSuccess && (
            <DataTable
              columns={paymentRateColumn({ pageIndex, pageSize })}
              data={amountList ?? []}
              pagination={{
                manual: true,
                pageParams: { pageIndex, pageSize },
                // pageCount: data?.page_count,
                pageCount: 0,
                onChangePagination: setPagination,
              }}
            />
          )}
        </Box>
      )}
    </div>
  );
};

export default PaymentRate;
