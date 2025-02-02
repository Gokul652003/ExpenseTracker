import userAvatar from '@/react-components/User/assets/userAvatar.jpeg';
import { TextField } from '../../react-components/TextField/TextField';
import { useEffect, useState } from 'react';
import { useSession } from '../../Routes/useSession';
import { useNavigate } from 'react-router-dom';
import { ProfileUploaderModal } from './profileUploderModal';
import { supabase } from '../../supabase/supabaseClient';

const ProfileCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { profile } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileDetails, setProfileDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch user profile from Supabase on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user?.user.id) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      }

      if (profile) {
        setProfileDetails(profile);
        setProfileImage(profile.profile_image);
      } else {
        // If no profile exists, create a new one with default values
        const { error: insertError } = await supabase.from('profiles').insert({
          id: user.user.id,
          firstname: '',
          lastname: '',
          email: user.user.email,
          phone: '',
          profile_image: null,
        });

        if (insertError) {
          console.error('Error creating profile:', insertError.message);
        }
      }
    };

    fetchProfile();
  }, []);

  // Update profile data on blur
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));

    const { data: user } = await supabase.auth.getUser();
    if (user.user?.id) {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ [name]: value })
        .eq('id', user.user.id);

      if (error) {
        setError(`Error updating ${name}`);
        console.error('Error updating profile:', error.message);
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      console.log('User logged out successfully');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col gap-8 w-[800px]">
      <h1 className="text-textColor text-[32px] font-medium">Edit Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="flex flex-col gap-10">
        {/* Profile Image Upload */}
        <div className="flex gap-6">
          <div>
            <img
              src={profileImage ?? userAvatar}
              alt="User Avatar"
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <button
              className="bg-tableBgDark px-4 py-2 rounded-lg text-textColor"
              onClick={() => setIsModalOpen(true)}
            >
              Upload new photo
            </button>
            <p className="text-secondary">
              At least 800x800 px recommended. JPG or PNG is allowed.
            </p>
          </div>
        </div>

        {/* Personal Information Form */}
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

      {/* Profile Uploader Modal */}
      <ProfileUploaderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        profileImage={profileImage || profile}
        setProfileImage={setProfileImage}
      />

      {/* Logout Button */}
      <div>
        <button
          className="px-10 py-3 bg-border rounded-full text-textColor flex-1"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
