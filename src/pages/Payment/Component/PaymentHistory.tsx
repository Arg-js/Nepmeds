import { HStack, Text } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { paymentHistoryColumn } from "@nepMeds/components/DataTable/Columns/Doctor/PaymentHistory";
import { useGetPaymentHistoryDoctor } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { useState } from "react";

const PaymentHistory = () => {
  const { data: history, isLoading } = useGetPaymentHistoryDoctor();
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  return (
    <div>
      <HStack justifyContent="space-between">
        <Text fontSize="md" fontWeight="500" color={colors.black_60}>
          Payment History
        </Text>
      </HStack>

      <DataTable
        data={history?.results || []}
        columns={paymentHistoryColumn({
          pageParams,
        })}
        isLoading={isLoading}
        pagination={{
          manual: true,
          pageParams: {
            pageIndex: pageParams.pageIndex,
            pageSize: pageParams.pageSize,
          },
          pageCount: history?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </div>
  );
};

export default PaymentHistory;
