import React from 'react';

const HallsManagement = () => {
    return (
        <section>
            <header className="section-header">
                <h2 className="section-title">Управление залами</h2>
                <button className="section-header-button"></button>
            </header>
            <div className="manage-content">
                <div className="admin-halls-wrapper">
                    <p className="admin-text">Доступные залы:</p>
                    <button className="admin-halls-button button">Создать зал</button>
                </div>
            </div>
        </section>
    );
};

export default HallsManagement;