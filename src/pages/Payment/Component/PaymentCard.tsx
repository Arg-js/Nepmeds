import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IPaymentCard {
  name?: string;
  image?: string;
  onClickView: () => void;
  onClickEdit: () => void;
}

const PaymentCard = ({
  name,
  image,
  onClickView,
  onClickEdit,
}: IPaymentCard) => {
  return (
    <>
      <Card
        boxShadow={"0px 4px 32px 0px rgba(61, 70, 112, 0.08)"}
        w={"440px"}
        h={"90px"}
        mb={"50px"}
      >
        <CardHeader
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          mt={"-40px"}
          bg={"#F4F4F4"}
          maxH={"70px"}
        >
          <Image src={image} h={"70px"} w={"70px"} mb={"-15%"} />
        </CardHeader>
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Text>{name}</Text>
            <Menu>
              <MenuButton as={Button} variant={"unstyled"}>
                <BsThreeDotsVertical />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    onClickView();
                  }}
                >
                  View
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onClickEdit();
                  }}
                >
                  Edit
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default PaymentCard;
