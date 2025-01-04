import { Link } from 'react-router-dom';
import { TextField } from '../reactcomponents/TextField/TextField';
import AuthLayout from './components/AuthLayout';
import expenseTrackerLogo from '@/assets/expense-tracker-logo.svg';
import { FcGoogle } from 'react-icons/fc';
import { RiNotionFill } from 'react-icons/ri';
import { signInWithGoogle } from '../supabase/supabaseApis';

const Login = () => {
  const GoogleSignIn = () => {
    void signInWithGoogle();
  };
  return (
    <AuthLayout>
      <div className="bg-bg h-full px-[168px] py-8 flex items-center justify-center">
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
              <TextField label="Email" />
              <TextField label="Password" type="password" />

              <button className="block bg-primary px-10 py-4 rounded-full text-textColor font-primary">
                Login{' '}
              </button>
              <div className="font-primary text-secondary flex justify-center gap-1">
                <p>Don’t have an account? </p>
                <Link to="/signin" className="underline text-textColor">
                  Create new
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="flex items-center gap-4 bg-textColor rounded-full justify-center py-3 px-10"
              onClick={GoogleSignIn}
            >
              <FcGoogle className="w-6 h-6" /> Continue With Google
            </button>
            <button className="flex items-center gap-4 bg-textColor rounded-full justify-center py-3 px-10">
              <RiNotionFill className="w-6 h-6" /> Continue With Notion
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
