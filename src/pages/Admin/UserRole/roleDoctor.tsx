import { DataTable } from "@nepMeds/components/DataTable";
import { doctorRoleColumn } from "@nepMeds/components/DataTable/userRoleColumn";
import { useGetUserRoleAdmin } from "@nepMeds/service/nepmeds-admin-userrole";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const RoleDoctor = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isSuccess, data } = useGetUserRoleAdmin({
    page_no: pageIndex + 1,
    page_size: pageSize,
  });

  return (
    <div>
      {isSuccess && (
        <DataTable
          columns={doctorRoleColumn()}
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

export default RoleDoctor;
