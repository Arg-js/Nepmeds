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
import { PAYMENTMODE } from "@nepMeds/config/enum";
import { IPaymentMethodDoctorAmount } from "@nepMeds/service/nepmeds-payment";
import { colors } from "@nepMeds/theme/colors";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IPaymentCard {
  name?: string;
  image?: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
  data?: IPaymentMethodDoctorAmount | undefined;
}

const PaymentCard = ({
  name,
  image,
  onClickDelete,
  onClickEdit,
  data,
}: IPaymentCard) => {
  return (
    <Card
      boxShadow={"0px 4px 32px 0px rgba(61, 70, 112, 0.08)"}
      h={"90px"}
      mb={"50px"}
    >
      <CardHeader
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        bg={"#F4F4F4"}
        maxH={"80px"}
        borderTopRadius={10}
      >
        <Image src={image} h={"70px"} w={"70px"} />
        {data?.is_primary_method && (
          <AiFillCheckCircle color="green" size={25} />
        )}
      </CardHeader>
      <CardBody
        bg={colors.white}
        boxShadow={"md"}
        p={3}
        borderBottomRadius={10}
      >
        <Flex justifyContent={"space-between"}>
          <Flex gap={5}>
            <Text fontWeight={"bold"}>{name}</Text>
            <Text>
              {data?.payment_mode.toString() === PAYMENTMODE.BANK.toString()
                ? data?.bank_name
                : data?.epayment_id}
            </Text>
          </Flex>
          <Menu>
            <MenuButton as={Button} variant={"unstyled"}>
              <BsThreeDotsVertical />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  onClickEdit();
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClickDelete();
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
