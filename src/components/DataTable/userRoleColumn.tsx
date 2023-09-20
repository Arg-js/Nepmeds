import { Switch, Text } from "@chakra-ui/react";
import {
  IUserRoleAdmin,
  useUpdateDoctorStatus,
  useUpdatePatientStatus,
} from "@nepMeds/service/nepmeds-admin-userrole";
import { CellContext } from "@tanstack/react-table";
import { useState } from "react";
import TableActions from "./TableActions";

interface IUserPatient {
  id: string;
  patient_name: string;
  mobile_number: number;
  email: string;
  status: boolean;
}
//Appointment Column
export const doctorRoleColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IUserRoleAdmin, any>, index: number) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Doctor's Name",
      accessorKey: "name",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return row?.original?.name;
      },
    },

    {
      header: "NMC No.",
      accessorKey: "nmc_no",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return row?.original?.nmc_no;
      },
    },
    {
      header: "Regristration Approval Date",
      accessorKey: "patient_name",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return (
          <Text pl={"12px"}>{row?.original?.payment_approved_date ?? "-"}</Text>
        );
      },
    },

    {
      header: "Payment Approval Date",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return row?.original?.payment_approved_date;
      },
    },
    {
      header: "Contact",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.mobile_number}</Text>;
      },
    },
    {
      header: "Email",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        return <Text pl={"12px"}>{row?.original?.email}</Text>;
      },
    },
    {
      header: "Status",
      cell: ({ row }: CellContext<IUserRoleAdmin, any>) => {
        const [status, setStatus] = useState(row?.original?.status);
        const { mutate } = useUpdateDoctorStatus();

        const handleStatus = (is_active: boolean) => {
          mutate({ id: row.original?.id, is_active });
        };

        return (
          <Switch
            size="lg"
            isChecked={status}
            onChange={e => {
              setStatus(e.target.checked);
              handleStatus(e.target.checked);
            }}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => {
        return (
          <TableActions
            onView={
              () => ""
              // navigate(
              //   generatePath(NAVIGATION_ROUTES.DOC_PROFILE, {
              //     id: cell.row.original.id,
              //   })
              // )
            }
            onAccept={
              () => ""
              // onClick(true, {
              //   id: cell.row.original.id,
              //   name:
              //     cell.row.original.user.first_name +
              //     " " +
              //     cell.row.original.user.last_name,
              // })
            }
            onReject={
              () => ""
              // onClick(false, {
              //   id: cell.row.original.id,
              //   name:
              //     cell.row.original.user.first_name +
              //     " " +
              //     cell.row.original.user.last_name,
              // })
            }
          />
        );
      },
    },
  ];
};

export const patientRoleColumn = () => {
  return [
    {
      header: "S.N",
      accessorFn: (_cell: CellContext<IUserPatient, any>, index: number) => {
        return index + 1;
      },
      size: 2,
    },
    {
      header: "Patient's Name",
      accessorKey: "name",
      cell: ({ row }: CellContext<IUserPatient, any>) => {
        return row?.original?.patient_name;
      },
    },

    {
      header: "Contact No.",
      cell: ({ row }: CellContext<IUserPatient, any>) => {
        return <Text pl={"12px"}>{row?.original?.mobile_number}</Text>;
      },
    },
    {
      header: "Email",
      cell: ({ row }: CellContext<IUserPatient, any>) => {
        return <Text pl={"12px"}>{row?.original?.email}</Text>;
      },
    },
    {
      header: "Status",
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
