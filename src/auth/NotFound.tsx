import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-bg bg-[url('@/auth/assets/404.svg')] bg-center bg-no-repeat flex justify-center items-center">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-[52px] text-textColor">Page Not Found</h1>
          <p className="text-[32px] text-secondary">
            Oops! The page you’re looking for doesn’t exist. It might have been
            moved or deleted.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="px-10 py-3 rounded-full bg-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
