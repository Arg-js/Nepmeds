import { Grid, Text, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import WrapperBox from "@nepMeds/components/Patient/DoctorConsultation/WrapperBox";
import SearchInput from "@nepMeds/components/Search";
import { CellContext } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ModalForm } from ".";

const dummyData = [
  {
    doctorName: "Rupesh Dahal",
    appointmentDate: "11/29/2023",
  },
];
const PatientDetailsTable = () => {
  // TODO: api development in progress
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [_searchValue, setSearchValue] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        header: "S.N.",
        accessorFn: (_cell: CellContext<number, number>, index: number) => {
          return `${pagination.pageSize * pagination.pageIndex + (index + 1)}.`;
        },
      },
      {
        header: "Doctor name",
        accessorKey: "doctorName",
      },
      {
        header: "Appointment Date",
        accessorKey: "appointmentDate",
      },
      { header: "Appointment Time", accessorKey: "appointmentTime" },
      { header: "Call Type", accessorKey: "callType" },
      { header: "Appointment Status", accessorKey: "appointmentStatus" },
      { header: "Call Duration", accessorKey: "callDuration" },
      { header: "Call Status", accessorKey: "callStatus" },
      { header: "Follow Up", accessorKey: "followUp" },
      { header: "Actions", cell: () => <TableActions onView={onOpen} /> },
    ],
    []
  );
  return (
    <WrapperBox style={{ margin: "5", borderRadius: "12px", py: "4", px: "9" }}>
      <>
        <ModalComponent
          heading={<>Detail View</>}
          isOpen={isOpen}
          onClose={onClose}
          footer={<></>}
          size={"2xl"}
        >
          <ModalForm />
        </ModalComponent>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Text variant="tableHeading">Patient Details</Text>
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPagination}
          />
        </Grid>
        <DataTable data={dummyData ?? []} columns={columns} />
      </>
    </WrapperBox>
  );
};

export default PatientDetailsTable;
