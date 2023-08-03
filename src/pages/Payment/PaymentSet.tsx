import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { svgs } from "@nepMeds/assets/svgs";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useProfileData } from "@nepMeds/context/index";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsThreeDotsVertical } from "react-icons/bs";
import Bank from "../../assets/images/bank-fill.png";
import Eswa from "../../assets/images/eswa.png";
import Khalti from "../../assets/images/khalti.png";

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
  } = useForm({
    defaultValues: {
      instant_rate: 0 || null,
      schedule_rate: 0 || null,
      eswaId: 0 || null,
      khaltiId: 0 || null,
      AccNo: 0 || null,
      bankName: "",
      branchName: "",
      Primary: false,
      accName: "",
    },
  });

  const handleSubmitPayment = () => {
    reset();
    onClose();
  };
  const triggerSubmit = () => {
    handleSubmit(handleSubmitPayment)();
  };
  const paymentDetail = [
    {
      id: 1,
      brandName: "Esewa",
      imageName: Eswa,
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
  return (
    <>
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
          onClose={onClose}
          size={"md"}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Add Payment</Text>
            </HStack>
          }
          footer={
            <HStack w={"full"} justifyContent={"space-between"}>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={colors.primary}
                w={"150px"}
                type="submit"
                onClick={triggerSubmit}
                mr={1}
              >
                ADD
              </Button>
              <Button
                outlineColor={"#13ADE1"}
                borderRadius={"12px"}
                color={"#13ADE1"}
                w={"150px"}
                onClick={onClose}
              >
                Cancel
              </Button>
            </HStack>
          }
        >
          <VStack h={"auto"}>
            <form onSubmit={handleSubmit(handleSubmitPayment)}>
              <Stack gap={2} bg={colors.white} w={"100%"}>
                <FloatingLabelInput
                  label=" Instant Rate"
                  name="instant_rate"
                  register={register}
                  required
                  rules={{
                    required: "Please Enter the Instant rate",
                  }}
                  error={errors?.instant_rate?.message}
                />
                <FloatingLabelInput
                  label="Schedule Rate"
                  name="schedule_rate"
                  register={register}
                  required
                  rules={{
                    required: "Please Enter Schedule rate",
                  }}
                  error={errors.schedule_rate?.message}
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
                    <TabList border="none" p={4}>
                      <Tab>
                        <HStack>
                          {" "}
                          <Image src={Eswa} h={"30px"} w={"30px"} />
                          <Text>ESWA</Text>
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
                  <TabPanel>
                    {tabIndexs === 0 && (
                      <FloatingLabelInput
                        label="Eswa Id"
                        name="eswaId"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Eswa Id",
                        }}
                        error={errors.eswaId?.message}
                      />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {tabIndexs === 1 && (
                      <FloatingLabelInput
                        label="Khalti ID"
                        name="khaltiId"
                        register={register}
                        required
                        rules={{
                          required: "Please Enter Khalti Id",
                        }}
                        error={errors.khaltiId?.message}
                      />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {tabIndexs === 2 && (
                      <VStack spacing={5}>
                        <FloatingLabelInput
                          label="Bank Name"
                          name="bankName"
                          register={register}
                          required
                          rules={{
                            required: "Please Enter Bank Name",
                          }}
                          error={errors.bankName?.message}
                        />
                        <FloatingLabelInput
                          label="Account No."
                          name="AccNo"
                          register={register}
                          required
                          rules={{
                            required: "Please Enter Account Number",
                          }}
                          error={errors.AccNo?.message}
                        />
                        <FloatingLabelInput
                          label="Account Holder Name"
                          name="accName"
                          register={register}
                          required
                          rules={{
                            required: "Please Enter Account Holder Name",
                          }}
                          error={errors.accName?.message}
                        />
                        <FloatingLabelInput
                          label="Branch Name"
                          name="branchName"
                          register={register}
                          required
                          rules={{
                            required: "Please Enter Branch Name",
                          }}
                          error={errors.branchName?.message}
                        />
                      </VStack>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Controller
                render={({ field: { value, ...fieldValues } }) => (
                  <Checkbox
                    label="Set Primary Payment Method"
                    control={control}
                    {...fieldValues}
                    checked={value}
                  />
                )}
                name="Primary"
                control={control}
              />
            </form>
          </VStack>
        </ModalComponent>
      </Box>
    </>
  );
};

export default PaymentSet;

const PaymentCard = ({
  brandName,
  imageName,
  onClickView,
  onClickEdit,
}: IPaymentCard) => {
  return (
    <>
      <Card
        boxShadow={"0px 4px 32px 0px rgba(61, 70, 112, 0.08)"}
        w={"440px"}
        h={"90px"}
        mb={"50px"}
      >
        <CardHeader
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          mt={"-40px"}
          bg={"#F4F4F4"}
          maxH={"70px"}
        >
          <Image src={imageName} h={"70px"} w={"70px"} mb={"-15%"} />
        </CardHeader>
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Text>{brandName}</Text>
            <Menu>
              <MenuButton as={Button} variant={"unstyled"}>
                <BsThreeDotsVertical />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    onClickView();
                  }}
                >
                  View
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickEdit();
                  }}
                >
                  Edit
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

interface IPaymentCard {
  brandName?: string;
  imageName?: string;
  onClickView: () => void;
  onClickEdit: () => void;
}

{
  /* <form>
<VStack gap={7.5} mb={12} bg={colors.white} w={"40%"}>
  <FloatingLabelInput
    label="Rate"
    name="rate"
    register={register}
  />
</VStack>
</form> */
}
