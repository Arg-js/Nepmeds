import { DataTable } from "@nepMeds/components/DataTable";
import TableActions from "@nepMeds/components/DataTable/TableActions";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { NAVIGATION_ROUTES } from "@nepMeds/routes/routes.constant";
import { useGetPatientHistory } from "@nepMeds/service/nepmeds-patient-history";
import { useState, useMemo } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

const PatientHistory = () => {
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // React Query
  // TODO: add pagination
  const { data: tableData, isFetching } = useGetPatientHistory();

  // React Query Ends

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "S.N.",
        accessorFn: (_: unknown, index: number) => {
          return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
        },
      },
      {
        header: "Patient Name",
        accessorKey: "patient_name",
      },
      {
        header: "Gender",
        accessorKey: "gender",
      },
      {
        header: "Last Appointment Date",
        accessorKey: "appointment_date",
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: ({ row }: CellProps<{ id: string }>) => {
          return (
            <TableActions
              onView={() => {
                navigate(
                  generatePath(NAVIGATION_ROUTES.PATIENT_HISTORY_ID, {
                    id: row.original?.id,
                  })
                );
              }}
            />
          );
        },
      },
    ],
    [tableData, pageParams]
  );

  return (
    <TableWrapper>
      <DataTable
        data={tableData?.data.results || []}
        columns={columns}
        isLoading={isFetching}
        pagination={{
          manual: true,
          pageParams: pageParams,
          pageCount: tableData?.data.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </TableWrapper>
  );
};

export default PatientHistory;
