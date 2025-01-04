import React from 'react';
// import expenseTrackerLogo from '@/assets/expense-tracker-logo.svg';
import authBackgound from '@/auth/assets/authBg.jpg';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2">
        <img src={authBackgound} alt="" className="object-cover size-full" />
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
};

export default AuthLayout;
