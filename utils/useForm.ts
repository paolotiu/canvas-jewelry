import React, { useEffect, useState } from 'react';
import { ObjectSchema } from 'yup';

interface ValidationError {
  errors: string[] | null;
  message: string | null;
}

const nulledValidationError = {
  errors: null,
  message: null,
};

type EmptyObject<T extends Record<string, unknown>> = { [K in keyof T]: '' };

export const useForm = <T extends Record<string, unknown>>(
  initialState: T,
  schema?: ObjectSchema<any>,
) => {
  // Makes each field an empty string
  const emptyObject = <O extends Record<string, unknown>>(obj: O): EmptyObject<O> =>
    Object.fromEntries(Object.entries(obj).map(([key]) => [key, ''])) as any;

  // Makes each error field null
  const nullifyErrorObject = <Obj extends Record<string, unknown>>(
    obj: Obj,
  ): { [K in keyof Obj]: ValidationError } =>
    Object.fromEntries(Object.entries(obj).map(([key]) => [key, nulledValidationError])) as any;

  const [inputs, setInputs] = useState(initialState);
  const [isEmpty, setIsEmpty] = useState(true);
  const [errors, setErrors] = useState<{ [K in keyof T]: ValidationError }>(
    nullifyErrorObject(initialState),
  );
  const [isError, setIsError] = useState(true);

  const checkIfEmpty = <CheckIfEmptyObject extends Record<string, unknown>>(
    obj: CheckIfEmptyObject,
  ) => Object.values(obj).every((val) => val === '');

  useEffect(() => {
    // Runs whenever inputs change
    const run = async () => {
      if (schema) {
        const res = await schema?.validate(inputs, { abortEarly: false }).catch((e) => e);
        if (res.name === 'ValidationError') {
          // Validation error occurs
          setErrors(() =>
            res.inner.reduce(
              (acc: any, curr: any) => ({
                ...acc,
                [curr.path]: { errors: curr.errors, message: curr.message },
              }),
              nullifyErrorObject(inputs),
            ),
          );
          setIsError(true);
        } else {
          setErrors((prev) => nullifyErrorObject(prev));
          setIsError(false);
        }
      }
    };

    setIsEmpty(checkIfEmpty(inputs));

    run();
  }, [inputs, schema]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setInputs(initialState);
  };

  const clearForm = () => {
    setInputs(emptyObject(inputs) as T);
  };

  return { handleChange, resetForm, clearForm, inputs, isEmpty, errors, isError, setErrors };
};
