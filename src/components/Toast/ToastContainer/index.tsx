import { useState, useEffect } from 'react'
import { Container } from './styles'
import ToastMessage, { VariantsType } from '../ToastMessage'
import { toastEventManager } from '../../../utils/toast'

export type ToastContainerProps = {
  id: number
  type: string
  text: string
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastContainerProps[]>([])

  useEffect(() => {
    function handleAddToast({ type, text }: { type: string, text: string }) {
        setMessages((prevState) => [
          ...prevState,
          {
            id: Math.random(), type, text
          }
        ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  function handleRemoveMessage(id: number) {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id
    ))
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
