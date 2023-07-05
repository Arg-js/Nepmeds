import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { fetchDoctorProfileById } from "@nepMeds/service/nepmeds-doctor-profile";
import DocUpdateProfile from "@nepMeds/components/DocProfile/DocUpdateProfile";
import { useParams } from "react-router-dom";

const DocProfileAdmin = () => {
  const formMethods = useForm();
  const { id } = useParams();
  const { data: doctorProfileData } = fetchDoctorProfileById(id ?? "0");
  return (
    <VStack align={"stretch"} p={4}>
      <Tabs position="relative" variant="unstyled">
        <TabList bg="white" px={6} pt={5} pb={6} borderRadius={"xl"}>
          <Tab>Doctor Profile</Tab>
        </TabList>
        <TabIndicator mt="-20px" height="4px" bg="blue.500" />
        <TabPanels sx={{ "&>div": { px: "0px" } }}>
          <FormProvider {...formMethods}>
            <TabPanel>
              <DocUpdateProfile
                doctorProfileData={doctorProfileData?.data ?? ({} as any)}
              />
            </TabPanel>
          </FormProvider>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default DocProfileAdmin;

{
  /* <Tabs position="relative" variant="unstyled">
    <TabList>
      <Tab>Profile</Tab>
      <Tab>Primary Info</Tab>
      <Tab>Academic Info</Tab>
      <Tab>Certification Info</Tab>
      <Tab>Experience</Tab>
    </TabList>
    <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
    <TabPanels>
      <TabPanel>
        <Icon as={Edit} onClick={onOpen} cursor="pointer" />
        <ModalComponent
          size="xl"
          isOpen={isOpen}
          onClose={onClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Personal Information</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button variant="outline" onClick={onClose} flex={1}>
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSavePersonalInfo}
                background={colors.primary}
                color={colors.white}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <BasicInfoForm
                hidePasswordField={false}
                doctorProfileData={doctorProfileData}
                isEditable={true}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      </TabPanel>
      <TabPanel>
        <Icon as={Edit} onClick={onPrimaryOpen} cursor="pointer" />
        <ModalComponent
          size="xl"
          isOpen={isPrimaryOpen}
          onClose={onPrimaryClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Primary Information</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button variant="outline" onClick={onPrimaryClose} flex={1}>
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSavePersonalInfo}
                background={colors.primary}
                color={colors.white}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <PrimaryInfoForm
                doctorProfileData={doctorProfileData}
                isEditable={true}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      </TabPanel>
      <TabPanel>
        <Icon as={Edit} onClick={onAcademicOpen} cursor="pointer" />
        <ModalComponent
          size="xl"
          isOpen={isAcademicOpen}
          onClose={onAcademicClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Academic Information</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button variant="outline" onClick={onAcademicClose} flex={1}>
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSavePersonalInfo}
                background={colors.primary}
                color={colors.white}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <AcademicInfoForm
                // doctorProfileData={doctorProfileData}
                isEditable={true}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      </TabPanel>
      <TabPanel>
        <Icon as={Edit} onClick={onCertificateOpen} cursor="pointer" />
        <ModalComponent
          size="xl"
          isOpen={isCertificateOpen}
          onClose={onCertificateClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Certificate Information</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button variant="outline" onClick={onCertificateClose} flex={1}>
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSavePersonalInfo}
                background={colors.primary}
                color={colors.white}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <CertificationInfoForm
                // doctorProfileData={doctorProfileData}
                isEditable={true}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      </TabPanel>
      <TabPanel>
        <Icon as={Edit} onClick={onExperienceOpen} cursor="pointer" />
        <ModalComponent
          size="xl"
          isOpen={isExperienceOpen}
          onClose={onExperienceClose}
          heading={
            <HStack>
              <svgs.logo_small />
              <Text>Edit Academic Information</Text>
            </HStack>
          }
          footer={
            <HStack w="100%" gap={3}>
              <Button variant="outline" onClick={onExperienceClose} flex={1}>
                Discard
              </Button>
              <Button
                flex={1}
                onClick={onSavePersonalInfo}
                background={colors.primary}
                color={colors.white}
              >
                Save
              </Button>
            </HStack>
          }
        >
          <VStack>
            <FormProvider {...formMethods}>
              <ExperienceForm
                // doctorProfileData={doctorProfileData}
                isEditable={true}
              />
            </FormProvider>
          </VStack>
        </ModalComponent>
      </TabPanel>
    </TabPanels>
  </Tabs>; */
}
