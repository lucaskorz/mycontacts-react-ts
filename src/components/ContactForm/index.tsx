import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle
} from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { Form, ButtonContainer } from "./styles";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesServices";
import { Categorie } from "../../models/Categories";
import { Contact } from "../../models/Contacts";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";

type ContactFormProps = {
  buttonLabel: string;
  onSubmit: (formData: Contact) => void;
};
export type ForwardedReferences = {
  setFieldsValues?: (contact: Contact) => void;
  resetFields?: () => void;
}
type ForwardedRefType = ForwardedRef<ForwardedReferences>

export default forwardRef((
  props: ContactFormProps,
  ref: ForwardedRefType
) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    removeError,
    setError,
    getErrorMessageByFieldName,
    errors
  } = useErrors();

  const isFormValid = name && errors.length === 0;

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact: Contact): void => {
      setName(contact.name ?? "")
      setEmail(contact.email ?? "")
      setPhone(formatPhone(contact.phone ?? ""))
      setCategoryId(contact.category_id ?? "")
    },
    resetFields: (): void => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    }
  }), [])

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList: Categorie[] = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch (error) {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChance(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);

    if (!event.currentTarget.value) {
      setError({ field: "name", message: "Nome é obrigatório" });
    } else {
      removeError("name");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSubmitting(true);

    await props.onSubmit({
      name,
      email,
      phone,
      category_id: categoryId,
    });

    setIsSubmitting(false);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail inválido" });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
  }

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
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Categoria</option>

          {categories.map((category) => (
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
