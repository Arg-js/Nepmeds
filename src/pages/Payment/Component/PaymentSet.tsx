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
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useProfileData } from "@nepMeds/context/index";
import {
  IPaymentMethod,
  useCreatePaymentMethods,
} from "@nepMeds/service/nepmeds-payment";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PaymentCard from "./PaymentCard";

const paymentDetail = [
  {
    id: 1,
    name: "Esewa",
    image: images.esewa,
  },
  {
    id: 2,
    name: "Khalti",
    image: images.khalti,
  },
  {
    id: 3,
    name: "Bank",
    image: images.bank,
  },
];

const PaymentSet = () => {
  const profileData = useProfileData();
  const [tabIndex, settabIndex] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IPaymentMethod>();
  const paymentMethods = useCreatePaymentMethods();

  const onDetailModalClose = () => {
    onClose();
    settabIndex(0);
    reset({});
  };

  const handleSubmitPayment = (value: IPaymentMethod) => {
    const val = value.doctor_amount.map((e, index) => {
      return { ...e, payment_mode: index + 1 };
    });
    paymentMethods.mutate(
      { ...value, doctor_amount: val },
      {
        onSuccess: () => {
          toastSuccess("Payment details added scuccessfully");
          profileData?.dataRefetch();
          onDetailModalClose();
        },
        onError: error => {
          const err = serverErrorResponse(error);
          toastFail(err);
        },
      }
    );
  };
  const triggerSubmit = () => {
    handleSubmit(handleSubmitPayment)();
  };

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
          <Flex justifyContent={"end"}></Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={12}>
            {paymentDetail.map((x, i) => {
              return (
                <GridItem key={x.id}>
                  <PaymentCard
                    name={x.name}
                    image={x.image}
                    onClickEdit={() => {
                      settabIndex(i);
                      onOpen();
                    }}
                    onClickView={() => {
                      onOpen();
                    }}
                  />
                </GridItem>
              );
            })}
          </Grid>
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
              onClick={triggerSubmit}
              mr={1}
              variant={"solid"}
              h={"45px"}
              isLoading={paymentMethods.isLoading}
            >
              Done
            </Button>
          </HStack>
        }
      >
        <VStack h={"auto"}>
          <form
            onSubmit={handleSubmit(handleSubmitPayment)}
            style={{ width: "96%", marginTop: "10px" }}
          >
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
                error={errors?.instant_amount?.message}
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
                error={errors.schedule_amount?.message}
              />
              <Text>Choose Your Payment Method</Text>
            </Stack>
            <Tabs onChange={index => settabIndex(index)} index={tabIndex}>
              <Grid
                display={"flex"}
                templateColumns="repeat(5, 1fr)"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <GridItem>
                  <TabList shadow={"sm"} p={4} pb={0}>
                    <Tab>
                      <HStack>
                        {" "}
                        <Image src={images.esewa} h={"30px"} w={"30px"} />
                        <Text>ESewa</Text>
                      </HStack>
                    </Tab>
                    <Tab>
                      <HStack>
                        {" "}
                        <Image src={images.khalti} h={"30px"} w={"30px"} />
                        <Text>Khalti</Text>
                      </HStack>
                    </Tab>
                    <Tab>
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
                          required: "Please Enter Esewa Id",
                        }}
                        error={
                          errors?.doctor_amount &&
                          errors?.doctor_amount[0]?.epayment_id?.message
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
                        rules={{
                          required: "Please Enter Khalti Id",
                        }}
                        error={
                          errors?.doctor_amount &&
                          errors?.doctor_amount[1]?.epayment_id?.message
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
                        name="doctor_amount.2.bank_account_number"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Account Number",
                        }}
                      />
                      <FloatingLabelInput
                        label="Account Holder Name"
                        name="doctor_amount.2.bank_account_name"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Account Holder Name",
                        }}
                      />
                      <FloatingLabelInput
                        label="Branch Name"
                        name="doctor_amount.2.bank_branch_name"
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
