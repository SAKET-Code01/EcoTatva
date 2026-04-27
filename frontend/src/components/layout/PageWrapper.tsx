import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const PageWrapper = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fdf9]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;