import CenterLoader from "@nepMeds/components/Common/Loader";
import { DataTable } from "@nepMeds/components/DataTable";
import { patientRoleColumn } from "@nepMeds/components/DataTable/userRoleColumn";
import { useGetUserRolePatient } from "@nepMeds/service/nepmeds-admin-userrole";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const RolePatient = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isSuccess, data, isLoading, isFetching } = useGetUserRolePatient({
    page_no: pageIndex + 1,
    page_size: pageSize,
  });

  if (isLoading || isFetching) return <CenterLoader />;

  return (
    <div>
      {isSuccess && (
        <DataTable
          columns={patientRoleColumn({ pageIndex, pageSize })}
          data={data?.results}
          pagination={{
            manual: true,
            pageParams: { pageIndex, pageSize },
            pageCount: data?.page_count,
            onChangePagination: setPagination,
          }}
        />
      )}
    </div>
  );
};

export default RolePatient;
