import userAvatar from '../../assets/userAvatar.png';

interface UserComponentProps {
  useravatar?: string;
  username?: string;
  emailid?: string;
  showname?: boolean;
}
export const UserComponent = ({
  useravatar = userAvatar,
  username = 'Kin-Su',
  emailid = 'kinsu@gmail.com',
  showname = false,
}: UserComponentProps) => {
  return (
    <div>
      <div className="flex gap-5 items-center">
        <div>
          <img src={useravatar} className="w-10 h-10 rounded-full"/>
        </div>
        {showname && (
          <div className="flex flex-col">
            <span className="font-primary font-medium text-lg text-textColor">
              {username}
            </span>
            <span className="font-primary font-normal text-base text-secondary">
              {emailid}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
