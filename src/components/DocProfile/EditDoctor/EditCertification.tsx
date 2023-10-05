import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // MenuDivider,
  // Flex,
  Divider,
  Grid,
  // Grid,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NmcForm } from "@nepMeds/components/FormComponents";
import { toastFail, toastSuccess } from "@nepMeds/components/Toast";
import { useProfileData } from "@nepMeds/context/index";
import {
  useCertificateFileRegister,
  useUpdateCertificateInfo,
} from "@nepMeds/service/nepmeds-certificate";
import { IGetDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import serverErrorResponse from "@nepMeds/service/serverErrorResponse";
import { colors } from "@nepMeds/theme/colors";
import { getImageUrl } from "@nepMeds/utils/getImageUrl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface handleFormUpdateProps {
  handleCloseForm: () => void;
  isLoading: boolean;
}

const SubmitButton: React.FC<handleFormUpdateProps> = ({
  handleCloseForm,
  isLoading,
}) => {
  return (
    <Grid
      borderTop={`1px solid ${colors.grey_light}`}
      py={5}
      px={6}
      className="test"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <GridItem colSpan={1}>
        <Button variant={"primaryOutline"} onClick={handleCloseForm}>
          Cancel
        </Button>
      </GridItem>
      <GridItem colSpan={1}>
        <Button isLoading={isLoading} type="submit">
          Update
        </Button>
      </GridItem>
    </Grid>
  );
};

const EditCertification = ({
  doctorProfileData,
}: {
  doctorProfileData: IGetDoctorProfile;
}) => {
  const formMethods = useForm();
  const certificateFileRegister = useCertificateFileRegister();
  const updateCertificateInfoRegister = useUpdateCertificateInfo();

  const NMCdata = doctorProfileData?.doctor_nmc_info;

  const [editForm, setEditForm] = useState(false);

  const user = useProfileData();
  const handleFormUpdate = async () => {
    try {
      const nmc = formMethods.getValues("nmc");
      const formatedData = {
        ...nmc,
        is_superuser: user?.data?.is_superuser,
        id: doctorProfileData.id,
        nmc_file:
          typeof formMethods.getValues("nmc.nmc_file") !== "string"
            ? formMethods.getValues("nmc.nmc_file")?.[0]
            : doctorProfileData.doctor_nmc_info.nmc_file,
      };

      if (typeof formatedData.nmc_file === "string") {
        delete formatedData["nmc_file"];
      }

      await updateCertificateInfoRegister.mutateAsync(formatedData);
      toastSuccess("NMC data updated successfully");
    } catch (error) {
      const err = serverErrorResponse(error);
      toastFail(err);
    }
    setEditForm(false);
  };

  const handleCloseForm = () => {
    setEditForm(false);
  };
  return (
    <>
      <Card
        mb={"18px"}
        minHeight="77vh"
        maxHeight={"77vh"}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: `${colors.light_gray}`,
            borderRadius: "24px",
          },
          overflowY: "scroll",
        }}
      >
        <Box
          p={"20px"}
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Text
            fontWeight={"700"}
            fontSize={"lg"}
            lineHeight={"22px"}
            color={colors?.primary_dark1}
          >
            NMC Info
          </Text>
          {!editForm && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => setEditForm(true)}
              cursor="pointer"
            >
              <Button borderRadius="xl">
                <Icon as={EditIcon} boxSize={5} color={colors?.white} mr={3} />
                <Text
                  color={colors?.white}
                  fontWeight={"400"}
                  fontSize={"md"}
                  lineHeight={"19px"}
                >
                  Edit
                </Text>
              </Button>
            </Box>
          )}
        </Box>
        <Box>
          <Divider />
        </Box>
        <CardBody>
          {editForm ? (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(handleFormUpdate)}>
                <Grid>
                  <GridItem
                    height={"60vh"}
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: `${colors.light_gray}`,
                        borderRadius: "24px",
                      },
                      overflowY: "scroll",
                    }}
                  >
                    <NmcForm data={NMCdata} />
                  </GridItem>
                  <GridItem>
                    <SubmitButton
                      handleCloseForm={handleCloseForm}
                      isLoading={
                        updateCertificateInfoRegister.isLoading ||
                        certificateFileRegister.isLoading
                      }
                    />
                  </GridItem>
                </Grid>
              </form>
            </FormProvider>
          ) : NMCdata ? (
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2, xl: 3 }}
              borderBottom={`1px solid ${colors.grey_light}`}
              pb={10}
            >
              <GridItem colSpan={1} mt={"30px"} w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      w={"100px"}
                    >
                      NMC Number
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;{NMCdata?.nmc_number}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem colSpan={1} mt={"30px"} w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      w={"90px"}
                    >
                      Issued Date
                    </Text>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;
                      {NMCdata?.nmc_issued_date}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem colSpan={1} mt={"30px"} w="100%">
                <VStack spacing={5} align="stretch">
                  <Box display={"flex"} alignItems={"center"} gap={3}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      w={"100px"}
                    >
                      Expiry Date
                    </Text>

                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"19px"}
                      color={colors?.black}
                    >
                      :&nbsp;
                      {NMCdata?.nmc_expiry_date}
                    </Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem colSpan={1} mt={"30px"} w="100%">
                <VStack spacing={5}>
                  <Box display={"flex"} alignItems={"center"} gap={9}>
                    <Text
                      fontWeight={"500"}
                      fontSize={"sm"}
                      lineHeight={"16px"}
                      letterSpacing={"0.4px"}
                      color={"#4D4D4D"}
                      w={"100px"}
                    >
                      NMC File:
                    </Text>

                    <Image
                      objectFit="cover"
                      src={getImageUrl(NMCdata?.nmc_file)}
                      p={"20px"}
                    />
                  </Box>
                </VStack>
              </GridItem>
            </SimpleGrid>
          ) : (
            <Text textAlign="center">No Data Found</Text>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default EditCertification;
