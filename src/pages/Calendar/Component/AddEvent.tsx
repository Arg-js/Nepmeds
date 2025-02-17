import { Grid, GridItem } from "@chakra-ui/react";
import Checkbox from "@nepMeds/components/Form/Checkbox";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import { AVAILABILITYFREQUENCY } from "@nepMeds/config/enum";
import { IGetDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { colors } from "@nepMeds/theme/colors";
import { FrequencyType } from "@nepMeds/utils/choices";
import { generateTimeWith15MinutesInterval } from "@nepMeds/utils/timeRange";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiTime } from "react-icons/bi";

const today = new Date().toISOString().split("T")[0];

export const AddEvent = ({
  doctorAvailabilityData,
  selectedFullDate,
}: {
  doctorAvailabilityData?: IGetDoctorAvailability;
  selectedFullDate?: string;
}) => {
  const {
    register,
    watch,
    control,
    reset,
    formState: { errors },
  } = useFormContext<IGetDoctorAvailability>();
  const options = useMemo(() => {
    return generateTimeWith15MinutesInterval();
  }, []);

  useEffect(() => {
    reset({ frequency: doctorAvailabilityData?.frequency });
  }, [doctorAvailabilityData]);

  const [secondOptions, setSecondOptions] = useState<any>(
    doctorAvailabilityData
      ? options.slice(
          options.findIndex(
            obj => obj.value === doctorAvailabilityData?.from_time?.slice(0, 5)
          ) + 1,
          options.length
        )
      : []
  );

  const frequencyValue = watch("frequency");
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
      <GridItem colSpan={4}>
        <FloatingLabelInput
          label="Title"
          name="title"
          register={register}
          defaultValue={doctorAvailabilityData?.title}
          required
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Title is required.",
          }}
          error={errors.title?.message}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Select
          label="Frequency"
          name="frequency"
          register={register}
          isDisabled={!!doctorAvailabilityData}
          defaultValue={doctorAvailabilityData?.frequency}
          options={FrequencyType}
          required
          rules={{
            required: "Frequency is required.",
          }}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          error={errors.frequency?.message}
        />
      </GridItem>

      <GridItem colSpan={4}>
        <FloatingLabelInput
          label="Date"
          name="date"
          type="date"
          register={register}
          required
          min={today}
          defaultValue={selectedFullDate ?? today}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Date is required.",
          }}
          error={errors.date?.message}
        />
      </GridItem>

      {frequencyValue === AVAILABILITYFREQUENCY.Custom.toString() && (
        <GridItem colSpan={4}>
          <FloatingLabelInput
            label="To Date"
            name="to_date"
            type="date"
            register={register}
            required
            min={today}
            defaultValue={today}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "Date is required.",
            }}
            error={errors.date?.message}
          />
        </GridItem>
      )}

      <GridItem colSpan={2}>
        <Select
          name="from_time"
          register={register}
          label="From"
          required
          rules={{ required: "From time is required" }}
          error={errors.from_time?.message}
          defaultValue={doctorAvailabilityData?.from_time?.slice(0, 5)}
          placeholder="--:--"
          options={options}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          onClick={(e: any) => {
            const first = options.slice(
              options.findIndex(obj => obj.value === e.target.value) + 1,
              options.length
            );

            setSecondOptions(first);
          }}
          icon={<BiTime />}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Select
          name="to_time"
          register={register}
          rules={{ required: "To time is required." }}
          error={errors.to_time?.message}
          required
          label="To"
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          defaultValue={doctorAvailabilityData?.to_time?.slice(0, 5)}
          placeholder="--:--"
          options={secondOptions}
          icon={<BiTime />}
        />
      </GridItem>
      {doctorAvailabilityData &&
        doctorAvailabilityData?.frequency !==
          AVAILABILITYFREQUENCY.Do_Not_Repeat.toString() && (
          <GridItem colSpan={4}>
            <Checkbox
              label="Do you want to edit all the instances"
              name={"is_all_related_child"}
              control={control}
              justifyContent={"center"}
              alignItems={"center"}
            />
          </GridItem>
        )}
    </Grid>
  );
};
