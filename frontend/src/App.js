// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainPage from './pages/MainPage';
// import BookingPage from './pages/BookingPage';
// import PaymentPage from './pages/PaymentPage';
// import LoginPage from './pages/LoginPage';
// import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className='body-bg'>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" elemment={<PaymentPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} /> */}
        </Routes>
      </BrowserRouter>
    </AppProvider>
    </div>
  );
}

export default App;
