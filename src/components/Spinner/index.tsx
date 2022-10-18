import { StyledSpinner } from './styles'

type SpinnerProps = {
  size?: number
}

const defaultProps: SpinnerProps = {
  size: 32
}

export default function Spinner({ size }: SpinnerProps) {
  return <StyledSpinner size={size} />;
}

Spinner.defaultProps = defaultProps
