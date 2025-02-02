import ProfileCard from './components/ProfileCard';
import { SecurityPrivacy } from './components/SecurityPrivacy';

const Profile = () => {
  return (
    <div>
      <div className="p-8 flex flex-col gap-2 border border-border">
        <span className="text-textColor text-[44px] font-medium">
          My Profile
        </span>
        <span className="text-base text-secondary font-normal">
          Update your details, preferences, and settings to personalize your
          account and enhance your experience.
        </span>
      </div>
      <ProfileCard />
      <SecurityPrivacy />
    </div>
  );
};

export default Profile;
