/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navabar';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Check if current route is login or forgot password
  const isLoginPage = location.pathname === '/';
  const isForgotPasswordPage = location.pathname === '/forgot';
  const showNavAndSidebar = !isLoginPage && !isForgotPasswordPage;

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile overlay backdrop - only show when sidebar is visible */}
      {showNavAndSidebar && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar - conditionally rendered */}
      {showNavAndSidebar && (
        <Sidebar 
          isMobileSidebarOpen={isMobileSidebarOpen} 
          toggleMobileSidebar={toggleMobileSidebar} 
        />
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - conditionally rendered */}
        {showNavAndSidebar && (
          <Navbar toggleMobileSidebar={toggleMobileSidebar} />
        )}
        
        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto ${showNavAndSidebar ? 'p-4 md:p-6' : ''} bg-gray-50`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;