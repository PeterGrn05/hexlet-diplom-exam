import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import HallsManagement from '../../components/Admin/HallsManagement';
import SessionsGrid from '../../components/Admin/SessionsGrid';
import HallConfig from '../../components/Admin/HallConfig';
import PriceConfig from '../../components/Admin/PriceConfig';
import OpenSales from '../../components/Admin/OpenSales';

const AdminPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    document.body.classList.add('admin-body-bg');
    return () => {
      document.body.classList.remove('admin-body-bg');
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className='content-wrapper-admin'>
      <header className="admin-header">
        <div className="admin-header-logo">
          <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
          <h2 className="admin-header-subtitle">Администраторррская</h2>
          <button className="header-button button" onClick={handleLogout}>Выйти</button>
        </div>
      </header>
      <main className="manage">
        <HallsManagement />
        <HallConfig />
        <PriceConfig />
        <SessionsGrid />
        <OpenSales />
      </main>
    </div>
  );
};

export default AdminPage;