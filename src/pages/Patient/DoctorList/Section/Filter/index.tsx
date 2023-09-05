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
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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

interface ILocationState {
  specialization: string;
  symptom: string;
}

const dateToday = new Date(Date.now()).toISOString().split("T")[0];

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
  const location = useLocation();
  const state = location.state as ILocationState;

  // REACT QUERIES
  const { data: symptomData = [] } = useGetSymptoms();
  const { data: specializationData = [] } = useSpecializationRegisterData();
  // REACT QUERIES END

  const genderFiltersRef = useRef<HTMLInputElement[]>([]);
  const specializationFiltersRef = useRef<HTMLInputElement[]>([]);
  const symptomFiltersRef = useRef<HTMLInputElement[]>([]);
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  // TODO: LOGIC IS REDUNDANT IN BOTH USE EFFECT, TRY TO MAKE A CONCISE FUNCTION FOR REUSABILITY
  useEffect(() => {
    if (state?.specialization && specializationData) {
      for (let i = 0; i < specializationData.length; i++) {
        if (specializationData[i].name === state.specialization)
          specializationFiltersRef.current[i].checked = true;
      }
    }
  }, [state?.specialization, specializationData]);

  useEffect(() => {
    if (state?.symptom && symptomData) {
      for (let i = 0; i < symptomData.length; i++) {
        if (symptomData[i].name === state.symptom)
          specializationFiltersRef.current[i].checked = true;
      }
    }
  }, [state?.symptom, symptomData]);

  const clearAllFilter = () => {
    for (let i = 0; i < genderFiltersRef.current.length; i++) {
      genderFiltersRef.current[i].checked = false;
    }

    for (let i = 0; i < specializationFiltersRef.current.length; i++) {
      specializationFiltersRef.current[i].checked = false;
    }

    for (let i = 0; i < symptomFiltersRef.current.length; i++) {
      symptomFiltersRef.current[i].checked = false;
    }

    if (dateFromRef.current && dateToRef.current) {
      dateFromRef.current.value = "";
      dateToRef.current.value = "";
    }
  };

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
          fontSize={"xs"}
        />
      </InputGroup>
      <Box border={`0.5px solid ${colors.gray_border}`} p={6}>
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
                clearAllFilter();
                setGender([]);
                setSpecialization([]);
                setSymptom([]);
                setDateParams({
                  from_date: "",
                  to_date: "",
                });
              }}
            >
              Clear All
            </Text>
          </Flex>
          <Divider />
          <Flex gap={2} justifyContent="center" wrap={"wrap"}>
            <Input
              type={"date"}
              ref={dateFromRef}
              defaultValue={dateToday}
              onChange={e => {
                setDateParams({ ...dateParams, from_date: e.target.value });
                setPageParams({ ...pageParams, page: 1 });
              }}
            />
            <Text>-</Text>
            <Input
              type={"date"}
              ref={dateToRef}
              defaultValue={dateToday}
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
            {GenderList.map((gender, index) => {
              return (
                <Flex gap={4} key={gender.value} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element) genderFiltersRef.current[index] = element;
                    }}
                    isChecked={genderFiltersRef?.current[index]?.checked}
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
            {specializationData.map((specialization, index) => {
              return (
                <Flex gap={4} key={specialization.id} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element)
                        specializationFiltersRef.current[index] = element;
                    }}
                    isChecked={
                      specializationFiltersRef?.current[index]?.checked
                    }
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
            {symptomData.map((symptom, index) => {
              return (
                <Flex gap={4} key={symptom.id} mb={2}>
                  <Checkbox
                    ref={element => {
                      if (element) symptomFiltersRef.current[index] = element;
                    }}
                    isChecked={symptomFiltersRef?.current[index]?.checked}
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
