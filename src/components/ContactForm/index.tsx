import { forwardRef, ForwardedRef, ChangeEvent } from "react";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { Form, ButtonContainer } from "./styles";
import { Contact } from "../../models/Contacts";
import useContactForm from "./useContactForm";
import { Categorie } from "../../models/Categories";

export type ContactFormProps = {
  buttonLabel: string;
  onSubmit: (formData: any) => void;
};

export type ForwardedReferences = {
  setFieldsValues?: (contact: Contact) => void;
  resetFields?: () => void;
}

export type ForwardedRefType = ForwardedRef<ForwardedReferences>

export default forwardRef((
  props: ContactFormProps,
  ref: ForwardedRefType
) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChance,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    isFormValid,
    setCategoryId
  } = useContactForm({ props, ref })

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName("name")}>
        <Input
          error={!!getErrorMessageByFieldName("name")}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChance}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName("email")}>
        <Input
          error={!!getErrorMessageByFieldName("email")}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Categoria</option>

          {categories.map((category: Categorie) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          danger={false}
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {props.buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});
