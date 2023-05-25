import {
  Button,
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
          <ModalBody style={{ textAlign: alignment }}>{children}</ModalBody>

          <ModalFooter justifyContent="center">
            {footer || (
              <>
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
                {secondaryText && (
                  <Button variant="ghost" onClick={otherAction}>
                    {secondaryText}
                  </Button>
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
  alignment?: any;
}

export default ModalComponent;
