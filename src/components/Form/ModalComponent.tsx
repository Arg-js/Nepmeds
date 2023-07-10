import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { colors } from "@nepMeds/theme/colors";
import { ReactNode } from "react";
import { ApproveButton, RejectButton } from "../Button/Button";

const ModalComponent = ({
  heading,
  children,
  primaryText,
  secondaryText,
  isOpen,
  onApiCall,
  onClose,
  size,
  otherAction,
  footer,
  alignment,
  approve,
  reject,
}: IModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <Divider mb={3} />
          <ModalBody style={{ textAlign: alignment }}>{children}</ModalBody>

          <ModalFooter
            justifyContent="center"
            gap={3}
            flexDirection={approve ? "row-reverse" : "row"}
          >
            {footer || (
              <>
                {approve ? (
                  <ApproveButton
                    mr={3}
                    onClick={onApiCall || onClose}
                    background={colors.primary}
                    color={colors.white}
                    borderRadius={12}
                    size="md"
                  >
                    <Icon as={CheckIcon} fontSize={20} m={3} />

                    {primaryText}
                  </ApproveButton>
                ) : (
                  <Button
                    mr={3}
                    onClick={onApiCall || onClose}
                    background={colors.primary}
                    color={colors.white}
                    borderRadius={12}
                    size="md"
                  >
                    {primaryText}
                  </Button>
                )}
                {!reject && secondaryText ? (
                  <Button variant="ghost" onClick={otherAction}>
                    {secondaryText}
                  </Button>
                ) : (
                  <RejectButton mr={3} onClick={otherAction}>
                    <Icon
                      as={CloseIcon}
                      fontSize={20}
                      color={colors.error}
                      m={3}
                    />

                    {secondaryText}
                  </RejectButton>
                )}
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface IModalProps {
  heading: JSX.Element;
  children: JSX.Element | JSX.Element[];
  primaryText?: string;
  secondaryText?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalProps["size"];
  onApiCall?: () => void;
  otherAction?: () => void;
  footer?: ReactNode;
  approve?: ReactNode;
  reject?: ReactNode;
  alignment?: any;
}

export default ModalComponent;
