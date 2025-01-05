import * as yup from 'yup';

export const useSignUpSchema = () =>
  yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

export type SignUpInput = yup.InferType<ReturnType<typeof useSignUpSchema>>;
