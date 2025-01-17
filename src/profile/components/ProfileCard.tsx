import userAvathar from '@/react-components/User/assets/userAvatar.jpeg';
import { TextField } from '../../react-components/TextField/TextField';
import { useEffect, useState } from 'react';
import { useSession } from '../../Routes/useSession';
import { signOut } from '../../supabase/supabaseApis';
import { redirect } from 'react-router-dom';
import { ProfileUploaderModal } from './p';
const ProfileCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  });
  const { profile } = useSession();
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setProfileImage(profile);
    }
  }, [profile]);

  const logOut = () => {
    void signOut();
    redirect('/');
  };
  
  return (
    <div className="p-8 flex flex-col gap-8 w-[800px]">
      <h1 className="text-textColor text-[32px] font-medium">Edit Profile</h1>
      <div className="flex flex-col gap-10">
        <div className="flex gap-6">
          <div>
            <img
              src={profileImage ?? userAvathar}
              alt=""
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div>
              <button
                className="bg-tableBgDark px-4 py-2 rounded-lg text-textColor"
                onClick={() => setIsModalOpen(true)}
              >
                Upload new photo
              </button>
            </div>
            <p className="text-secondary">
              At least 800*800 px recommended. JPG or PNG is allowed
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-textColor text-2xl font-medium">
            Personal Information
          </h1>
          <div className="flex gap-6">
            <TextField
              name="firstname"
              label="First Name"
              defaultValue={profileDetails.firstname}
              onBlur={handleBlur}
            />
            <TextField
              name="lastname"
              label="Last Name"
              defaultValue={profileDetails.lastname}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex gap-6">
            <TextField
              name="email"
              label="Email"
              type="email"
              defaultValue={profileDetails.email}
              onBlur={handleBlur}
            />
            <TextField
              name="phone"
              label="Phone"
              type="text"
              defaultValue={profileDetails.phone}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>
      <ProfileUploaderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <div>
        <button
          className="px-10 py-3 bg-border rounded-full text-textColor flex-1"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
