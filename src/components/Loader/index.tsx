import ReactDOM from 'react-dom'

import { Overlay } from './styles'

type LoaderProps = {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader"></div>
    </Overlay>,
    document.getElementById('loader-root') as HTMLElement
  )
}
