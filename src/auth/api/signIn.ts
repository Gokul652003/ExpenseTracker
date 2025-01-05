import * as yup from 'yup';

export const useSignInSchema = () =>
  yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

export type SignInInput = yup.InferType<ReturnType<typeof useSignInSchema>>;
