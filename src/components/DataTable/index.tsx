import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import {
  ColumnDef,
  GroupingState,
  PaginationState,
  SortingState,
  Updater,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

export type DataTableProps = {
  data: Record<string, any>[];
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  pinColumnAccess?: boolean;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    pageParams?: {
      pageIndex: number;
      pageSize: number;
    };
    onChangePagination?: (paginationData: Updater<PaginationState>) => void;
  };
  filter?: {
    globalFilter: string;
  };
  sortingColumn?: string;
  setTable?: (table: any) => void;
};

export function DataTable({
  data,
  columns,
  pagination,
  isLoading,
  setTable,
  filter,

  sortingColumn,
}: DataTableProps) {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [stickyColumn, setStickyColumn] = useState<null | number>(null);

  useEffect(() => {
    if (sortingColumn) {
      setSorting([{ id: sortingColumn, desc: false }]);
    }
  }, [sortingColumn]);

  const totalPage = Math.ceil(
    (pagination?.pageCount ?? 0) / (pagination?.pageParams?.pageSize ?? 20)
  );

  const paginationParams = useMemo(
    () =>
      pagination?.manual
        ? {
            manualPagination: true,
            pageCount: totalPage ?? -1,
            state: {
              pagination: {
                pageIndex: pagination.pageParams?.pageIndex ?? 0,
                pageSize: pagination.pageParams?.pageSize ?? 20,
              },
            },
            onPaginationChange: pagination?.onChangePagination,
          }
        : {
            getPaginationRowModel: getPaginationRowModel(),
          },
    [pagination]
  );

  const table = useReactTable({
    columns,
    data,

    state: {
      grouping,
      sorting,
    },
    getFilteredRowModel: getFilteredRowModel(),
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    ...paginationParams,
  });

  useEffect(() => {
    setTable?.(table);
    table.setPageSize(pagination?.pageParams?.pageSize ?? 20);
  }, [table]);

  useEffect(() => {
    table.getHeaderGroups().map(headerGroup =>
      headerGroup.headers.map(({ index }) => {
        columns[index]?.enablePinning && setStickyColumn(index + 1);
      })
    );
  }, [columns, data, table]);

  useEffect(() => {
    table.setGlobalFilter(filter?.globalFilter || "");
  }, [filter?.globalFilter]);

  return (
    <>
      <Box
        overflowX={isLoading ? "hidden" : "scroll"}
        mt={5}
        pb={2}
        css={{
          scrollbarGutter: "stable",
          "&::-webkit-scrollbar": {
            width: "0.2rem",
            height: "0.6rem",
            position: "absolute",
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            background: "#fff",
            opacity: 0.1,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#e9d8fd",
            borderRadius: 20,
          },
        }}
        borderRadius={8}
      >
        <Table bg="white">
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr
                key={headerGroup.id}
                css={{
                  [`th:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 40,
                    boxShadow: "inset 1px 0 0 white,inset -1px 0 0 white",
                  },
                }}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      textTransform="capitalize"
                      whiteSpace="nowrap"
                      bg={colors.table_header}
                      color={colors.primary}
                      fontSize={14}
                      style={{
                        width: `${columns[index]?.size}%` ?? header.getSize(),
                        textAlign:
                          header.id == "Actions" ||
                          header.id == "Action" ||
                          header.colSpan > 1
                            ? "center"
                            : "left",
                      }}
                    >
                      <HStack justifyContent={"space-between"}>
                        <Text flex={1}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </Text>
                      </HStack>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr
                key={row.id}
                css={{
                  [`td:nth-of-type(${stickyColumn})`]: {
                    position: "sticky",
                    left: "-1px",
                    right: "-1px",
                    zIndex: 40,
                    boxShadow: "inset 1px 0 0 #edf2f7,inset -1px 0 0 #edf2f7",
                  },
                  [`td:nth-of-type(${stickyColumn}) , td:not(:last-child)`]: {
                    boxShadow: "inset 1px 0 0 #edf2f7",
                  },
                }}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <Td key={cell.id} pl={4}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {pagination ? (
        <HStack
          justifyContent={"flex-end"}
          float={"right"}
          flexWrap="wrap"
          mt={3}
        >
          <HStack>
            <FormControl variant={"floating"}>
              <Select
                w="70px"
                colorScheme={"purple"}
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Select>
              <FormLabel
                marginInlineStart={"5% !important"}
                marginStart={"5% !important"}
              >
                Items
              </FormLabel>
            </FormControl>
          </HStack>
          <Pagination
            isBackendPaginated={pagination?.manual}
            table={table}
            pageIndex={pagination?.pageParams?.pageIndex}
            pageCount={pagination?.pageCount ?? data?.length}
          />
        </HStack>
      ) : (
        ""
      )}
    </>
  );
}
