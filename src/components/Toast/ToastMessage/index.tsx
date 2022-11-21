import { Container } from "./styles";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg'

type ToastProps = {
  text: string
  type?: 'default' | 'success' | 'danger'
}

export default function ToastMessage({ text, type }: ToastProps) {
  return (
    <Container>
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  )
}

ToastMessage.defaultProps = {
  type: 'default'
}
