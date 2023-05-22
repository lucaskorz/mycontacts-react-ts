import { useEffect, useRef } from "react";
import { Container } from "./styles";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";
import { ToastContainerProps } from "../ToastContainer";

export type VariantsType = "default" | "success" | "danger";

type ToastProps = {
  message: ToastContainerProps;
  onRemoveMessage: (id: number) => void;
  onAnimationEnd: (id: number) => void;
  isLeaving: boolean;
};

export default function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  onAnimationEnd,
}: ToastProps) {
  const animatedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = animatedElementRef.current;
    if (isLeaving) {
      elementRef?.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      elementRef?.removeEventListener("animationend", handleAnimationEnd);
    }
  }, [isLeaving, message.id, onAnimationEnd]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => clearTimeout(timeoutId);
  }, [message, onRemoveMessage]);

  const handleRemoveToast = () => onRemoveMessage(message.id);

  return (
    <Container
      type={message.type as VariantsType}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {message.type === "danger" && <img src={xCircleIcon} alt="X" />}
      {message.type === "success" && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}
