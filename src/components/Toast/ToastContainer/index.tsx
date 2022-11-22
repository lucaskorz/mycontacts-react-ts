import { useState, useEffect } from 'react'
import { Container } from './styles'
import ToastMessage, { VariantsType } from '../ToastMessage'

type ToastContainerProps = {
  id: number
  type: string
  text: string
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastContainerProps[]>([])

  useEffect(() => {
    function handleAddToast(event: CustomEventInit<{ type: string, text: string }>) {
        const { type, text } = event.detail!

        setMessages((prevState) => [
          ...prevState,
          {
            id: Math.random(), type, text
          }
        ])
    }
    document.addEventListener('addtoast', handleAddToast)

    return () => {
      document.removeEventListener('addtoast', handleAddToast)
    }
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type as VariantsType}
          text={message.text}
        />
      ))}
    </Container>
  )
}
