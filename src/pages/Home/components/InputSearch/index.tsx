import { ChangeEvent } from "react";
import { Container } from "./styles";

interface InputSearchProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function InputSearch({ value, onChange }: InputSearchProps) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        placeholder="Pesquise pelo nome..."
        onChange={onChange}
      />
    </Container>

  )
}
