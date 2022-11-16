import { ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner";
import { StyledButton } from "./styles";

type ButtonProps = {
  type?: string
  disabled?: boolean
  isLoading?: boolean
  danger?: boolean
  children?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const defaultProps: ButtonProps = {
  type: "button",
  disabled: false,
  isLoading: false,
  danger: false,
  children: null
}

function Button({
    type,
    disabled,
    isLoading,
    children,
    danger
  }: ButtonProps ) {
  return (
    <StyledButton
      danger={danger}
      type={type as "button"}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  )
}

Button.defaultProps = defaultProps

export default Button
