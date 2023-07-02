import { useState, useEffect } from "react";
import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { toastEventManager, ToastParams } from "../../../utils/toast";
import useAnimatedList from "../../../hooks/useAnimatedList";

export type ToastContainerProps = {
  id: number;
  type: string;
  text: string;
  duration?: number;
};

export default function ToastContainer() {
  const {
    handleRemoveItem,
    renderList,
    setItems: setMessages,
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }: ToastParams) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
