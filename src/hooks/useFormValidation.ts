
import { useState } from "react";

export type FieldErrors = Record<string, string>;

type ValidatorFn = (values: Record<string, string>) => FieldErrors;

export function useFormValidation(
  initialValues: Record<string, string>,
  validate: ValidatorFn
) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  // ✅ update single input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // optional: clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ validate only current inputs (no form object)
  const validateInputs = (): boolean => {
    const result = validate(values);
    setErrors(result);
    return Object.keys(result).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateInputs,
    reset,
    setValues,
    setErrors,
  };
}