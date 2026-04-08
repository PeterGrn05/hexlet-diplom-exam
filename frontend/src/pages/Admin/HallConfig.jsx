import React from "react";

const HallConfig = () => {
    return (
        <section>
				<header className="section-header">
					<h2 className="section-title">Конфигурация залов</h2>
					<button className="section-header-button"></button>
				</header>
				<div className="manage-content">
					<p className="admin-text">Выберите зал для конфигурации:</p>
					<div className="switch-hall-buttons switch-hall-buttons-configuration"></div>
					<p className="admin-text">Укажите количество рядов и максимальное количество кресел в ряду:</p>
					<div className="input-container">
						<div className="input-wrapper">
							<label for="rows" className="admin-label">Рядов, шт</label>
							<input type="text" id="rows" className="admin-input" placeholder="10"/>
						</div>
						<span className="seat-multiplier">x</span>
						<div className="input-wrapper">
							<label for="columns" className="admin-label">Мест, шт</label>
							<input type="text" id="columns" className="admin-input" placeholder="8"/>
						</div>
					</div>

					<p className="admin-text">Теперь вы можете указать типы кресел на схеме зала:</p>
					<div className="seat-scheme-legend">
						<div className="legend-item">
							<div className="seat-scheme-item seat-scheme-item-regular"></div>
							<p className="legend-text">— обычные кресла</p>
						</div>
						<div className="legend-item">
							<div className="seat-scheme-item seat-scheme-item-vip"></div>
							<p className="legend-text">— VIP кресла</p>
						</div>
						<div className="legend-item">
							<div className="seat-scheme-item"></div>
							<p className="legend-text">— заблокированные</p>
						</div>
					</div>
					<div className="seat-scheme-grid-wrapper">
						<div className="seat-scheme-grid"></div>
					</div>

					<div className="admin-buttons">
						<button className="button admin-white-button">Отменить</button>
						<button className="button admin-button">Сохранить</button>
					</div>
				</div>
			</section>
    )
}

export default HallConfig