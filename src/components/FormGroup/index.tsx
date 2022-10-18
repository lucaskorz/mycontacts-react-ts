import React from "react";
import Spinner from "../Spinner";
import { Container } from "./styles";

export interface AuxProps {
  children: React.ReactNode;
  error?: string;
  isLoading?: boolean;
}

export default function FormGroup({ children, error, isLoading }: AuxProps) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>

      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.defaultProps = {
  error: null,
  isLoading: false
};
