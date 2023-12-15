import { ColumnDef } from "@tanstack/react-table";

export const patientColumn = (): ColumnDef<unknown>[] => {
  return [
    {
      header: "S.N.",
      accessorKey: "id",
      cell: info => info.row.index + 1,
    },
    {
      header: "Patient's Name",
      accessorKey: "patient_name",
    },
    {
      header: "Age",
      accessorKey: "age",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact No.",
      accessorKey: "contact_number",
    },
  ];
};
