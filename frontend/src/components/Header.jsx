import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="header-logo">
        Идём<span className="header-logo-thin">в</span>кино
      </h1>
      <button className="header-button button" id="login" onClick={handleLoginClick}>
        войти
      </button>
    </header>
  );
};

export default Header;