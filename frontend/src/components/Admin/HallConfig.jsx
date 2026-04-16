import React, { useState, useEffect } from 'react';
import { fetchHalls, fetchHallConfig, saveHallConfig } from '../../api/halls';

const HallConfig = () => {
  const [halls, setHalls] = useState([]);
  const [activeHallId, setActiveHallId] = useState(null);
  const [config, setConfig] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHalls().then(setHalls).catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeHallId) return;
    setLoading(true);
    fetchHallConfig(activeHallId)
      .then(data => {
        if (data.config && data.config.length) {
          setConfig(data.config);
          setRows(data.config.length);
          setCols(data.config[0].length);
        } else {
          setConfig([]);
          setRows(0);
          setCols(0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeHallId]);

  const rebuildConfig = (newRows, newCols) => {
    const newConfig = [];
    for (let i = 0; i < newRows; i++) {
      const row = [];
      for (let j = 0; j < newCols; j++) {
        row.push('standard');
      }
      newConfig.push(row);
    }
    setConfig(newConfig);
    setRows(newRows);
    setCols(newCols);
  };

  const toggleSeatType = (rowIdx, colIdx) => {
    const newConfig = [...config];
    const current = newConfig[rowIdx][colIdx];
    if (current === 'standard') newConfig[rowIdx][colIdx] = 'vip';
    else if (current === 'vip') newConfig[rowIdx][colIdx] = 'disabled';
    else newConfig[rowIdx][colIdx] = 'standard';
    setConfig(newConfig);
  };

  const handleSave = async () => {
    if (!activeHallId) return;
    setSaving(true);
    try {
      await saveHallConfig(activeHallId, config);
      alert('Конфигурация сохранена');
    } catch (err) {
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (activeHallId) fetchHallConfig(activeHallId).then(data => {
      setConfig(data.config || []);
      setRows(data.config?.length || 0);
      setCols(data.config?.[0]?.length || 0);
    });
  };

  return (
    <section>
      <header className="section-header">
        <h2 className="section-title">Конфигурация залов</h2>
        <button className="section-header-button"></button>
      </header>
      <div className="manage-content">
        <p className="admin-text">Выберите зал для конфигурации:</p>
        <div className="switch-hall-buttons switch-hall-buttons-configuration">
          {halls.map(hall => (
            <button
              key={hall.id}
              className={`switch-hall-button ${activeHallId === hall.id ? 'switch-hall-button-active' : ''}`}
              onClick={() => setActiveHallId(hall.id)}
            >
              {hall.name}
            </button>
          ))}
        </div>

        {activeHallId && (
          <>
            <p className="admin-text">Укажите количество рядов и максимальное количество кресел в ряду:</p>
            <div className="input-container">
              <div className="input-wrapper">
                <label htmlFor="rows" className="admin-label">Рядов, шт</label>
                <input
                  type="number"
                  id="rows"
                  className="admin-input"
                  value={rows}
                  onChange={(e) => rebuildConfig(Number(e.target.value), cols)}
                  min="1"
                />
              </div>
              <span className="seat-multiplier">x</span>
              <div className="input-wrapper">
                <label htmlFor="columns" className="admin-label">Мест, шт</label>
                <input
                  type="number"
                  id="columns"
                  className="admin-input"
                  value={cols}
                  onChange={(e) => rebuildConfig(rows, Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>

            <p className="admin-text">Укажите типы кресел на схеме зала:</p>
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
              <div
                className="seat-scheme-grid"
                style={{
                  display: 'grid',
                  gridTemplateRows: `repeat(${rows}, 26px)`,
                  gridTemplateColumns: `repeat(${cols}, 26px)`,
                  gap: '4px',
                }}
              >
                {loading ? (
                  <div>Загрузка...</div>
                ) : (
                  config.map((row, rowIdx) =>
                    row.map((seat, colIdx) => (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`seat-scheme-item ${
                          seat === 'standard' ? 'seat-scheme-item-regular' :
                          seat === 'vip' ? 'seat-scheme-item-vip' : ''
                        }`}
                        onClick={() => toggleSeatType(rowIdx, colIdx)}
                      />
                    ))
                  )
                )}
              </div>
            </div>

            <div className="admin-buttons">
              <button className="button admin-white-button" onClick={handleCancel}>Отменить</button>
              <button className="button admin-button" onClick={handleSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HallConfig;