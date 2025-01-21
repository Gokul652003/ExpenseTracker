import { Link } from 'react-router-dom';
import { TextField } from '../react-components/TextField/TextField';
import AuthLayout from './components/AuthLayout';
import expenseTrackerLogo from '@/assets/expense-tracker-logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { RiNotionFill } from 'react-icons/ri';
import {
  signInWithGoogle,
  signInWithNotion,
  signUpWithEmailAndPassword,
} from '../supabase/supabaseApis';
import { useForm } from 'react-hook-form';
import { SignUpInput, useSignUpSchema } from './api/signUp';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { VerifyEmail } from './components/VerifyEmail';

const SignIn = () => {
  const [errorCode, setSignUpError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const GoogleSignIn = () => {
    void signInWithGoogle();
  };
  const NotionSignIn = () => {
    void signInWithNotion();
  };

  const onSubmit = async (data: SignUpInput) => {
    const res = await signUpWithEmailAndPassword(data.email, data.password);

    if (res.error) {
      setSignUpError(res.error.code ?? '');
    } else {
      setUserEmail(res.data.user?.email ?? '');
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: yupResolver(useSignUpSchema()),
  });

  if (userEmail) {
    return (
      <AuthLayout>
        <VerifyEmail email={userEmail} />
      </AuthLayout>
    );
  }
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
                Create Your Account
              </h1>
              <p className="text-secondary font-primary text-base font-normal">
                Sign up to start managing your expenses and achieve your
                financial goals.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <TextField
                label="Email"
                {...register('email')}
                description={errors.email?.message || ' '}
                variant={errors.email && 'destructive'}
              />
              <TextField
                label="Password"
                type="password"
                {...register('password')}
                description={errors.password?.message || ' '}
                variant={errors.password && 'destructive'}
              />
              <TextField
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                description={errors.confirmPassword?.message || ' '}
                variant={errors.confirmPassword && 'destructive'}
              />
              <div className="flex gap-2 py-2 pr-2">
                <input type="checkbox" className="" />
                <p className="text-secondary font-primary">
                  By creating an account, I agree to our{' '}
                  <span className="underline cursor-pointer">Terms of use</span>{' '}
                  and{' '}
                  <span className="underline cursor-pointer">
                    Privacy Policy{' '}
                  </span>{' '}
                </p>
              </div>
              <button
                className="block bg-primary px-10 py-3 rounded-full text-textColor font-primary"
                type="submit"
              >
                Create Account
              </button>
              <h1 className="text-red-500">{errorCode}</h1>

              <div className="font-primary text-secondary flex justify-center gap-1">
                <p>Already have an account?</p>
                <Link
                  to="/login"
                  className="underline text-textColor cursor-pointer"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="border border-secondary flex-1 inlin" />
            <span className="text-textColor text-base font-primary">OR</span>
            <div className="border border-secondary flex-1" />
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
              onClick={NotionSignIn}
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

export default SignIn;
