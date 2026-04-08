import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import HallsManagement from './HallsManagement';
import SessionsGrid from './SessionsGrid';
import HallConfig from './HallConfig';
import PriceConfig from './PriceConfig';
import OpenSales from './OpenSales';

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
      {/* Здесь будут компоненты управления залами, фильмами, сеансами */}
        </div>
      </header>
      <main className="manage">
        <HallsManagement />
        <HallConfig />
        <PriceConfig />
        <SessionsGrid />
        <OpenSales />
      </main>
      {/* Модальные окна (попапы) тоже можно вынести в отдельные компоненты */}
    </div>
  );
};

export default AdminPage;