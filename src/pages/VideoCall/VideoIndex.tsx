import { Button, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import ModalComponent from "@nepMeds/components/Form/ModalComponent";
import { useState } from "react";
import VideoCall from ".";
import { useNavigate } from "react-router-dom";
import { images } from "@nepMeds/assets/images";

const VideoIndex = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onCloseModal = () => {
    navigate(-1);
    onClose();
  };

  return (
    <div>
      <ModalComponent
        heading={
          <HStack>
            <Image src={images.smallLogo} width={"30px"} />
            <Text>Call Ended</Text>
          </HStack>
        }
        isOpen={isOpen}
        onClose={onCloseModal}
        size={"xl"}
        footer={
          <>
            <Button onClick={onCloseModal}>Done</Button>
          </>
        }
      >
        <>{message}</>
      </ModalComponent>

      {!isOpen && <VideoCall onOpen={onOpen} setMessage={setMessage} />}
    </div>
  );
};

export default VideoIndex;
