import { useEffect } from "react";
import { Container } from "./styles";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'
import { ToastContainerProps } from "../ToastContainer";

export type VariantsType = 'default' | 'success' | 'danger'

type ToastProps = {
  message: ToastContainerProps
  onRemoveMessage: (id: number) => void
}

export default function ToastMessage({
  message,
  onRemoveMessage
}: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 7000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [message, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      type={message.type as VariantsType}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  )
}
