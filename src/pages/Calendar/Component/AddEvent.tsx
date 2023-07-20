import { Grid, GridItem } from "@chakra-ui/react";
import FloatingLabelInput from "@nepMeds/components/Form/FloatingLabelInput";
import Select from "@nepMeds/components/Form/Select";
import { IGetDoctorAvailability } from "@nepMeds/service/nepmeds-doctor-availability";
import { colors } from "@nepMeds/theme/colors";
import { AppointmentType, FrequencyType } from "@nepMeds/utils/choices";
import { generateTimeWith15MinutesInterval } from "@nepMeds/utils/timeRange";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BiTime } from "react-icons/bi";

export const AddEvent = ({
  doctorAvailabilityData,
}: {
  doctorAvailabilityData?: IGetDoctorAvailability;
}) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<IGetDoctorAvailability>();
  const options = useMemo(() => {
    return generateTimeWith15MinutesInterval();
  }, []);

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

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pb={8}>
      <GridItem colSpan={4}>
        <Select
          label="Type"
          name="type"
          register={register}
          options={AppointmentType}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          rules={{
            required: "Appointment type is required.",
          }}
          error={errors.type?.message}
        />
      </GridItem>
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
      {doctorAvailabilityData?.frequency ? null : (
        <GridItem colSpan={4}>
          <Select
            label="Frequency"
            name="frequency"
            register={register}
            defaultValue={doctorAvailabilityData?.frequency}
            options={FrequencyType}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
          />
        </GridItem>
      )}
      {watch("frequency") === "Do Not Repeat" && (
        <GridItem colSpan={4}>
          <FloatingLabelInput
            label="Date"
            name="date"
            type="date"
            register={register}
            min={new Date().toString()}
            defaultValue={doctorAvailabilityData?.date}
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
      {/* <GridItem colSpan={2}>
          <FloatingLabelInput
            label="From"
            name="from_time"
            type="time"
            defaultValue={doctorAvailabilityData?.from_time}
            register={register}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "From time is required.",
              validate: validateDateFormat,
            }}
            error={errors.from_time?.message}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FloatingLabelInput
            label="To"
            name="to_time"
            type="time"
            register={register}
            defaultValue={doctorAvailabilityData?.to_time}
            style={{
              background: colors.forminput,
              border: "none",
              paddingTop: "15px",
            }}
            rules={{
              required: "To time is required.",
              validate: validateToDateFormat,
            }}
            error={errors.to_time?.message}
          />
        </GridItem> */}
      <GridItem colSpan={2}>
        <Select
          name="from_time"
          register={register}
          label="From"
          required
          rules={{ required: "From time is required." }}
          error={errors.from_time?.message}
          defaultValue={doctorAvailabilityData?.from_time?.slice(0, 5)}
          placeholder="--:--"
          options={options}
          style={{
            background: colors.forminput,
            border: "none",
            paddingTop: "15px",
          }}
          onChange={(e: any) => {
            const first = options.slice(
              options.findIndex(obj => obj.value === e.target.value) + 1,
              options.length
            );
            setValue("from_time", e.target.value);
            setSecondOptions(first);
          }}
          icon={<BiTime />}
        ></Select>
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
        ></Select>
      </GridItem>
    </Grid>
  );
};
