import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';

import { Overlay } from './styles'
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

type LoaderProps = {
  isLoading: boolean
}

export default function Loader({ isLoading = false }: LoaderProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading)

  if (!shouldRender) return null

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  )
}
