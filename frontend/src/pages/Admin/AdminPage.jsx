import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

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
    <div className="admin-container">
      <h1>Админ панель</h1>
      <button onClick={handleLogout}>Выйти</button>
      {/* Здесь будут компоненты управления залами, фильмами, сеансами */}
    </div>
  );
};

export default AdminPage;