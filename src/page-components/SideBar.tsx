import React, { useEffect, useState } from 'react';
import menuIcon from '@/assets/menuIcon.svg';
import menuIconIsActive from '@/assets/menuActive.svg';
import transactionIsActiveIcon from '@/assets/navIconTwo.svg';
import transactionIcon from '@/assets/transaction.svg';
// import navIconThree from '@/assets/navIconThree.svg';
// import navIconFour from '@/assets/navIconFour.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserComponent } from '../react-components/User/UserComponent';
import { useSession } from '../Routes/useSession';
import catagoryLogo from '@/assets/catagory.svg';
import catagoryActiveLogo from '@/assets/catagoryActive.svg';
import { supabase } from '../supabase/supabaseClient';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile, loading, session } = useSession();
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);

  // Fetch user profile image from the profiles table
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (session?.user.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('profile_image')
          .eq('id', session.user.id)
          .single(); // Fetch the single profile image for the user
        console.log(data);
        if (error) {
          console.error('Error fetching profile image:', error.message);
        } else {
          setUserProfileImage(data?.profile_image || null); // Set profile image or null if no image
        }
      }
    };

    fetchProfileImage();
  }, [session]);
  return (
    <div
      className={`bg-bg text-white shadow-lg border-r border-border p-10 h-full`}
    >
      <div className="flex flex-col justify-between h-full items-center">
        <div className="flex flex-col gap-6">
          <NavLink to="/dashboard" className="p-2">
            {({ isActive }) => (
              <div className={`p-1 ${isActive && 'bg-white rounded-full'}`}>
                <img
                  src={isActive ? menuIconIsActive : menuIcon}
                  alt="Transactions Icon"
                  className="w-6 h-6"
                />
              </div>
            )}
          </NavLink>
          <NavLink to="/transactions" className="p-2">
            {({ isActive }) => (
              <div className={`p-1 ${isActive && 'bg-white rounded-full'}`}>
                <img
                  src={isActive ? transactionIsActiveIcon : transactionIcon}
                  alt="Transactions Icon"
                  className="w-6 h-6"
                />
              </div>
            )}
          </NavLink>
          <NavLink to="/catagory" className="p-2">
            {({ isActive }) => (
              <div className={`p-1 ${isActive && 'bg-white rounded-full'}`}>
                <img
                  src={isActive ? catagoryActiveLogo : catagoryLogo}
                  alt="Transactions Icon"
                  className="w-6 h-6"
                />
              </div>
            )}
          </NavLink>
        </div>
        <NavLink to="/profile">
          {({ isActive }) => (
            <div
              className={`p-1 flex justify-center items-center  ${isActive ? 'border  border-textColor rounded-full' : 'border border-transparent rounded-full'}`}
            >
              <UserComponent
                isDashboardOpen={false}
                onClick={() => navigate('/profile')}
                userAvatar={userProfileImage || profile}
                isLoading={loading}
              />
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
