import { IFilterSearch } from "@nepMeds/types/searchFilter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import { useProfileData } from "../context";
import { queryStringGenerator } from "../utils";
import { IUser } from "./nepmeds-doctor-profile";
import { NepMedsResponse, PaginatedResponse, api } from "./service-api";
import { HttpClient } from "@nepMeds/service/service-axios";

export interface IPaymentMethod {
  instant_amount: number;
  schedule_amount: number;
  doctor_amount: {
    payment_mode: number;
    epayment_id?: string;
    account_number?: string;
    account_holder_name?: string;
    branch_name?: string;
    bank_name?: string;
    is_primary_method: boolean;
  }[];
}

export interface IPaymentMethodDoctorAmount {
  id: number;
  payment_mode: string;
  payment_detail: { id: number; name: string; image: null | string };
  epayment_id: string | null;
  account_number: string | null;
  account_holder_name: string | null;
  bank_name: string | null;
  branch_name: string | null;
  is_primary_method: boolean;
  doctor?: number;
}

export interface IGetPaymentMethods {
  id: number;
  instant_amount: string;
  schedule_amount: string;
  doctor_amount: IPaymentMethodDoctorAmount[];
}

export type IPaymentFormType = Omit<
  IPaymentMethodDoctorAmount,
  "id" | "payment_detail"
>;

// Add payment methods for doctor e.g bank account, esewa and more
const addPaymentMethods = async (paymentMethods: IPaymentFormType) => {
  const response = await HttpClient.post(
    api.payment_methods_create,
    paymentMethods
  );
  return response;
};

export const useCreatePaymentMethods = () => {
  const queryClient = useQueryClient();
  return useMutation(addPaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.added_payment_methods]);
      queryClient.invalidateQueries([api.payment_methods_create]);
    },
  });
};

//Edit Payment methods for doctor
const editPaymentMethods = async ({
  paymentMethods,
  id,
}: {
  paymentMethods: IPaymentFormType;
  id: string;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.edit_payment_methods, { id }),
    paymentMethods
  );
  return response;
};

export const useEditPaymentMethods = () => {
  const profileData = useProfileData();
  const queryClient = useQueryClient();
  return useMutation(editPaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        api.added_payment_methods,
        profileData?.data?.doctor?.id.toString(),
      ]);
      queryClient.invalidateQueries([api.payment_methods_create]);
    },
  });
};

export interface IPaymentMethodType {
  id: number;
  name: string;
  image: string | null;
}

// Get list of payment methods
const getPaymentMethods = async () => {
  const response = await HttpClient.get<NepMedsResponse<IPaymentMethodType[]>>(
    api.payment_methods
  );
  return response;
};

export const useGetPaymentMethods = () => {
  return useQuery([api.payment_methods], getPaymentMethods, {
    select: data => data.data.data,
  });
};

//Get list of added payment methods for a doctor by doctor id
const getAddedPaymentMethods = async (id: string) => {
  const response = await HttpClient.get<NepMedsResponse<IGetPaymentMethods>>(
    generatePath(api.added_payment_methods, { doctor_id: id })
  );
  return response;
};

export const useGetAddedPaymentMethods = (id: string) => {
  return useQuery(
    [api.added_payment_methods, id],
    () => getAddedPaymentMethods(id),
    {
      select: data => data.data.data,
      enabled: !!id,
    }
  );
};

//Delete payment methods for a doctor
const deletePaymentMethods = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.delete_payment_methods, { id })
  );
  return response;
};

export const useDeletePaymentMethods = () => {
  const profileData = useProfileData();
  const queryClient = useQueryClient();
  return useMutation(deletePaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        api.added_payment_methods,
        profileData?.data?.doctor?.id.toString(),
      ]);

      queryClient.invalidateQueries([api.payment_methods_create]);
    },
  });
};

export interface IAllPaymentResponse {
  id: number;
  user: IUser;
  specialization_names: {
    id: number;
    name: string;
  }[];
  payment_status: number;
  rejected_remarks: null | string;
  payment_rejected_remark: string;
  payment_modes: { id: string; image: string }[];
  doctor_amount_detail: {
    schedule_amount: null | string;
    id: string;
    instant_amount: null | string;
  };
}

// Get all payment list (Payment Status)
const getPaymentList = async ({
  page_no,
  payment_status,
  from_date,
  to_date,
  page_size,
  name,
  specialization,
}: IFilterSearch) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    payment_status,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
    specialization,
  });
  const response = await HttpClient.get<PaginatedResponse<IAllPaymentResponse>>(
    `${api.allpaymentList}?${qs}`
  );
  return response;
};

export const useGetPaymentList = ({
  page_no,
  payment_status,
  from_date,
  to_date,
  page_size,
  name,
  enabled,
  specialization,
}: IFilterSearch & { enabled?: boolean }) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
    payment_status,
    created_at__date__gte: from_date,
    created_at__date__lte: to_date,
    user__name__icontains: name,
    specialization,
  });
  return useQuery(
    [api.allpaymentList, qs],
    () =>
      getPaymentList({
        page_no: page_no,
        payment_status,
        from_date: from_date,
        to_date: to_date,
        name: name,
        page_size: page_size ?? 10,
        specialization,
      }),
    {
      select: data => data.data.data,
      enabled: !!enabled,
    }
  );
};

