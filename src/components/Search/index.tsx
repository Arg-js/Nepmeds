import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputGroupProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { Dispatch, SetStateAction } from "react";
interface ISearchInput extends InputGroupProps {
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPageParams: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}
const SearchInput = ({
  setSearchValue,
  setPageParams,
  ...rest
}: ISearchInput) => {
  return (
    <InputGroup borderColor={colors.grey_dark} w={60} {...rest}>
      <InputLeftElement pointerEvents="none" h={10}>
        <SearchIcon color={colors.grey_dark} boxSize={6} />
      </InputLeftElement>
      <Input
        h={10}
        onChange={({ target: { value } }) => {
          setSearchValue(value);
          setPageParams({ pageIndex: 0, pageSize: 10 });
        }}
        // TODO: MAKE this left and add gap
        textAlign={"center"}
        placeholder={"Search"}
      />
    </InputGroup>
  );
};

export default SearchInput;
