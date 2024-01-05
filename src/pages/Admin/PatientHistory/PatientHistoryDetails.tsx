import { HStack, TableContainer, Text, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { useGetPatientHistoryById } from "@nepMeds/service/nepmeds-patient-history";
import { useParams } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { useState } from "react";
import { appointmentColumns, followUpColumns } from "./patientHistoryColumn";
import { PaginationInital } from "@nepMeds/utils/constant";
import AppointmentPrescriptionModal from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/ModalForm/PrescriptionModal";
import { useGetAppointmentRequestById } from "@nepMeds/service/nepmeds-doctor-patient-appointment";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { svgs } from "@nepMeds/assets/svgs";
import ViewModalSkeleton from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/ModalForm/ViewModal/ViewModalSkeleton";
import ViewModal from "@nepMeds/pages/Doctor/Appointment/AppointmentTab/ModalForm/ViewModal";

const PatientHistoryDetails = () => {
  const { id = "" } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [appointmentId, setAppointmentId] = useState("");
  const [pageParams, setPageParams] = useState(PaginationInital);
  const { data: tableData, isLoading } = useGetPatientHistoryById({
    id,
    is_followup: tabIndex === 1,
  });
  const { data: patient, isLoading: isPatientLoading } =
    useGetAppointmentRequestById({ id: appointmentId });
  const {
    isOpen: isPrescriptionOpen,
    onOpen: onPrescriptionClick,
    onClose: onPrescriptionClose,
  } = useDisclosure();

  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();

  const setTabIndexFn = (index: number) => {
    setTabIndex(index);
    setPageParams(PaginationInital);
  };

  return (
    <TableWrapper>
      <AppointmentPrescriptionModal
        isPrescriptionOpen={isPrescriptionOpen}
        onPrescriptionClose={onPrescriptionClose}
        appointmentId={appointmentId}
        isEditable={false}
      />
      <ModalComponent
        size={"2xl"}
        heading={
          <HStack>
            <svgs.logo_small />
            <Text>Appointment Detail</Text>
          </HStack>
        }
        isOpen={isViewModalOpen}
        onClose={onViewModalClose}
        footer={<></>}
      >
        {isPatientLoading ? (
          // SKELETON FOR modal thats being used to view the appointment details
          <ViewModalSkeleton />
        ) : (
          <ViewModal patient={patient} />
        )}
      </ModalComponent>
      <Tabs
        variant="enclosed"
        fontSize="md"
        fontFamily={"Inter"}
        onChange={index => setTabIndexFn(index)}
      >
        <TabList borderBottom={"none"}>
          <Tab>Appointment</Tab>
          <Tab>Follow Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {tabIndex === 0 && (
              <TableContainer>
                <DataTable
                  data={tableData?.results ?? []}
                  columns={appointmentColumns({
                    pageParams,
                    setAppointmentId,
                    onPrescriptionClick,
                    onViewModalOpen,
                  })}
                  isLoading={isLoading}
                  pagination={{
                    manual: true,
                    pageParams: pageParams,
                    pageCount: tableData?.page_count,
                    onChangePagination: setPageParams,
                  }}
                />
              </TableContainer>
            )}
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && (
              <TableContainer>
                <DataTable
                  data={tableData?.results ?? []}
                  columns={followUpColumns({
                    pageParams,
                  })}
                  isLoading={isLoading}
                  pagination={{
                    manual: true,
                    pageParams: pageParams,
                    pageCount: tableData?.page_count,
                    onChangePagination: setPageParams,
                  }}
                />
              </TableContainer>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TableWrapper>
  );
};

export default PatientHistoryDetails;
