import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { images } from "@nepMeds/assets/images";
import { svgs } from "@nepMeds/assets/svgs";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useProfileData } from "@nepMeds/context/index";
import { useGetAddedPaymentMethods } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { appendServerUrl } from "@nepMeds/utils/getImageUrl";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import usePaymentForm from "../usePaymentForm";
import PaymentCard from "./PaymentCard";

const PaymentSet = () => {
  const profileData = useProfileData();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: addedPaymentMethods, isLoading: getIsLoading } =
    useGetAddedPaymentMethods(profileData?.data?.doctor?.id.toString() ?? "");
  const {
    formMethods: {
      reset,
      handleSubmit,
      register,
      control,
      getValues,
      setValue,
      formState,
      trigger,
    },
    isLoading,
    handleEditPayment,
    handleSubmitPayment,
    setPaymentValue,
    handleDeteltePayment,
  } = usePaymentForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDetailModalClose = () => {
    onClose();
    setTabIndex(0);
    setIsEditing(false);
    reset({});
  };

  useEffect(() => {
    if (addedPaymentMethods && !getIsLoading && isOpen) {
      setPaymentValue(addedPaymentMethods[0]);
    }
  }, [addedPaymentMethods, isOpen]);

  return (
    <Box bg={colors.white}>
      {!profileData?.data?.doctor?.set_payment_status ? (
        <Box
          h={"84vh"}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <VStack>
            <svgs.InCompletePayment />
            <Heading color={colors.red}>Payment hasn’t been added</Heading>
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
                Add Payment
              </Button>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Box h={"80vh"} bg={colors.white}>
          <Flex justifyContent={"end"}>
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
              Add Payment
            </Button>
          </Flex>
          {addedPaymentMethods &&
            addedPaymentMethods[0]?.doctor_amount?.map(x => {
              return (
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={6}
                  mt={12}
                  key={x.id}
                >
                  <GridItem>
                    <PaymentCard
                      name={x.payment_detail.name}
                      image={
                        appendServerUrl(x.payment_detail.image ?? "") ??
                        images.esewa
                      }
                      onClickEdit={() => {
                        setTabIndex(x.payment_mode - 1);
                        setIsEditing(true);
                        onOpen();
                      }}
                      onClickDelete={() => {
                        handleDeteltePayment(x.id.toString());
                      }}
                    />
                  </GridItem>
                </Grid>
              );
            })}
          {addedPaymentMethods &&
            addedPaymentMethods[0]?.doctor_amount?.length < 1 && (
              <Text align={"center"}>No Payment Methods Found!</Text>
            )}
        </Box>
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={onDetailModalClose}
        size={"md"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Choose Your Rate</Text>
          </HStack>
        }
        footer={
          <HStack w={"full"} justifyContent={"space-around"}>
            <Button
              outlineColor={"#13ADE1"}
              borderRadius={"12px"}
              color={colors.primary}
              bg={colors.white}
              w={"150px"}
              onClick={onDetailModalClose}
            >
              Cancel
            </Button>
            <Button
              borderRadius={"12px"}
              bg={colors.primary}
              color={colors.white}
              w={"150px"}
              type="submit"
              onClick={async () => {
                const isValid = await trigger();
                if (!isValid) return;
                handleSubmit(
                  isEditing
                    ? value =>
                        handleEditPayment({
                          value,
                          id: profileData?.data?.doctor?.id?.toString() ?? "",
                          onSuccess: onDetailModalClose,
                        })
                    : handleSubmitPayment
                )().then(() => onDetailModalClose());
              }}
              mr={1}
              variant={"solid"}
              h={"45px"}
              isLoading={isLoading}
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
                register={register}
                type="number"
                required
                rules={{
                  required: "Please Enter the Instant rate",
                }}
                error={formState?.errors?.instant_amount?.message}
              />
              <FloatingLabelInput
                label="Schedule Rate"
                name="schedule_amount"
                type="number"
                register={register}
                required
                rules={{
                  required: "Please Enter Schedule rate",
                }}
                error={formState?.errors.schedule_amount?.message}
              />
              <Text>Choose Your Payment Method</Text>
            </Stack>
            <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
              <Grid
                display={"flex"}
                templateColumns="repeat(5, 1fr)"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <GridItem>
                  <TabList shadow={"sm"} p={4} pb={0}>
                    <Tab value={1}>
                      <HStack>
                        {" "}
                        <Image src={images.esewa} h={"30px"} w={"30px"} />
                        <Text>ESewa</Text>
                      </HStack>
                    </Tab>
                    <Tab value={2}>
                      <HStack>
                        {" "}
                        <Image src={images.khalti} h={"30px"} w={"30px"} />
                        <Text>Khalti</Text>
                      </HStack>
                    </Tab>
                    <Tab value={3}>
                      <HStack>
                        {" "}
                        <Image src={images.bank} h={"30px"} w={"30px"} />
                        <Text>Bank</Text>
                      </HStack>
                    </Tab>
                  </TabList>
                </GridItem>
              </Grid>

              <TabPanels>
                <TabPanel w={"full"} px={0}>
                  {tabIndex === 0 && (
                    <>
                      <FloatingLabelInput
                        label="Esewa Id"
                        name="doctor_amount.0.epayment_id"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter ESewa Id",
                        }}
                        error={
                          formState?.errors?.doctor_amount &&
                          formState?.errors?.doctor_amount[0]?.epayment_id
                            ?.message
                        }
                      />
                      <Controller
                        render={({ field: { value, ref, ...fieldValues } }) => (
                          <Checkbox
                            label="Set Primary Payment Method"
                            control={control}
                            {...fieldValues}
                            checked={value}
                            onChange={e => {
                              setValue(
                                `doctor_amount.0.is_primary_method`,
                                e.target.checked
                              );
                              getValues("doctor_amount.1") &&
                                setValue(
                                  `doctor_amount.1.is_primary_method`,
                                  false
                                );
                              getValues("doctor_amount.2") &&
                                setValue(
                                  `doctor_amount.2.is_primary_method`,
                                  false
                                );
                            }}
                          />
                        )}
                        name={`doctor_amount.0.is_primary_method`}
                        control={control}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel w={"full"} px={0}>
                  {tabIndex === 1 && (
                    <>
                      <FloatingLabelInput
                        label="Khalti ID"
                        name="doctor_amount.1.epayment_id"
                        register={register}
                        required
                        type="number"
                        rules={{
                          required: "Please Enter Khalti Id",
                        }}
                        error={
                          formState?.errors?.doctor_amount &&
                          formState?.errors?.doctor_amount[1]?.epayment_id
                            ?.message
                        }
                      />
                      <Controller
                        render={({ field: { value, ref, ...fieldValues } }) => (
                          <Checkbox
                            label="Set Primary Payment Method"
                            control={control}
                            {...fieldValues}
                            checked={value}
                            onChange={e => {
                              setValue(
                                `doctor_amount.1.is_primary_method`,
                                e.target.checked
                              );
                              getValues("doctor_amount.0") &&
                                setValue(
                                  `doctor_amount.0.is_primary_method`,
                                  false
                                );
                              getValues("doctor_amount.2") &&
                                setValue(
                                  `doctor_amount.2.is_primary_method`,
                                  false
                                );
                            }}
                          />
                        )}
                        name="doctor_amount.1.is_primary_method"
                        control={control}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel w={"full"} px={0}>
                  {tabIndex === 2 && (
                    <VStack spacing={5}>
                      <FloatingLabelInput
                        label="Bank Name"
                        name="doctor_amount.2.bank_name"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Bank Name",
                        }}
                      />
                      <FloatingLabelInput
                        label="Account No."
                        name="doctor_amount.2.account_number"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Account Number",
                        }}
                      />
                      <FloatingLabelInput
                        label="Account Holder Name"
                        name="doctor_amount.2.account_holder_name"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Account Holder Name",
                        }}
                      />
                      <FloatingLabelInput
                        label="Branch Name"
                        name="doctor_amount.2.branch_name"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Branch Name",
                        }}
                      />
                      <Controller
                        render={({ field: { value, ref, ...fieldValues } }) => (
                          <Checkbox
                            label="Set Primary Payment Method"
                            control={control}
                            {...fieldValues}
                            checked={value}
                            onChange={e => {
                              setValue(
                                `doctor_amount.2.is_primary_method`,
                                e.target.checked
                              );
                              getValues("doctor_amount.1") &&
                                setValue(
                                  `doctor_amount.1.is_primary_method`,
                                  false
                                );
                              getValues("doctor_amount.0") &&
                                setValue(
                                  `doctor_amount.0.is_primary_method`,
                                  false
                                );
                            }}
                          />
                        )}
                        name="doctor_amount.2.is_primary_method"
                        control={control}
                      />
                    </VStack>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </form>
        </VStack>
      </ModalComponent>
    </Box>
  );
};

export default PaymentSet;
