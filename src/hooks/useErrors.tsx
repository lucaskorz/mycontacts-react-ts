import { useState } from "react";

type Errors = {
  field: string;
  message: string;
};

export default function useErrors() {
  const [errors, setErrors] = useState<Errors[]>([]);

  function setError({ field, message }: Errors) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) =>
      prevState.filter((errs) => errs.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName: string): string | undefined {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  };
}
