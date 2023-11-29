export interface IFilterSearch {
  page_no: number;
  page_size: number;
  payment_status?: string;
  from_date?: string;
  to_date?: string;
  name?: string;
  specialization?: string;
  consulting_type?: string;
  search?: string;
}
