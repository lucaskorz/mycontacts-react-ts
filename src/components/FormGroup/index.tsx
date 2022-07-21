import React from "react";
import { Container } from "./styles";

export interface AuxProps {
  children: React.ReactNode;
  error?: string;
}

export default function FormGroup({ children, error }: AuxProps) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
};
