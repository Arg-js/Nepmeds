import { HStack } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import { followUpColumns } from "@nepMeds/components/DataTable/Columns/Admin/FollowUp";
import SearchInput from "@nepMeds/components/Search";
import TableWrapper from "@nepMeds/components/TableWrapper";
import { useDebounce } from "@nepMeds/hooks/useDebounce";
import { useGetFollowUp } from "@nepMeds/service/nepmeds-follow-up-admin";
import { useState } from "react";

const AdminFollowUp = () => {
  const [pageParams, setPageParams] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  //   React Query
  const { data: followUp, isFetching } = useGetFollowUp({
    page: pageParams.pageIndex + 1,
    page_size: pageParams.pageSize,
    search: debouncedValue,
  });
  //   React Query Ends

  return (
    <TableWrapper>
      <>
        <HStack justifyContent="flex-end">
          <SearchInput
            setSearchValue={setSearchValue}
            setPageParams={setPageParams}
          />
        </HStack>
        <DataTable
          data={followUp?.results || []}
          columns={followUpColumns({ pageParams })}
          isLoading={isFetching}
          pagination={{
            manual: true,
            pageParams: pageParams,
            pageCount: followUp?.page_count,
            onChangePagination: setPageParams,
          }}
        />
      </>
    </TableWrapper>
  );
};

export default AdminFollowUp;
