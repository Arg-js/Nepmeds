import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import { useCreateFollowUp } from "@nepMeds/service/nepmeds-doctor-availability";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FollowUpFormNew } from "./Component/FollowUpFromNew";
import * as Yup from "yup";
import FollowUpTab from "./FollowUpTab";
import { nextDayDate } from "@nepMeds/utils/time";

const defaultValues = {
  from_time: "",
  to_time: "",
  date: nextDayDate,
};

const schema = Yup.object().shape({
  from_time: Yup.string().required("This field is required"),
});

const followUpTabConfig = [
  { type: 0, heading: "All" },
  { type: 1, heading: "Today" },
];

const FollowUp = () => {
  const [id] = useState("");

  const [tabIndex, setTabIndex] = useState(0);

  // TODO: remove the null as unknown as number
  // const [selectedAvailability, setSelectedAvailability] = useState<number>(
  //   null as unknown as number
  // );

  const formMethods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { reset, handleSubmit } = formMethods;
  const { isOpen, onClose } = useDisclosure();

  // React Query
  // FETCH DOCTOR ID
  const { mutateAsync: createFollowUp, isLoading } = useCreateFollowUp();

  // React Query Ends

  const onModalClose = () => {
    reset(defaultValues);
    // setSelectedAvailability(null as unknown as number);
    onClose();
  };

  const onCreateFollowUp = async (data: typeof defaultValues) => {
    await createFollowUp({
      ...data,
      id: +id,
    });
    onModalClose();
  };
  return (
    <>
      <ModalComponent
        size={"2xl"}
        heading={<>Add Follow Up</>}
        isOpen={isOpen}
        onClose={onModalClose}
        footer={
          <>
            <Button variant={"reset"} flex={1} onClick={onModalClose}>
              Cancel
            </Button>
            <Button
              flex={1}
              onClick={handleSubmit(onCreateFollowUp)}
              isLoading={isLoading}
            >
              Add
            </Button>
          </>
        }
      >
        <FormProvider {...formMethods}>
          {/* <FollowUpForm
            formMethods={formMethods}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={setSelectedAvailability}
          /> */}
          <FollowUpFormNew formMethods={formMethods} />
        </FormProvider>
      </ModalComponent>
      <WrapperBox
        style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}
      >
        <Tabs
          fontSize="md"
          fontFamily={"Inter"}
          index={tabIndex}
          onChange={index => {
            setTabIndex(index);
          }}
        >
          <TabList borderBottom={"none"}>
            {followUpTabConfig.map(({ heading }) => (
              <Tab fontWeight="400" key={heading}>
                {heading}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {followUpTabConfig.map(({ heading, type }, index) => (
              <TabPanel px={0} pb={0} pt={6} key={heading}>
                {tabIndex === index && <FollowUpTab type={type} />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </WrapperBox>
    </>
  );
};

export default FollowUp;