//Reject Payment for doctor (Requires Doctor ID)
const rejectPayment = async ({
  id,
  remarks,
  title_id,
}: {
  id: string;
  remarks: string;
  title_id: string;
}) => {
  const response = await HttpClient.post(
    generatePath(api.reject_payment_methods, { id }),
    { title_id, remarks }
  );
  return response;
};

export const useRejectPayment = () => {
  const queryClient = useQueryClient();
  return useMutation(rejectPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.allpaymentList]);
    },
  });
};

//Approve Payment for doctor (Requires Doctor ID)
const approvePayment = async (id: string) => {
  const response = await HttpClient.post(
    generatePath(api.approve_payment_methods, { id })
  );
  return response;
};

export const useApprovePayment = () => {
  const queryClient = useQueryClient();
  return useMutation(approvePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.allpaymentList]);
    },
  });
};

//get list of payment methods for doctor (without doctor id)
const getPaymentMethodsList = async () => {
  const response = await HttpClient.get<
    NepMedsResponse<IPaymentMethodDoctorAmount[]>
  >(api.payment_methods_create);
  return response;
};

export const useGetPaymentMethodsList = () => {
  return useQuery([api.payment_methods_create], getPaymentMethodsList, {
    select: data => data.data.data,
  });
};

//Edit single payment methods by Id
const editSinglePaymentMethods = async ({
  id,
  paymentMethods,
}: {
  id: string;
  paymentMethods: IPaymentFormType;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.delete_payment_methods, { id }),
    paymentMethods
  );
  return response;
};

export const useEditSinglePaymentMethods = () => {
  const queryClient = useQueryClient();
  return useMutation(editSinglePaymentMethods, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.payment_methods_create]);
    },
  });
};

export interface IAddDoctorAmount {
  instant_amount: string;
  schedule_amount: string;
}

//Add amount for doctor
const addAmount = async (data: IAddDoctorAmount) => {
  const response = await HttpClient.post(api.add_amount_create, data);
  return response;
};

export const useAddDoctorAmount = () => {
  const queryClient = useQueryClient();
  return useMutation(addAmount, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.add_amount_create]);
      queryClient.invalidateQueries([api.basicProfile]);
    },
  });
};

export interface IAmountListDoctor {
  id: number;
  instant_amount: string;
  schedule_amount: string;
  is_active_amount: boolean;
  rate_status: string;
  approved_date: string;
  requested_date: string;
}

//Get list of amount for doctor (Without id)
const getAmountList = async () => {
  const response = await HttpClient.get<PaginatedResponse<IAmountListDoctor>>(
    api.add_amount_create
  );
  return response;
};

export const useGetAmountList = () => {
  return useQuery([api.add_amount_create], getAmountList, {
    select: data => data.data.data,
  });
};

//Edit amount for doctor
const editAmount = async ({
  id,
  data,
}: {
  id: string;
  data: IAddDoctorAmount;
}) => {
  const response = await HttpClient.patch(
    generatePath(api.edit_amount, { id }),
    data
  );
  return response;
};

export const useEditAmount = () => {
  const queryClient = useQueryClient();
  return useMutation(editAmount, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.add_amount_create]);
    },
  });
};

//Delete amount rate by admin using Doctor ID
const deleteAmount = async (id: string) => {
  const response = await HttpClient.delete(
    generatePath(api.edit_amount, { id })
  );
  return response;
};

export const useDeleteAmount = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAmount, {
    onSuccess: () => {
      queryClient.invalidateQueries([api.add_amount_create]);
    },
  });
};

//Get Payment History By Admin  by doctor Id (No Pagination or Filter)
const getPaymentHistory = async ({ id, qs }: { id: string; qs: string }) => {
  const response = await HttpClient.get<PaginatedResponse<IAmountListDoctor>>(
    generatePath(`${api.getAmountHistory}?${qs}`, { id })
  );
  return response;
};

export const useGetPaymentHistory = ({
  id,
  page_no,
  page_size,
}: IFilterSearch & { id: string }) => {
  const qs = queryStringGenerator({
    page: page_no,
    page_size,
  });

  return useQuery(
    [api.getAmountHistory, id, qs],
    () => getPaymentHistory({ id, qs }),
    {
      select: data => data.data.data,
    }
  );
};

export interface IDoctorRateHistoryDetail {
  id: number;
  title: string;
  profile_picture: string;
  name: string;
  specialization_names: { name: string; id: string }[];
  total_experience: number;
}

//Get Doctor Detail by rate history (Doctor ID)
const getDoctorDetail = async ({ id }: { id: string }) => {
  const response = await HttpClient.get<
    NepMedsResponse<IDoctorRateHistoryDetail>
  >(generatePath(api.doctor_detail_history, { id }));
  return response;
};

export const useGetDoctorDetailRateHistory = ({ id }: { id: string }) => {
  return useQuery(
    [api.doctor_detail_history, id],
    () => getDoctorDetail({ id }),
    {
      select: data => data.data.data,
    }
  );
};
