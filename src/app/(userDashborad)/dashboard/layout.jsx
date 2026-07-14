import Sidebar from '@/components/dashboard/Sidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
      <body className="flex min-h-screen flex-col bg-zinc-950 text-white antialiased">
        <div className="flex">
          <Sidebar></Sidebar>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    );
};

export default DashboardLayout;