import { Switch } from "@chakra-ui/react";
import {
  IAdminUserList,
  IUserRoleAdmin,
  useUpdateDoctorStatus,
  useUpdatePatientStatus,
} from "@nepMeds/service/nepmeds-admin-userrole";
import { CellContext, PaginationState } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import { CellProps } from "react-table";
import TableActions from "./TableActions";

interface IUserPatient {
  id: string;
  patient_name: string;
  mobile_number: number;
  email: string;
  status: boolean;
}
//Appointment Column
export const doctorRoleColumn = (pageParams: PaginationState) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IUserRoleAdmin, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
    },
    {
      header: "Doctor's Name",
      accessorKey: "name",
    },

    {
      header: "NMC/ NHPC/ NAMC No.",
      accessorKey: "nmc_no",
    },
    {
      header: "Payment Approval Date",
      accessorKey: "payment_approved_date",
    },
    {
      header: "Contact",
      accessorKey: "mobile_number",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        const [status, setStatus] = useState(row?.original?.status);
        const { mutate } = useUpdateDoctorStatus();

        const handleStatus = (is_active: boolean) => {
          mutate({ id: row.original?.id, is_active });
        };

        return (
          <Switch
            size="md"
            isChecked={status}
            onChange={e => {
              setStatus(e.target.checked);
              handleStatus(e.target.checked);
            }}
          />
        );
      },
    },
    // {
    //   header: "Actions",
    //   accessorKey: "actions",
    //   cell: () => {
    //     return (
    //       <TableActions
    //         onView={
    //           () => ""
    //           // navigate(
    //           //   generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
    //           //     id: cell.row.original.id,
    //           //   })
    //           // )
    //         }
    //         onAccept={
    //           () => ""
    //           // onClick(true, {
    //           //   id: cell.row.original.id,
    //           //   name:
    //           //     cell.row.original.user.first_name +
    //           //     " " +
    //           //     cell.row.original.user.last_name,
    //           // })
    //         }
    //         onReject={
    //           () => ""
    //           // onClick(false, {
    //           //   id: cell.row.original.id,
    //           //   name:
    //           //     cell.row.original.user.first_name +
    //           //     " " +
    //           //     cell.row.original.user.last_name,
    //           // })
    //         }
    //       />
    //     );
    //   },
    // },
  ];
};

export const patientRoleColumn = (pageParams: PaginationState) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IUserPatient, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
      size: 2,
    },
    {
      header: "Patient's Name",
      accessorKey: "patient_name",
    },

    {
      header: "Contact No.",
      accessorKey: "mobile_number",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: CellContext<IUserPatient, any>) => {
        const [patientStatus, setPatientStatus] = useState(
          row?.original?.status
        );
        const { mutate } = useUpdatePatientStatus();
        const handleStatus = (is_active: boolean) => {
          mutate({ id: row.original?.id, is_active });
        };
        return (
          <Switch
            size="lg"
            isChecked={patientStatus}
            onChange={e => {
              setPatientStatus(e.target.checked);
              handleStatus(e.target.checked);
            }}
          />
        );
      },
    },
  ];
};

export const adminRoleColumn = ({
  pageParams,
  onModalOpen,
  setAdminUser,
}: {
  pageParams: PaginationState;
  onModalOpen: {
    onChangePasswordModalOpen: () => void;
    onDeleteModalOpen: () => void;
    onEditModalOpen: () => void;
  };
  setAdminUser: Dispatch<SetStateAction<IAdminUserList | undefined>>;
}) => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IAdminUserList, any>, index: number) => {
        return `${pageParams.pageIndex * pageParams.pageSize + (index + 1)}.`;
      },
      size: 2,
    },
    {
      header: "Admin's Name",
      accessorKey: "name",
    },
    {
      header: "Selected Aproval Date",
      accessorFn: ({ created_at }: { created_at: string }) => {
        return created_at.substr(0, 10);
      },
    },

    {
      header: "Contact No.",
      accessorKey: "mobile_number",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }: CellProps<IAdminUserList>) => {
        return (
          <TableActions
            onChangePassword={() => {
              setAdminUser(row.original);
              onModalOpen.onChangePasswordModalOpen();
            }}
            onEdit={() => {
              setAdminUser(row.original);
              onModalOpen.onEditModalOpen();
            }}
            onDelete={() => {
              setAdminUser(row.original);
              onModalOpen.onDeleteModalOpen();
            }}
          />
        );
      },
    },
  ];
};
