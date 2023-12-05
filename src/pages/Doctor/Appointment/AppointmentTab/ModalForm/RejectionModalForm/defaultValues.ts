export interface IRejectionData {
  reject_title: number;
  reject_remarks: string;
}

export const defaultValues = {
  // Todo: find another way
  reject_title: "" as unknown as number,
  reject_remarks: "",
};
