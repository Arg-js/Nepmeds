import {
  Box,
  Button,
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
// import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Bank from "@nepMeds/assets/images/bank-fill.png";
import Esewa from "@nepMeds/assets/images/esewa.png";
import Khalti from "@nepMeds/assets/images/khalti.png";
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
    brandName: "Esewa",
    imageName: Esewa,
  },
  {
    id: 2,
    brandName: "Khalti",
    imageName: Khalti,
  },
  {
    id: 3,
    brandName: "Bank",
    imageName: Bank,
  },
];

const PaymentSet = () => {
  const profileData = useProfileData();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabIndexs, setTabIndexs] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPaymentMethod>();
  const paymentMethods = useCreatePaymentMethods();

  const onDetailModalClose = () => {
    onClose();
    reset();
  };

  const handleSubmitPayment = (value: IPaymentMethod) => {
    // reset();
    // onClose();
    const val = value.doctor_amount.map((e, index) => {
      return { ...e, payment_mode: index + 1 };
    });
    paymentMethods.mutate(
      { ...value, doctor_amount: val },
      {
        onSuccess: () => {
          toastSuccess("come back");
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
          // bg={colors.white}
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
                  "&:hover": { bg: colors.primary, color: colors.white },
                }}
                onClick={onOpen}
              >
                Add Payment
              </Button>
            </VStack>
          </VStack>
        </Box>
      ) : (
        <Tabs onChange={index => setTabIndex(index)} index={tabIndex}>
          <Grid
            display={"flex"}
            templateColumns="repeat(5, 1fr)"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <GridItem>
              <TabList border="none" p={4}>
                <Tab>Payment Method</Tab>
                <Tab>Payment History</Tab>
              </TabList>
            </GridItem>
          </Grid>

          <TabPanels>
            <TabPanel>
              {tabIndex === 0 && (
                <Box h={"80vh"} bg={colors.white}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={"30px"}>
                    {paymentDetail.map(x => {
                      return (
                        <GridItem key={x.id}>
                          <PaymentCard
                            brandName={x.brandName}
                            imageName={x.imageName}
                            onClickEdit={() => {
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
            </TabPanel>
            <TabPanel>{tabIndex === 1 && <Text>world</Text>}</TabPanel>
          </TabPanels>
        </Tabs>
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
            >
              ADD
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
            <Tabs onChange={index => setTabIndexs(index)} index={tabIndexs}>
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
                        <Image src={Esewa} h={"30px"} w={"30px"} />
                        <Text>ESewa</Text>
                      </HStack>
                    </Tab>
                    <Tab>
                      <HStack>
                        {" "}
                        <Image src={Khalti} h={"30px"} w={"30px"} />
                        <Text>Khalti</Text>
                      </HStack>
                    </Tab>
                    <Tab>
                      <HStack>
                        {" "}
                        <Image src={Bank} h={"30px"} w={"30px"} />
                        <Text>Bank</Text>
                      </HStack>
                    </Tab>
                  </TabList>
                </GridItem>
              </Grid>

              <TabPanels>
                <TabPanel w={"full"} px={0}>
                  {tabIndexs === 0 && (
                    <>
                      <FloatingLabelInput
                        label="Esewa Id"
                        name="doctor_amount.0.epayment_id"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Esewa Id",
                        }}
                      />
                      <Controller
                        render={({ field: { value, ref, ...fieldValues } }) => (
                          <Checkbox
                            label="Set Primary Payment Method"
                            control={control}
                            {...fieldValues}
                            checked={value}
                          />
                        )}
                        name={`doctor_amount.0.is_primary_method`}
                        control={control}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel w={"full"} px={0}>
                  {tabIndexs === 1 && (
                    <>
                      <FloatingLabelInput
                        label="Khalti ID"
                        name="doctor_amount.1.epayment_id"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Khalti Id",
                        }}
                      />
                      <Controller
                        render={({ field: { value, ref, ...fieldValues } }) => (
                          <Checkbox
                            label="Set Primary Payment Method"
                            control={control}
                            {...fieldValues}
                            checked={value}
                          />
                        )}
                        name="doctor_amount.1.is_primary_method"
                        control={control}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel w={"full"} px={0}>
                  {tabIndexs === 2 && (
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
