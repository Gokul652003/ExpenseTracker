import userAvatarPlaceholder from './assets/userAvatar.jpeg';
import lodingGif from '@/assets/loading-gif.gif';

interface UserComponentProps {
  userAvatar?: string;
  userName?: string;
  emailId?: string;
  isDashboardOpen?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export const UserComponent = ({
  userAvatar = userAvatarPlaceholder,
  userName = 'Kin-Su',
  emailId = 'kinsu@gmail.com',
  isDashboardOpen = false,
  onClick,
  isLoading,
}: UserComponentProps) => {
  return (
    <div className="flex gap-5 items-center" onClick={onClick}>
      <div>
        {isLoading ? (
          <p className="">
            <img src={lodingGif} className="size-10 " />
          </p>
        ) : (
          <img src={userAvatar} className="size-10 rounded-full" />
        )}
      </div>
      {isDashboardOpen && (
        <div className="flex flex-col">
          <span className="font-medium text-lg text-textColor">{userName}</span>
          <span className="font-normal text-base text-secondary">
            {emailId}
          </span>
        </div>
      )}
    </div>
  );
};
