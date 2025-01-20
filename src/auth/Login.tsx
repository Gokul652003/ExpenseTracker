import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '../react-components/TextField/TextField';
import AuthLayout from './components/AuthLayout';
import expenseTrackerLogo from '@/assets/expense-tracker-logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { RiNotionFill } from 'react-icons/ri';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from '../supabase/supabaseApis';
import { SignInInput, useSignInSchema } from './api/signIn';
import { AuthError } from '@supabase/supabase-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '../supabase/supabaseClient';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState<AuthError | null>(null);

  const GoogleSignIn = () => {
    void signInWithGoogle();
  };

  // Handle form submission
  const onSubmit = async (data: SignInInput) => {
    const { error } = await signInWithEmailAndPassword(
      data.email,
      data.password,
    );

    try {
      if (error) {
        throw error;
      }

      const { data: user } = await supabase.auth.getUser();
      if (user) {
        navigate('/dashboard');
        toast('login successfully', {
          style: {
            backgroundColor: 'var(--text-color)',
          },
        });
      }
    } catch (error) {
      const typedError = error as AuthError;
      setSignInError(typedError);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInInput>({
    resolver: yupResolver(useSignInSchema()),
  });

  return (
    <AuthLayout>
      <form
        className="bg-bg h-full px-[168px] py-8 flex items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-7">
          <div>
            <img src={expenseTrackerLogo} alt="Expense Tracker" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-textColor font-primary text-[32px]">
                Welcome Back!
              </h1>
              <p className="text-secondary font-primary text-base font-normal">
                Log in to track your expenses and stay in control of your
                finances.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                label="Email"
                {...register('email')}
                variant={errors.email && 'destructive'}
                description={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                {...register('password')}
                variant={errors.password && 'destructive'}
                description={errors.password?.message}
              />

              <button
                className="block bg-primary px-10 py-4 rounded-full text-textColor font-primary"
                type="submit"
              >
                Login{' '}
              </button>
              <div className="font-primary text-secondary flex justify-center gap-1">
                <p>Don’t have an account? </p>
                <Link to="/signin" className="underline text-textColor">
                  Create new
                </Link>
              </div>
              <h1 className="text-red-500">
                {signInError && signInError.message}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="flex items-center gap-4 bg-textColor rounded-full justify-center py-3 px-10"
              onClick={GoogleSignIn}
              type="button"
            >
              <FcGoogle className="w-6 h-6" /> Continue With Google
            </button>
            <button
              className="flex items-center gap-4 bg-textColor rounded-full justify-center py-3 px-10"
              type="button"
            >
              <RiNotionFill className="w-6 h-6" /> Continue With Notion
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
