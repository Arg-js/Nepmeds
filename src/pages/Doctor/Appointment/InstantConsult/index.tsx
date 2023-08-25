import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { DownIcon, FilterIcon, SearchLargeIcon } from "@nepMeds/assets/svgs";
import { DataTable } from "@nepMeds/components/DataTable";

const InstantConsult: React.FC = () => {
  const column = [
    { header: "S.N" },
    { header: "Date" },
    { header: "Name" },
    { header: "Symtoms" },
    { header: "Status" },
    { header: "Actions" },
  ];
  return (
    <>
      {/* TABLE HEADER */}
      <HStack justifyContent="space-between">
        <Text>Instant Appointments</Text>
        <HStack>
          {/* Search Field */}
          <InputGroup>
            {/* TODO: add space between icon and the text */}
            <InputLeftElement marginRight={3}>
              <SearchLargeIcon />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          {/* ends */}
          <Button leftIcon={<FilterIcon />} variant="outline">
            Filter
          </Button>
          <Button rightIcon={<DownIcon />} variant="outline">
            Bulk Action
          </Button>
        </HStack>
      </HStack>
      <DataTable data={[]} columns={column} />
    </>
  );
};

export default InstantConsult;
