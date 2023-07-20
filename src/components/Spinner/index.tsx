import { StyledSpinner } from './styles'

type SpinnerProps = {
  size?: number
}

export default function Spinner({
  size = 32
}: SpinnerProps) {
  return <StyledSpinner size={size} />;
}
