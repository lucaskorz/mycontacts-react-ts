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

function Button({
    type = 'button',
    disabled = false,
    isLoading = false,
    children = null,
    danger = false,
    onClick
  }: ButtonProps ) {
  return (
    <StyledButton
      danger={danger}
      type={type as "button"}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  )
}

export default Button
