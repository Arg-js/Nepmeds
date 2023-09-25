import { DataTable } from "@nepMeds/components/DataTable";
import { instantConsultantColumn } from "@nepMeds/components/DataTable/adminAppointmentColumn";
import { ADMINAPPOINTMENT } from "@nepMeds/config/enum";
import { useAdminAppointment } from "@nepMeds/service/nepmeds-appointment";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const InstantConsultant = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isSuccess, data } = useAdminAppointment({
    page_no: pageIndex + 1,
    page_size: pageSize,
    consulting_type: ADMINAPPOINTMENT.Instant_call.toString(),
  });

  return (
    <div>
      {isSuccess && (
        <DataTable
          columns={instantConsultantColumn()}
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

export default InstantConsultant;
