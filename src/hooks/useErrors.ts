import { useCallback, useState } from "react";

type Errors = {
  field: string;
  message: string;
};

export default function useErrors() {
  const [errors, setErrors] = useState<Errors[]>([]);

  const setError = useCallback(({ field, message }: Errors) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) return;

    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors])

  const removeError = useCallback((fieldName: string) => {
    setErrors((prevState) =>
      prevState.filter((err) => err.field !== fieldName));
  }, [])

  const getErrorMessageByFieldName = useCallback((fieldName: string): string | undefined => (
    errors.find((error) => error.field === fieldName)?.message
  ), [errors])

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors
  };
}
