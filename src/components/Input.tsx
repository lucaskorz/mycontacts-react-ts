import styled, { css } from "styled-components";

interface InputProps {
  error?: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  border: 2px solid #fff;
  border-radius: 4px;
  height: 52px;
  padding: 0 17px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;

Input.defaultProps = {
  error: false
}

export default Input
