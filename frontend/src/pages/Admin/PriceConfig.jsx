import React from "react";

const PriceConfig = () => {
    return (
        <section>
				<header className="section-header">
					<h2 className="section-title">Конфигурация цен</h2>
					<button className="section-header-button"></button>
				</header>
				<div className="manage-content">
					<p className="admin-text">Выберите зал для конфигурации:</p>
					<div className="switch-hall-buttons switch-hall-buttons-prices"></div>
					<p className="admin-text">Установите цены для типов кресел:</p>

					<div className="input-container">
						<label className="admin-label">Цена, ₽</label>
						<div className="input-wrapper">
							<input type="text" id="price-regular" className="admin-input" placeholder="0"/>
							<div className="seat-scheme-item seat-scheme-item-regular"></div>
							<p className="legend-text">обычные кресла</p>
						</div>
					</div>

					<div className="input-container">
						<label className="admin-label">Цена, ₽</label>
						<div className="input-wrapper">
							<input type="text" id="price-vip" className="admin-input" placeholder="0"/>
							<div className="seat-scheme-item seat-scheme-item-vip"></div>
							<p className="legend-text">VIP кресла</p>
						</div>
					</div>

					<div className="admin-buttons">
						<button className="button admin-white-button" id="cancel-prices">Отменить</button>
						<button className="button admin-button" id="create-prices">Сохранить</button>
					</div>
				</div>
			</section>
    )
}

export default PriceConfig