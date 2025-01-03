import { NavLink } from 'react-router-dom';
import menuIcon from '../assets/menuIcon.png';
import userAvatar from '../assets/userAvatar.png';

export const Header = () => {
  return (
    <div className="py-8 flex justify-between items-center">
      <span className="block text-3xl text-text">Spendy.</span>
      <div className="flex gap-5">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'py-3 px-8 rounded-full bg-[#fff] text-bg'
              : 'py-3 px-8 rounded-full border border-secondary text-secondary'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive
              ? 'py-3 px-8 rounded-full bg-[#fff] text-bg'
              : 'py-3 px-8 rounded-full border border-secondary text-secondary'
          }
        >
          Transactions
        </NavLink>
      </div>
      <div>
        <button className="flex gap-4 items-center pl-5 pr-2 py-2 border border-secondary rounded-full">
          <img src={menuIcon} alt="Menu" />
          <img src={userAvatar} alt="User Avatar" className="size-8" />
        </button>
      </div>
    </div>
  );
};
