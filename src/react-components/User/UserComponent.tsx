import userAvatarPlaceholder from './assets/userAvatar.jpeg';

interface UserComponentProps {
  userAvatar?: string;
  userName?: string;
  emailId?: string;
  isDashboardOpen?: boolean;
  onClick?: () => void;
}

export const UserComponent = ({
  userAvatar = userAvatarPlaceholder,
  userName = 'Kin-Su',
  emailId = 'kinsu@gmail.com',
  isDashboardOpen = false,
  onClick,
}: UserComponentProps) => {
  return (
    <div className="flex gap-5 items-center" onClick={onClick}>
      <div>
        <img src={userAvatar} className="size-10 rounded-full" />
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
