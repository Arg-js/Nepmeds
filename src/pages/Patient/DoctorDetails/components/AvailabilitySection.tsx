import { SimpleGrid, Button, Text } from "@chakra-ui/react";
import { IAvailability } from "@nepMeds/service/nepmeds-patient-doctorList";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction } from "react";

interface IAvailabilitySection {
  title: string;
  availability: IAvailability[];
  selectedAvailability: number[];
  setSelectedAvailability: Dispatch<SetStateAction<number[]>>;
}

// CHECKS AMIABILITY
const hasAvailability = ({
  availability,
  isMorningBlock,
}: {
  availability: IAvailability[];
  isMorningBlock: boolean;
}) => {
  return availability?.some(({ from_time }) =>
    isMorningBlock
      ? +from_time.split(":")[0] <= 11
      : +from_time.split(":")[0] > 11
  );
};

const AvailabilitySection = ({
  title,
  availability,
  selectedAvailability,
  setSelectedAvailability,
}: IAvailabilitySection) => {
  const isMorningBlock = title === "Morning";
  return (
    <>
      {hasAvailability({ availability, isMorningBlock }) && (
        <Text fontWeight={600} fontSize={"md"} color={colors.black_60}>
          {title}
        </Text>
      )}

      <SimpleGrid gridTemplateColumns={"repeat(auto-fit, minmax(90px, 1fr))"}>
        {availability?.map(data => {
          // isMorning === true ---> ie. time < 12:00
          // isMorning === false ---> ie. time > 12:00
          const isMorning = +data?.from_time.split(":")[0] <= 11;

          if (isMorning === isMorningBlock) {
            return (
              <Button
                variant={"primaryOutlineFilled"}
                key={data.id}
                borderRadius={3}
                height={"34px"}
                m={1}
                sx={{
                  bg: `${
                    selectedAvailability.includes(data.id)
                      ? colors.sky_blue
                      : "transparent"
                  }`,
                }}
                onClick={() =>
                  setSelectedAvailability(prev =>
                    prev.includes(data.id)
                      ? prev.filter(item => item !== data.id)
                      : [...prev, data.id]
                  )
                }
              >
                {data?.from_time?.slice(0, 5)} - {data?.to_time?.slice(0, 5)}
              </Button>
            );
          }
        })}
      </SimpleGrid>
    </>
  );
};

export default AvailabilitySection;
