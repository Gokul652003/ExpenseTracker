import React from 'react';
import menuIcon from '@/assets/menuIcon.svg';
import menuIconIsActive from '@/assets/menuActive.svg';
import transactionIsActiveIcon from '@/assets/navIconTwo.svg';
import transactionIcon from '@/assets/transaction.svg';
// import navIconThree from '@/assets/navIconThree.svg';
// import navIconFour from '@/assets/navIconFour.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserComponent } from '../react-components/User/UserComponent';
import { useSession } from '../Routes/useSession';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useSession();
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
        </div>
        <NavLink to="/profile">
          {({ isActive }) => (
            <div
              className={`p-1 flex justify-center items-center  ${isActive ? 'border  border-textColor rounded-full' : 'border border-transparent rounded-full'}`}
            >
              <UserComponent
                isDashboardOpen={false}
                onClick={() => navigate('/profile')}
                userAvatar={profile}
              />
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
