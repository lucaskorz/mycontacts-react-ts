import React from "react";
import { Container } from "./styles";

export interface AuxProps {
  children: React.ReactNode;
}

export default function FormGroup({ children }: AuxProps) {
  return <Container>{children}</Container>;
}
