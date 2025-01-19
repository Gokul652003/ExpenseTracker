import expenseTrackerLogo from '@/assets/expense-tracker-logo.svg';
export const VerifyEmail = ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col justify-center h-screen gap-7 px-48">
      <div>
        <img src={expenseTrackerLogo} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-normal text-[32px] text-textColor">
          Verify your email address
        </span>
        <span className="font-normal text-base text-secondary">
          We have sent a verification link to your email address
          <span className="text-textColor"> {email}</span>. Please check your
          inbox and click the link to verify your account.
        </span>
      </div>
      <div>
        <button className="bg-primary py-3 px-10 rounded-full">
          <span className="font-normal text-base text-textColor">
            Resent Email
          </span>
        </button>
      </div>
    </div>
  );
};
