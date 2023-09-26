import CenterLoader from "@nepMeds/components/Common/Loader";
import { DataTable } from "@nepMeds/components/DataTable";
import { appointmentColumn } from "@nepMeds/components/DataTable/adminAppointmentColumn";
import { ADMINAPPOINTMENT } from "@nepMeds/config/enum";
import { useAdminAppointment } from "@nepMeds/service/nepmeds-appointment";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

const Appointment = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { isSuccess, data, isLoading } = useAdminAppointment({
    page_no: pageIndex + 1,
    page_size: pageSize,
    consulting_type: ADMINAPPOINTMENT.Appointment.toString(),
  });
  if (isLoading) return <CenterLoader />;
  return (
    <div>
      {isSuccess && (
        <DataTable
          columns={appointmentColumn({ pageIndex, pageSize })}
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

export default Appointment;
