import {
  Button,
  HStack,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PrimaryInfoForm,
  BasicInfoForm,
  ExperienceForm,
  AcademicInfoForm,
  CertificationInfoForm,
} from "../FormComponents";
import { FormProvider, useForm } from "react-hook-form";
import { useDoctorProfile } from "@nepMeds/service/nepmeds-doctor-profile";
import { Edit } from "react-iconly";
import ModalComponent from "../Form/ModalComponent";
import { svgs } from "@nepMeds/assets/svgs";
import { colors } from "@nepMeds/theme/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  first_name: yup.string().required("First Name is required"),
  middle_name: yup.string().required("Middle Name is required"),
  last_name: yup.string().required("Last Name is required"),
});
const DocProfile = () => {
  const { data: doctorProfileData } = useDoctorProfile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isPrimaryOpen,
    onClose: onPrimaryClose,
    onOpen: onPrimaryOpen,
  } = useDisclosure();
  const {
    isOpen: isAcademicOpen,
    onClose: onAcademicClose,
    onOpen: onAcademicOpen,
  } = useDisclosure();
  const {
    isOpen: isCertificateOpen,
    onClose: onCertificateClose,
    onOpen: onCertificateOpen,
  } = useDisclosure();
  const {
    isOpen: isExperienceOpen,
    onClose: onExperienceClose,
    onOpen: onExperienceOpen,
  } = useDisclosure();

  const formMethods = useForm({
    defaultValues: {
      image: undefined as undefined | File[],
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    resolver: yupResolver(schema),
  });
  const onSavePersonalInfo = async () => {};
  return (
    <Tabs position="relative" variant="unstyled">
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
    </Tabs>
  );
};

export default DocProfile;
