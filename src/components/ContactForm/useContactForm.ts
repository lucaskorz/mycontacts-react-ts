import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useImperativeHandle
} from "react";

import isEmailValid from "../../utils/isEmailValid";
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesServices";
import { Categorie } from "../../models/Categories";
import { Contact } from "../../models/Contacts";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import { ContactFormProps, ForwardedRefType } from ".";

type useContactFormProps = {
  props: ContactFormProps
  ref: ForwardedRefType
}

export default function useContactForm({
  props,
  ref
}: useContactFormProps) {
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
      setCategoryId(contact.category.id ?? "")
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

    props.onSubmit!({
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

  return {
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
  }
}
