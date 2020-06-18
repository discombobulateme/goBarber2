import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; // [] dynamic to enable any form name to be a string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
