import { useState, useEffect, useCallback } from "react";
import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { toastEventManager, ToastParams } from "../../../utils/toast";

export type ToastContainerProps = {
  id: number;
  type: string;
  text: string;
  duration?: number;
};

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastContainerProps[]>([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState<
    number[]
  >([]);

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
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setPendingRemovalMessagesIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id: number) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== id)
    );

    setPendingRemovalMessagesIds((prevState) =>
      prevState.filter((messageId) => messageId !== id)
    );
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
