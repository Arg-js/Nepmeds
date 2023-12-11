import { Flex } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { STATUSTYPE } from "@nepMeds/config/enum";
import { useState } from "react";

import SearchInput from "@nepMeds/components/Search";
import { useGetRescheduledList } from "@nepMeds/service/nepmeds-patient-doctor-availability";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { rescheduledHistoryColumn } from "./column";

export type StatusType =
  | STATUSTYPE.approved
  | STATUSTYPE.pending
  | STATUSTYPE.rejected
  | STATUSTYPE.completed
  | 0;

const RescheduledHistory = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedInputValue = useDebounce(searchValue, 500);

  // PAGINATION
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // PAGINATION ENDS

  // REACT QUERIES

  const { data, isLoading } = useGetRescheduledList({
    page_no: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    search: debouncedInputValue,
    is_history: true,
  });

  // REACT QUERIES END

  return (
    <>
      {/* Table Header */}
      <Flex justifyContent={"flex-end"}>
        <SearchInput
          setSearchValue={setSearchValue}
          setPageParams={setPageParams}
        />
      </Flex>

      {/* Table Header Ends */}

      <DataTable
        data={data?.results ?? []}
        columns={rescheduledHistoryColumn({
          pageParams,
        })}
        isLoading={isLoading}
        pagination={{
          manual: true,
          pageParams,
          pageCount: data?.page_count,
          onChangePagination: setPageParams,
        }}
      />
    </>
  );
};

export default RescheduledHistory;
