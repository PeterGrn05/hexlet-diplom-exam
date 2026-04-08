import React from "react";

const OpenSales = () => {
    return (
        <section>
            <header className="section-header">
                <h2 className="section-title">Открыть продажи</h2>
                <button className="section-header-button"></button>
            </header>
            <div className="manage-content">
                <div className="select-sales">
                    <p className="admin-text">Выберите зал для открытия/закрытия продаж:</p>
                    <div className="switch-hall-buttons switch-hall-buttons-launch"></div>
                </div>
                <p className="sales-text">Всё готово к открытию</p>
                <div className="admin-buttons">
                    <button className="button admin-button" id="launch-button">Открыть продажу билетов</button>
                </div>
            </div>
        </section>
    )
}
export default OpenSales;