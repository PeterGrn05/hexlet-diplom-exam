import React from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
      {isAdmin ? (
        <button className="header-button button" onClick={handleLogoutClick}>
          выйти
        </button>
      ) : (
        <button className="header-button button" id="login" onClick={handleLoginClick}>
          войти
        </button>
      )}
    </header>
  );
};

export default Header;