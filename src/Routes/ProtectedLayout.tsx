import React from 'react';
import Sidebar from '../page-components/SideBar';

export const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-bg">{children}</div>
    </div>
  );
};
