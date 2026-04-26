import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="flex min-h-screen bg-[#f7f9f7]">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-[230px] min-h-screen">
        <TopHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;