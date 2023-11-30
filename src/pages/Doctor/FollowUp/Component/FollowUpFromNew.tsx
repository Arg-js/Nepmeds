import { Button, Divider, Flex, Tooltip } from "@chakra-ui/react";
import { DataTable } from "@nepMeds/components/DataTable";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import FormControl from "@nepMeds/components/Form/FormControl";
import { removeSeconds } from "@nepMeds/helper/checkTimeRange";
import {
  IDate,
  useGetBookedAvailability,
} from "@nepMeds/service/nepmeds-doctor-availability";
import { colors } from "@nepMeds/theme/colors";
import { generateTimeWith15MinutesInterval } from "@nepMeds/utils/index";
import { currentDate } from "@nepMeds/utils/time";
import { CellContext } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CellProps } from "react-table";

const FollowUpFormNew = ({
  formMethods,
}: {
  formMethods: UseFormReturn<{
    from_time: string;
    to_time: string;
    date: string;
  }>;
}) => {
  const [bookedDate, setBookedDate] = useState<IDate[]>([]);
  const options = useMemo(() => {
    return generateTimeWith15MinutesInterval();
  }, []);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;
  const fromTime = watch("from_time");

  // todo: move this function somewhere else
  const getNextTime = useCallback((from_time: string) => {
    // find the index of the inputTime in the options array
    const index = options?.findIndex(option => option.value === from_time);
    // if the input time is found and its not the last element in the array
    if (index !== -1 && index < options.length - 1) {
      // return the next time in the option
      setValue("to_time", options[index + 1].value);
      return [options[index + 1]];
    } else {
      // if the i/p time is not valid or the last element in the array
      return [];
    }
  }, []);

  const columns = [
    {
      header: "S.N.",
      accessorFn: (_cell: CellContext<number, number>, index: number) => {
        return `${index + 1}.`;
      },
    },
    {
      header: "Booked Time",
      cell: ({ row }: CellProps<{ from_time: string; to_time: string }>) => {
        return `${removeSeconds(row.original?.from_time)}-
          ${removeSeconds(row.original?.to_time)}
        `;
      },
    },
  ];

  const date = watch("date");
  // React Query
  const { mutateAsync: getBookedAvailability, isLoading } =
    useGetBookedAvailability();
  // React Query Ends

  return (
    <Flex gap={5} direction={"column"}>
      <Flex gap={3}>
        <FloatingLabelInput
          register={register}
          name={"date"}
          type={"date"}
          label="Date"
          min={currentDate}
        />
        <Tooltip
          hasArrow
          label="Check the booked time for the date you have selected"
        >
          <Button
            variant={"primaryOutline"}
            width={"min-content"}
            onClick={async () => {
              try {
                const response = await getBookedAvailability({ date });
                setBookedDate(response?.data?.data);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Check
          </Button>
        </Tooltip>
      </Flex>
      <DataTable
        data={bookedDate ?? []}
        columns={columns}
        isLoading={isLoading}
      />
      <Divider />
      <Flex gap={3}>
        <FormControl
          control="select"
          register={register}
          name={"from_time"}
          options={options}
          label="From"
          bgColor={colors.forminput}
          error={errors?.from_time?.message ?? ""}
          required
        />
        <FormControl
          control="select"
          register={register}
          name={"to_time"}
          options={getNextTime(fromTime)}
          // value={getNextTime(fromTime)?.[0]?.value}
          label="To"
          bgColor={colors.forminput}
          required
        />
      </Flex>
    </Flex>
  );
};

export { FollowUpFormNew };
