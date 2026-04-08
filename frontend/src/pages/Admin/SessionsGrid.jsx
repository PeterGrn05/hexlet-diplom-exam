import React from "react";

const SessionsGrid = () => {
    return (
         <section>
				<header className="section-header">
					<h2 className="section-title">Сетка сеансов</h2>
					<button className="section-header-button"></button>
				</header>
				<div className="manage-content">
					<button className="button admin-button" id="open-add-film">Добавить Фильм</button>
					<ul className="admin-sessions-movie-list"></ul>
					<ol className="admin-sessions-halls-list"></ol>
					<div className="admin-buttons">
						<button className="button admin-white-button">Отменить</button>
						<button className="button admin-button">Сохранить</button>
					</div>
				</div>
			</section>
    )
}

export default SessionsGrid;