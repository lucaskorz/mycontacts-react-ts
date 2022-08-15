import { ChangeEvent, FormEvent, useState } from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { Form, ButtonContainer } from "./styles";
import useErrors from '../../hooks/useErrors'

type ContactFormProps = {
  buttonLabel: string;
};

export default function ContactForm({ buttonLabel }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");

  const {
    removeError,
    setError,
    getErrorMessageByFieldName,
    errors
  } = useErrors()

  const isFormValid = (name && errors.length === 0 );

  function handleNameChance(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value)

    if (!event.currentTarget.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' })
    } else {
      removeError('name')
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value))
  }

  return (
    <Form
      onSubmit={() => handleSubmit}
      noValidate
    >
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={!!getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChance}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={!!getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
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
        <Button
          danger={false}
          type="submit"
          disabled={!isFormValid}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}
