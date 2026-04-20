import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const LoginPage = () => {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Добавляем админский фон при монтировании
  useEffect(() => {
    document.body.classList.add('admin-body-bg');
    return () => document.body.classList.remove('admin-body-bg');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const result = await login(loginValue, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Неверный логин или пароль');
    }
    setIsLoading(false);
  };

  return (
    <div className="content-wrapper-admin">
      <header className="admin-header">
        <div className="admin-header-logo">
          <h1 className="header-logo">Идём<span className="header-logo-thin">в</span>кино</h1>
          <h2 className="admin-header-subtitle">Администраторррская</h2>
        </div>
      </header>
      <div className="login-wrapper">
        <header className="login-header">
          <h3 className="login-title">Авторизация</h3>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="email-label login-label">Логин или E-mail</label>
          <input
            type="text"
            className="email-input login-input"
            id="email"
            name="login"
            placeholder="username / example@domain.xyz"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
          />
          <label htmlFor="password" className="password-label login-label">Пароль</label>
          <input
            type="password"
            className="password-input login-input"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="login-error">{error}</div>}
          <button
            className="login-button button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Авторизоваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;