import { IPaginationParams } from "@nepMeds/components/DataTable/Pagination";
import { toastFail } from "@nepMeds/components/Toast";
import { AmountType } from "@nepMeds/config/enum";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { generatePath } from "react-router-dom";
import serverErrorResponse from "./serverErrorResponse";
import { api, NepMedsResponse } from "./service-api";
import { HttpClient } from "./service-axios";
import { toastSuccess } from "./service-toast";

interface ISpecialization {
  id: number;
  name: string;
}

interface IDoctor {
  id: number;
  name: string;
}

export interface IParams {
  count: number;
  page_count: number;
  next: string;
  previous: string;
}

export interface IDiscountBasicDetails {
  discount_type: AmountType;
  value: number;
  code: string;
}

export interface IDiscountReqBody extends IDiscountBasicDetails {
  title: string;
  specialization: number[];
  doctor: number[];

  start_date: string;
  end_date: string;
  is_active: boolean;
  onetime_coupon: boolean;
}

interface IDiscountUpdateReqBody extends Partial<IDiscountReqBody> {
  id: number;
}

type IDiscount = Omit<IDiscountUpdateReqBody, "specialization" | "doctor">;

export interface IDiscountResBody extends IParams {
  results: IDiscountUpdateReqBody[];
}

export interface IDiscountResById extends IDiscount {
  specialization_list: ISpecialization[];
  doctor_list: IDoctor[];
}

const getDiscount = ({ page, page_size, search }: IPaginationParams) => {
  const response = HttpClient.get<NepMedsResponse<IDiscountResBody>>(
    api.discount.get,
    {
      params: { page: page + 1, page_size, search },
    }
  );
  return response;
};
const useGetDiscount = ({ page, page_size, search }: IPaginationParams) => {
  return useQuery(
    [api.discount.get, page, page_size, search],
    () => getDiscount({ page, page_size, search }),
    {
      select: ({ data }) => data?.data,
      onError: e => toastFail(serverErrorResponse(e)),
    }
  );
};

const createDiscount = (data: IDiscountReqBody) => {
  return HttpClient.post(api.discount.post, data);
};
const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(createDiscount, {
    onSuccess: () => {
      toastSuccess("Discount created successfully");
      queryClient.invalidateQueries(api.discount.get);
    },
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

const updateDiscount = (data: IDiscountUpdateReqBody) => {
  return HttpClient.patch(
    generatePath(api.discount.patch, { id: data.id.toString() }),
    data
  );
};
const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDiscount, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.discount.get);
    },
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

const deleteDiscount = ({ id }: { id: string }) => {
  return HttpClient.delete(generatePath(api.discount.delete, { id }));
};
const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDiscount, {
    onSuccess: () => {
      toastSuccess("Deleted discount successfully");
      queryClient.invalidateQueries(api.discount.get);
    },
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

const getDiscountById = ({ id }: { id: string }) => {
  return HttpClient.get<NepMedsResponse<IDiscountResById>>(
    generatePath(api.discount.getById, { id })
  );
};
const useGetDiscountById = ({ id }: { id: string }) => {
  return useQuery([api.discount.getById, id], () => getDiscountById({ id }), {
    enabled: !!id,
    select: ({ data }) => data?.data,
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

const getDiscountByCode = ({
  code,
  doctor_id,
}: {
  code: string;
  doctor_id: number;
}) => {
  return HttpClient.get<NepMedsResponse<IDiscountBasicDetails>>(
    api.discount.getByCoupon,
    {
      params: {
        code,
        doctor_id,
      },
    }
  );
};
const useGetDiscountByCode = () => {
  return useMutation(getDiscountByCode, {
    onError: e => toastFail(serverErrorResponse(e)),
  });
};

export {
  useGetDiscount,
  useGetDiscountById,
  useCreateDiscount,
  useUpdateDiscount,
  useDeleteDiscount,
  useGetDiscountByCode,
};
