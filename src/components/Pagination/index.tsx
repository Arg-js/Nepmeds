import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  HStack,
  Select,
  IconButton,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";

interface PaginationProps {
  enabled: boolean;
  queryPageSize: number;
  pageSizeChange?: (size: number) => void;
  queryPageIndex: number;
  pageChange?: (page: number) => void;
  totalCount: number;
}
export function getPager(
  totalRows: number,
  _: number,
  pageLimit: number
): Array<number> {
  if (totalRows <= pageLimit) return [1];
  const totalPages = Math.ceil(totalRows / pageLimit);
  const totalPageArray = Array.from(Array(totalPages), (_, i) => i + 1);
  return totalPageArray;
}
export const Pagination = ({
  enabled,
  queryPageSize,
  pageSizeChange,
  queryPageIndex,
  pageChange,
  totalCount,
}: PaginationProps) => {
  return enabled && totalCount > 5 ? (
    <Box px={{ base: "4", md: "6" }} p="5" pt={8}>
      <HStack justifyContent="center">
        {pageSizeChange && (
          <HStack spacing={10}>
            <Select
              value={queryPageSize}
              width="81px"
              borderRadius="6px"
              size="sm"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                pageSizeChange?.(parseInt(e.target.value));
              }}
            >
              <option value={""} disabled>
                Select option
              </option>
              {[5, 10, 20, 30].map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>
            <Text fontSize="sm">
              Showing {queryPageSize > totalCount ? totalCount : queryPageSize}{" "}
              of {totalCount}
            </Text>
          </HStack>
        )}
        <HStack>
          <IconButton
            aria-label="Search services"
            size="sm"
            bgColor={colors.white}
            borderRadius={"29px"}
            height="30px"
            width="30px"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            boxShadow={`0px 0px 3px rgba(0, 0, 0, 0.5)`}
            isDisabled={queryPageIndex === 1}
            onClick={() => {
              pageChange?.(queryPageIndex - 1);
            }}
            icon={<ChevronLeftIcon fill={colors.gray} />}
            sx={{
              "&:disabled": {
                bg: colors.gray,
              },
            }}
          />
          <Box>
            {getPager(totalCount, queryPageIndex, queryPageSize).map(index => {
              return (
                index === queryPageIndex - 4 && (
                  <Button type="submit" key={index} variant={"ghost"}>
                    {"..."}
                  </Button>
                )
              );
            })}
            {getPager(totalCount, queryPageIndex, queryPageSize).map(
              (page, index) => {
                return (
                  index >= queryPageIndex - 3 &&
                  index < queryPageIndex + 2 && (
                    <Button
                      type="submit"
                      key={index}
                      sx={{
                        bgColor:
                          queryPageIndex === page
                            ? colors.primary
                            : "transparent",
                        borderRadius: "50%",
                        w: "40px",
                        h: "40px",
                        transition: "all 300ms ease-in-out",
                        textAlign: "center",
                        lineHeight: "40px",
                        color: queryPageIndex === page ? colors.white : "#000",
                        "&:hover": {
                          bgColor: colors.primary,
                          color: colors.white,
                        },
                      }}
                      fontSize="18px"
                      fontFamily="'Urbanist', sans-serif"
                      cursor="pointer"
                      onClick={() => {
                        pageChange?.(page);
                      }}
                    >
                      {page}
                    </Button>
                  )
                );
              }
            )}
            {getPager(totalCount, queryPageIndex, queryPageSize).map(index => {
              return (
                index === queryPageIndex + 2 && (
                  <Button key={index} variant={"ghost"}>
                    {"..."}
                  </Button>
                )
              );
            })}
          </Box>
          <IconButton
            aria-label="Search services"
            size="sm"
            variant="unstyled"
            fontSize="14px"
            fontWeight="medium"
            bgColor={colors.white}
            borderRadius={"29px"}
            height="30px"
            width="30px"
            boxShadow={` 0px 0px 3px rgba(0, 0, 0, 0.5)`}
            onClick={() => {
              pageChange?.(queryPageIndex + 1);
            }}
            isDisabled={queryPageIndex * queryPageSize >= totalCount}
            icon={<ChevronRightIcon />}
            sx={{
              "&:disabled": {
                bg: colors.gray,
              },
            }}
          />
        </HStack>
      </HStack>
    </Box>
  ) : null;
};

export default Pagination;
