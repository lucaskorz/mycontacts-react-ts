import { ChangeEvent, FormEvent, useState } from "react";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { Form, ButtonContainer } from "./styles";

type ContactFormProps = {
  buttonLabel: string;
};

type Errors = {
  field: string
  message: string
}

export default function ContactForm({ buttonLabel }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Errors[]>([]);

  function handleNameChance(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value)

    if (!event.currentTarget.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Nome é obrigatório' }
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (errs) => errs.field !== 'name'
      ))
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Form
      onSubmit={() => handleSubmit}
    >
      <FormGroup>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => handleNameChance(e)}
        />
      </FormGroup>

      <FormGroup error="O formato do e-mail é inválido">
        <Input
          placeholder="E-mail"
          error
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button danger={false} type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
