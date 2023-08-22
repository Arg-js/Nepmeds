import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@nepMeds/assets/svgs";
import { useSpecializationRegisterData } from "@nepMeds/service/nepmeds-specialization";
import { useGetSymptoms } from "@nepMeds/service/nepmeds-symptoms";
import { colors } from "@nepMeds/theme/colors";
import React, { Dispatch, SetStateAction } from "react";

const GenderList = [
  { label: "Male Doctor", value: "Male" },
  { label: "Female Doctor", value: "Female" },
  { label: "Others", value: "Other" },
];

interface IDateParams {
  from_date: string;
  to_date: string;
}

interface IPageParams {
  page: number;
  limit: number;
}
const DoctorListFilter: React.FC<{
  setGender: Dispatch<SetStateAction<string[]>>;
  setSpecialization: Dispatch<SetStateAction<string[]>>;
  setSymptom: Dispatch<SetStateAction<string[]>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setDateParams: Dispatch<SetStateAction<IDateParams>>;
  setPageParams: Dispatch<SetStateAction<IPageParams>>;
  dateParams: IDateParams;
  pageParams: IPageParams;
}> = ({
  setGender,
  setSpecialization,
  setSymptom,
  setSearchValue,
  setDateParams,
  dateParams,
  setPageParams,
  pageParams,
}) => {
  // REACT QUERIES
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: specializaionData = [] } = useSpecializationRegisterData();
  // REACT QUERIES END

  return (
    <Box display={"flex"} gap={"2"} flexDirection={"column"}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          onChange={e => {
            setSearchValue(e.target.value);
            setPageParams({ ...pageParams, page: 1 });
          }}
          placeholder="Search by doctors name"
        />
      </InputGroup>
      <Box width={"277px"} border={`0.5px solid ${colors.gray_border}`} p={6}>
        <Flex direction={"column"} gap={3}>
          {/* HEADING */}
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontWeight={700} fontSize={"16px"}>
              Filters
            </Text>
            <Text
              fontWeight={500}
              fontSize={"12px"}
              color={colors.primary}
              textDecoration={"underline"}
              cursor={"pointer"}
              onClick={() => {
                setGender([]);
                setSpecialization([]);
                setSymptom([]);
              }}
            >
              Clear All
            </Text>
          </Flex>
          <Divider />
          <Flex gap={2} justifyContent="center">
            <Input
              type={"date"}
              onChange={e => {
                setDateParams({ ...dateParams, from_date: e.target.value });
                setPageParams({ ...pageParams, page: 1 });
              }}
            />
            <Text>-</Text>
            <Input
              type={"date"}
              onChange={e => {
                setDateParams({ ...dateParams, to_date: e.target.value });
                setPageParams({ ...pageParams, page: 1 });
              }}
            />
          </Flex>
          <Box>
            <Text fontWeight={600} fontSize={"16px"} mb={3}>
              Gender
            </Text>
            {GenderList.map(gender => {
              return (
                <Flex gap={4} key={gender.value} mb={2}>
                  <Checkbox
                    onChange={e => {
                      setGender(prev =>
                        e.target.checked
                          ? [...prev, gender.value]
                          : prev.filter(item => item !== gender.value)
                      );
                      setPageParams({ ...pageParams, page: 1 });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {gender.label}
                  </Text>
                </Flex>
              );
            })}
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={"16px"} mb={3}>
              Specialization
            </Text>
            {specializaionData.map(specialization => {
              return (
                <Flex gap={4} key={specialization.id} mb={2}>
                  <Checkbox
                    onChange={e => {
                      setSpecialization(prev =>
                        e.target.checked
                          ? [...prev, specialization.name]
                          : prev.filter(item => item !== specialization.name)
                      );
                      setPageParams({ ...pageParams, page: 1 });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {specialization.name}
                  </Text>
                </Flex>
              );
            })}
          </Box>
          <Box>
            <Text fontWeight={600} fontSize={"16px"} mb={3}>
              Health Concern
            </Text>
            {symptomData.map(symptom => {
              return (
                <Flex gap={4} key={symptom.id} mb={2}>
                  <Checkbox
                    onChange={e => {
                      setSymptom(prev =>
                        e.target.checked
                          ? [...prev, symptom.name]
                          : prev.filter(item => item !== symptom.name)
                      );
                      setPageParams({ ...pageParams, page: 1 });
                    }}
                  />
                  <Text fontWeight={500} fontSize={"13px"}>
                    {symptom.name}
                  </Text>
                </Flex>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DoctorListFilter;
